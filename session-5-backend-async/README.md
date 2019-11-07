# Hackschool Session 5 Backend: Asynchronous Actions
**Location**: Covel 227  
**Time**: 7:00–8:00pm, November 6, 2019.

**Teacher**: Timothy Rediehs

## Resources

**Slides**
* [Session 5 Backend: Asynchronous Actions](https://www.tinyurl.com/hackschool19-w5)

**ACM Membership Attendance Portal**
* [Portal](https://members.uclaacm.com/login)

## What we'll be learning today

* What "asynchronous" means
* Promises
* Async/await
* How this applies to making requests to servers

## Synchronous Vs Asynchronous Programming
Normally, our programs run synchronously. Synchronous means that, if we run two tasks, the second task must wait for the first one to complete before running. No cuts, no buts, no coconuts! 

<img src="assets/sidebyside.png" alt="Synchronous Chart">

However, this is not always what we want. To demonstrate this, let's use an analogy.  Let's say we have an action we want to do – boiling water. This corresponds to an action a server might do like getting a file over the internet.

We'll be cooking pasta with veggies, which you will hopefully do many times in your college career.

<img src="assets/linkCooking.gif">

So first you have to boil the water. Let's say this takes 3 seconds:

```javascript
const boilWater = () => {
  console.log('Start boiling!');
  const start = Date.now();
  while (Date.now() < start + 3000) {}
  console.log('Water boiled!');
}
```
Note that these two lines are just a hack-y way to simulate a delay of 3 seconds:

```javascript
const start = Date.now();
while (Date.now() < start + 3000) {}
```
And then let's say you can wash your veggies in 2 seconds:

```javascript
const washVeggies = () => {
  console.log('Start washing!');
  const start = Date.now();
  while (Date.now() < start + 2000) {}
  console.log('Veggies washed!');
}
```
And let's write functions to add our pasta and veggies:

```javascript
const addPasta = () => {
  console.log('Pasta in da wata~');
}

const addVeggies = () => {
  console.log('Veggies in da pan~');
}
```

So if we call these functions:
```javascript
boilWater(); //3s
addPasta(); //instant
washVeggies(); //2s
addVeggies(); //instant

//Start boiling!
//Water boiled!
//Pasta in da wata~
//Start washing!
//Veggies washed!
//Veggies in da pan~
```
This is going to take a total of 5 seconds, but really, it did not have to take that long.

Are you going to wait for your water to boil before you start washing your veggies?

No! We don't need to stare at our water boiling!  As engineers and cooks, we're all about efficiency here.

What we want to do is start boiling the water, and while the water is boiling, we start washing the veggies.

This is what **asynchronous code** is for. Using a function called `setTimeout`, let's try to wash the veggies while the water is boiling.

```javascript
const boilWater = () => {
  console.log('Start boiling!');
  setTimeout(() => {
      console.log('Water boiled!');
  }, 3000);
}
```
`setTimeout` takes two arguments: a function and a number of milliseconds. Unlike our previous implementation, we don't sit and stare at the water until it's boiled.  Rather, we set a timer to remind us to come back and are free to do other things. After 3000 milliseconds, we execute the function we passed in. Note that when we pass in a function like this, the function is called a **callback**.

Looking cool, Joker! Now we can wash our veggies as we boil our water:
```javascript
boilWater();
washVeggies();

//Start boiling!
//Start washing!
//Veggies washed!
//Water boiled!
```

But what do you think will happen if we do this?

```javascript
boilWater();
washVeggies();
addPasta();
```

Oh no, we put our pasta in the water before if boiled. A cooking catastrophe! This is analogous to doing something with the data we get from the server before the data actually comes in. To solve this problem, we can use Promises.

## Promises

A `Promise` is an object that "represents the eventual completion (or failure) of an asynchronous operation, and its resulting value." (from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises))

The key point here is that promises offer a way to guarantee that data will be there before we do anything further. In our example, it lets us make it explicit that the water needs to be boiling *before* we can put the pasta in. The next part is about how to create a `Promise`. We will mostly be using promises instead of creating them, but please read if you're interested.

```js
const promise = new Promise((resolve, reject) => {
  if (1 < 2) {
    resolve('Success!');
  }
  else {
    reject(new Error('Failed :('));
  }
});

const doOnSuccess = (successMessage) => {
  console.log(successMessage);
};
const doOnFailure = (failureMessage) => {
  console.log(failureMessage);
}; 

promise.then(doOnSuccess).catch(doOnFailure);
//Success!
```
When you create a new `Promise`, you pass in a function. This function has two parameters, usually named `resolve` and `reject`. You call `resolve` when you want to return a value. In this case, we call `resolve` when the condition `1 < 2` is true (this is always true). 
`resolve` takes one parameter, which is the value you want to return. 

More common, you can also put the function in .then() without naming it.
```js
promise.then((successMessage) => {
  console.log(successMessage);
}.catch((failureMessage) => {
  console.log(failureMessage);
});
```

Let's apply this to the pasta problem:
```javascript
const boilWater = () => {
  console.log('Start boiling!');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Water boiled!');
        resolve();
    }, 3000);
  })
}

boilWater().then(addPasta);
//Start boiling!
//Water boiled!
//Pasta in da wata~
```
`boilWater` returns a `Promise` that resolves after 3 seconds. Since `addPasta` is called inside of `.then()`, it will only happen after the `Promise` is resolved. So you will always add the pasta after the water has been boiled.   
> Think of a `Promise` like your order ticket at BCaf. It takes some time to make your sandwich, so you get a receipt/ticket.  Once your number is called, you either get a sandwich (accepted) or they tell you that they ran out of bread and can't make your sandwich (rejected). Note that most students choose to stand and wait for their food at Bcaf, but you don't need too!
## Try it yourself!
Rewrite washVeggies so it returns a Promise and make sure your veggies are washed before you add them (although tbh I have failed doing this before bc I'm a terrible cook).
Your output should be:
```
Start boiling!
Start washing!
Veggies washed!
Veggies in da pan~
Water boiled!
Pasta in da wata~
```

## Async/await

There are two keywords `async` and `await` that make your code look a lot cleaner. 

You use `async` when you declare a function. It means that the function will return a `Promise`. Even if you don't explicitly return a `Promise`, an async function will return a `Promise`.

```js
const f = async () => {
  return 1;
}

f().then((result) => {
  console.log(result); // should log 1
});
```

In an `async` function, you can use `await` before a promise. This pauses the execution of the `async` function and waits for the passed `Promise`'s resolution, and then resumes the `async` function's execution. The program can do other things during this time.

**Important!** You can only use `await` inside of an `async` function.

```js
const f = async () => {
  return 1; //implicitly a promise because of async
}

const main = async () => {
  let result = await f(); // waits until result is filled before moving on
  console.log(result);
}

main();
```

With `await`, we don't need to nest a bunch of `.then()`'s.
This is another way to call the pasta functions so that we will add the pasta after we boil the water.

```js
const main = async () => {
  await boilWater();
  addPasta();
  await washVeggies();
  addVeggies();
}

main();

//Start boiling!
//Water boiled!
//Pasta in da wata~
//Start washing!
//Veggies washed!
//Veggies in da pan~
```

If we run this, you might notice that it still takes 5 seconds to complete.
How can we run boilWater and washVeggies in parallel?
We can push the two returned promises onto an array and then use `Promise.all()`:
```js
const main = async () => {
  const allPromises = [];
  allPromises.push(boilWater());
  allPromises.push(washVeggies());
  await Promise.all(allPromises);
  addPasta();
  addVeggies();
}
```

Let's boil 5 pots of water at a time!
```js
const main = async () => {
  const allPromises = [];
  for (let i = 0; i < 5; i++) {
    allPromises.push(boilWater());
  }
  await Promise.all(allPromises);
  console.log('Done!')
}
```

Another important thing to note about promises is that they can resolve into values. This value can be a string, number, object, etc... Let's have the `Promise` returned by `boilWater` return a success message:
```js
const boilWater = () => {
  console.log('Start boiling!');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Water boiled!');
      resolve('Success!');
    }, 3000);
  });
}
```
To access this message, save the return result of boilWater() to a variable:
```js
const message = await boilWater();
console.log(message);

//Start boiling!
//Water boiled!
//Success!
```

## Finally! Let's make a request to a server

We're going to use the npm module node-fetch to do this.
First navigate to your folder using `cd`.
Then create a package.json with the command:
```shell
npm init
```
Hit enter for all the default values.

Then install the node-fetch library:
```shell
npm install node-fetch
```

In a new file:
```js
const fetch = require('node-fetch');

const getCatFactFromServer = async () => {
  const res = await fetch('https://cat-fact.herokuapp.com/facts/random');
  return res.json();
}

const main = async () => {
  const jsonFromServer = await getCatFactFromServer();
  // Uncomment the following lines if you want to see the json data you got from the server
  // console.log('This is from the server:');
  // console.log(jsonFromServer);
  console.log(jsonFromServer.text);
}

main();
```

`fetch` returns a promise that is resolved when the first piece of data comes back from the server. It takes in the URL of the data you want to access. (If you came to our previous backend sessions, we made requests to servers using Postman. We are doing the exact same thing here inside Node.)

`res.json()` returns a promise that is resolved to the json data from the server.

What if we want to ask for many cat facts at the same time?
```js
const main = async () => {
  const allPromises = [];
  for (let i = 0; i < 5; i++) {
    allPromises.push(getCatFactFromServer());
  }
  const allCatFacts = await Promise.all(allPromises);
  for (const jsonFromServer of allCatFacts) {
    console.log(jsonFromServer.text);
  }
}
```

Neat!
```
A cat has approximately 60 to 80 million olfactory cells (a human has between 5 and 20 million).
```

## With Express

Remember in previous sessions, we used Express to serve data. Let's serve some data from a cat facts database! In the future, we'll be serving data from our own database. 

Install Express:
```shell
npm install express
```

In a new file called `index.js`:
```js
const fetch = require('node-fetch');
const express = require('express');
const app = express();

const getCatFactFromServer = async () => {
  const res = await fetch('https://cat-fact.herokuapp.com/facts/random');
  return res.json();
}

app.get('/', async (req, res) => {
  const jsonFromServer = await getCatFactFromServer();
  const fact = jsonFromServer.text;
  res.send(fact);
});

app.listen(3000);
console.log("Server started!");
```

To start your server from the command line:
```shell
node ./index.js
```
