# Hackschool Session 4: Introduction to Express

**Location**: Boelter 5249, UCLA

**Time**: 7-8pm

**Teacher**

- Galen Wong

**Slides**

- [Slides](https://docs.google.com/presentation/d/1cy9AZdiZY5d3i59HL3ltGb1w0KX_-FNHHKZteRpa-ic/edit?usp=sharing)


**ACM Membership Attendance Portal**

- [Portal](http://members.uclaacm.com/login)

**Questions**

- [Ask your question here!](https://github.com/uclaacm/hackschool-f19/issues/new?labels=help%2C+unresolved&template=question.md)

**Other useful resources**

- [Express 4.0 Documentation](https://expressjs.com/en/4x/api.html)

## What we'll be learning today
- Split code into different files with `require()`
- Creating complex web applications with `express`
- Splitting a web server into different pieces


## Split code into different files with `require()` 

When you are building your amazing web application in
`index.js`, you will likely be adding more and more 
functionalities to it. Maybe you will add different 
endpoints or different functions to help you do complex 
calculation. That is great. However, your `index.js` might 
get super long. Ideally, we want to split them into
different files. How do you do that?


Let's say you have a bunch of functions and constants you 
created that helps you do math. We put them all inside a
file named `math.js`

```js
// math.js
const add = (x, y) => {
    return x + y;
}

const square = (x) => {
    return x * x;
}

const pi = 3.1415926535897932;
```

Now, you want to use them in `index.js` file. 
But first, you need to tell Node.js that we want our
functions and constants to be accessible to the world
outside `math.js` (for example in `index.js`).

```js
// math.js
// ...
module.exports = {
    add: add,
    square: square,
    pi: pi
};
```

By assigning an object to `module.exports`, we are 
telling Node.js what functions or variables we want
to expose to the world outside `math.js`.
To use it in `index.js`, we use the `require` function.

```js
// index.js
const math = require('./math.js');

console.log(math.add(3, 4));
console.log(math.pi * math.square(5));
```

> Note: The dot `.` in `./math.js` means "current directory".
> `require` function will look for the file in the current
> directory.

When we run `node index.js`, Node.js will execute 
`require('math.js')`. It then runs `math.js`, taking
whatever value we set to `module.exports` to, and
return it as the return value of the `require('math.js')`
function call.

> Question: what if `module.exports = 1`? 

<details>
<summary>Click to see answer</summary>

Note, `module.exports` doesn't have to be set to an object. In fact, I could
have a `pi.js` containing `module.exports = 3.1415926535897932;`, and any file
that `require('./pi.js')` file will receive the value of the mathematical
constant _π_!
</details>

## Express Router

Let's get you started with building the backend of your 
final project! Let's create a skeleton for our backend code.

First, in the terminal, we initialize a project with `npm`. 
Don't forget to `cd` to your project directory first.

```
npm init -y
npm install express --save
```

Then, we create a file `index.js` with the following content.

```js
const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000);
console.log('server listening on 3000');
```

To check that you have got everything right,
execute `index.js` with `node`.
```
node index.js
# output: listening on 3000
```
> Note: You can stop the server program with 
> <kbd>ctrl</kbd> + <kbd>c<kbd>

In the application, we will store some user information.
Let's implement one endpoint that creates an user,
and one endpoint to retrieve information about the user.

```js
const express = require('express');
const app = express();

const users = new Map();

app.use(express.json());

app.post('/user', (req, res) => {
  const body = req.body;
  if (users.has(body.name)) {
    res.status(400); // Bad Request
    res.json({ message: 'User already exists' });
    return;
  }

  users.set(body.name, { name: body.name });
  res.status(201); // Created
  res.json({ message: 'User created' });
});

app.get('/user/:user', (req, res) => {
  const user = users.get(req.params.user);
  if (user !== undefined) {
    res.json(user);
  } else {
    res.status(404); // Gives user a 404 Not Found error.
    res.json({ message: 'User not found' });
  }
});

app.listen(3000);
console.log('server listening on 3000');
```
> A `Map` object is like a dictionary, mapping from one value to another. It is
> like an object in that it also represents a collection of key-value pairs,
> but is faster for data storage.

### Route Parameters

In our endpoint to get user information, the route
is specified as `/user/:user`. This does not mean
the user is going to make a request with URL such as
`localhost:3000/user/:user`, but rather express will
extract the string at the position of `:user` and put
it into the `req.params` object.

For example, in our `/user/:user` endpoint,

```
Route path: /user/:user
Request URL: http://localhost:3000/user/Galen
req.params: { "user": "Galen" }
```

Here is a more complicated example,
```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```

### What is a Router? 

A router is responsible for forwarding a request to the 
correct endpoint filtering by the information about the
request, such as the HTTP method (`GET`, `POST`), the
request URL path (`/user`), etc.

Inside Express, a router is used to determine which
endpoint the request will end up going to. 
The way that we communicate the filter criteria to
Express are in the function calls. For example,

```js
app.post('/user', (req, res) => {
    // ...
});
```

In this particular endpoint, we tell Express to forward
any request with the method `post`, and the path `/user`
to this endpoint.

Now that we have our user endpoints sorted out, 
we will keep adding endpoints to extend the functionalities
of our app. We want to submit our drawing, download other
people's drawing, see some information about the drawing, 
etc.

```js
app.post('/user', (req, res) => { /* ... */ });
app.get('/user/:user', (req, res) => { /* ... */ });

// endpoint to submit drawing
app.post('/drawing', (req, res) => { /* ... */ });
// endpoint to download a drawing 
app.get('/drawing/:id', (req, res) => { /* ... */ });
// endpoint to get details about a drawing
app.get('/drawing/:id/details', (req, res) => { /*. .. */});
```

Right now, we are adding all these endpoint in the same
files. If you kept adding them, your file would become
really long, and it would be hard for you to keep track
of all the endpoints!

### Router Routing to Router

We see that some of the endpoints specifically handle 
operations on users, some handle operations on drawing.
Wouldn't it be nice if we can put them inside different 
files? 

We want to forward any request with path that starts with 
`/user` to go to the file `user.js` that contains endpoints 
handling user specific operations. Inside `user.js`, we
want to forward our request to specific endpoints depending
on the rest of the path. That means that the router in 
`index.js` forwards the request to another router within
`user.js`.

### Introduction to `express.Router`

Let's group our user endpoints in under the user router.
The `app` object that we have been using is a router on
its own. But to make our own specific router, we have to 
use `express.Router`. 


Make a copy of `index.js` as `routes/user.js`,
and modify its content a little bit.
```js
const express = require('express');
// we changed the following line ✏️✏️✏️
const router = express.Router(); 

const users = new Map();

// we deleted the following line ❌❌❌
// app.use(express.json());

// we changed the following line ✏️✏️✏️
router.post('/user', (req, res) => {
  const body = req.body;
  if (users.has(body.name)) {
    res.status(400); // Bad Request
    res.json({ message: 'User already exists' });
    return;
  }

  users.set(body.name, { name: body.name });
  res.status(201); // Created
  res.json({ message: 'User created' });
});

// we changed the following line ✏️✏️✏️
router.get('/user/:user', (req, res) => {
  const user = users.get(req.params.user);
  if (user !== undefined) {
    res.json(user);
  } else {
    res.status(404); // Gives user a 404 Not Found error.
    res.json({ message: 'User not found' });
  }
});

// we deleted the following line ❌❌❌
// app.listen(3000);
// console.log('server listening on 3000');

// we added the following line ➕➕➕
module.exports = router;
```

Notice in the last line that we exported our user 
router, so that we can use it within `index.js`.

Now we modify the `index.js` to use the new router.

```js
const express = require('express');
const userEndpoints = require('./routes/user.js');

const app = express();

app.use(express.json());

app.use(userEndpoints);

app.listen(3000);
console.log('server listening on 3000');
```

The `userEndpoints` object will be the `router` that
we exported from `routers/user.js`. We use 
`app.use(userEndpoints)` to tell Express to use the router
that we created.

> Checkpoint: If you run your server again, it should behave
> exactly the same as before the changes were made.


### Specifying User Specific Request Routing

We know that all the endpoints in `route/user.js` are for 
handling user request and they all starts with `/user`. 
We can tell Express to only forward the request that
starts with `/user` to the `userEndpoints` router.

In `index.js`, we modify the following line.
```diff
-app.use(userEndpoints);
+app.use('/user', userEndpoints);
```

And then, we can remove all the redundant leading `/user`
in all the endpoints in `routes/user.js`

```diff
-router.post('/user', (req, res) => {
+router.post('/', (req, res) => {
``` 

```diff
-router.get('/user/:user', (req, res) => {
+router.get('/:user', (req, res) => {
```

> Checkpoint: If you run your server again, it should behave
> exactly the same as before the changes were made. There 
> should be no change in the endpoints. 

----

Sanity check: your files should look like this

`index.js`
```js
const express = require('express');
const userEndpoints = require('./routes/user.js');

const app = express();

app.use(express.json());

app.use('/user', userEndpoints);

app.listen(3000);
console.log('server listening on 3000');
```

`routes/user.js`
```js
const express = require('express');
const router = express.Router();

const users = new Map();

router.post('/', (req, res) => {
  const body = req.body;
  if (users.has(body.name)) {
    res.status(400); // Bad Request
    res.json({ message: 'User already exists' });
    return;
  }

  users.set(body.name, { name: body.name });
  res.status(201); // Created
  res.json({ message: 'User created' });
});

router.get('/:user', (req, res) => {
  const userObj = users.get(req.params.user);
  if (userObj !== undefined) {
    res.json(userObj);
  } else {
    res.status(404); // Gives user a 404 Not Found error.
    res.json({ message: 'User not found' });
  }
});

module.exports = router;
```

## Splitting Server into Multiple Files

Now, if you want to implement the `drawing` endpoints,
you can put all of them in a file `routes/drawing.js`
and simply use the router in `index.js`


```js
const express = require('express');
const userEndpoints = require('./routes/user.js');
const drawingEndpoints = require('./routes/drawing.js');

const app = express();

app.use(express.json());

app.use('/user', userEndpoints);
app.use('/drawing', drawingEndpoints):

app.listen(3000);
console.log('server listening on 3000');
```

