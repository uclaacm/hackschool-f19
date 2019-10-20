# Hackschool Session 3 Backend: What is an API?
**Location**: Boelter Hall 5249

**Time**: 7:00-8:00pm

**Teachers**
* Jody Lin

## Resources

**Slides** TODO 
* [Session 3 - API, HTTP, and JSON](TODO)

**ACM Membership Attendance Portal**
* [Portal](http://members.uclaacm.com/login)

**Install Postman**
* [Install Postman](https://www.getpostman.com/)


## What we'll be learning today
* What is HTTP?
* HTTP Methods
* What is JSON?
* What is an API?

## Goal of Today
* Understand how our computers (clients) get data from servers
* Create your own API in node.js


## What is HTTP?

Previously, we talked about typing a URL into the browser. In our demo from last week, we created our own server on our computer. When we made a request for the page through our URL, our server (on our computer) responded by returning back an HTML page that we coded. 

As far we've learned, a client computer can request for data through a URL and a server will respond back with the information we asked for (like an HTML page).

However, is that all the client and server can do? 

Consider the following scenario: 

### The God of Memes
It's week 4 and midterms are coming up. You're stressed and decide to make a meme about how stressed you are instead of studying. 

<img src="images/memepage.jpg" width="400px">
<img src="images/postmeme.jpg" width="300px">


You get your hot meme image ready to post it on Facebook.

You click Post. 

Now, your image is being uploaded to a server. Our sick meme will now get uploaded and people will be able to see it online they request to see the meme page. 

Wait, but this time we didn't just request to *get* a meme from the server, we actually *posted* a meme. 

So apart from the client requesting to **get** data from the server, it can also request to **upload** data to the server!

So with this understanding, we know that a client can request to:
1. Get data (ex: html page)
2. Post or upload data (ex: post a meme)

The server will then send the appropriate response to our request.

But how does the server know whether our computer know whether we're trying to get data or post something?

This is where __HTTP__ gets into the picture. 

### HTTP format
HTTP stands for __Hypertext Transfer Protocol__.

Not so long ago (in 1991), a couple of very smart people defined a way clients and servers should communicate. This is known as __HTTP__. 

In simple terms, HTTP protocol defines how the request from the client should be formatted, and also how the response from the server should be formatted. We can call these HTTP messages (messages sent between our computer and the server).

An example of a request message may look like this:
``` http
GET / HTTP/1.1
Host: www.example.com
```

An example of a response message may look like this: 
```http
HTTP/1.1 200 OK
Date: Mon, 23 May 2005 22:38:34 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 138
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
ETag: "3f80f-1b6-3e1cb03b"
Accept-Ranges: bytes
Connection: close

<html>
  <head>
    <title>An Example Page</title>
  </head>
  <body>
    <p>Hello World, this is a very simple HTML document.</p>
  </body>
</html>
```

HTTP messages are just strings are sent between the client and server. The rules set by HTTP allow the server to interpret the string to understand what user wants and vice versa.


An HTTP message is usually comprised of two parts: the __header__ and the __body__. These will be separated by a newline (you can see this in the response example above).

### 1. Header
A header is piece of text (string) that contains general information about the message, such as the type of request made (GET/POST/etc), or the the status of the response.

### 2. Body
This contains any data associated with the request or response. If you are uploading images or text, for example, the body will contain all the data about the image or text. The body of an HTTP response would also contain data being sent to the client.

We can actually see these messages inside the developer console in Chrome.

* Right click on any page, then click `Inspect`. Or just <kbd>Command Option i</kbd> on Mac, <kbd>Ctrl Shift J</kbd> on Windows.

* Open the network tab in the Chrome DevTools.

* Go to `www.google.com`

* Click on the `www.google.com` in the column labeled Name.

* Go to the `Headers` tab

You can see the Request and Response Headers!

It has information about `path`, which specifies which page you want from `www.google.com`.



## HTTP Request Methods
Let's go into more detail now and look at HTTP Requests. How do differentiate a request to get data from a request to upload data? 

One easy way for the server to know whether the client wants to get webpage or to upload a file is through the property `method` in the request header.

Different methods tell our server what exactly we want them to do. Some of these include GET, POST, DELETE, TRACE, etc. Today we will cover the 2 basic ones: GET and POST. 

### GET
A `GET` method is used when we want to retrieve or *get* data from a server.
```http
GET / HTTP/1.1
Host: www.example.com
```
Here is an example of a `GET` method being used in an HTTP Request. We are trying to `GET` the webpage *www.example.com*. By specifying `GET` in the `method` key in the header, the server will send you back the HTML file.

Notice our `GET` request only contains a header and no body. This is because we are only requesting to get data, so our body contains no data. 

So when you type in a URL, the browser will format a request to the server for you. Then it will send the request.

### POST
A `POST` method is used usually when we try to upload something, like text or a file.
```http
POST /cgi-bin/process.cgi HTTP/1.1
User-Agent: Mozilla/4.0 (compatible; MSIE5.01; Windows NT)
Host: www.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: length
Accept-Language: en-us
Accept-Encoding: gzip, deflate
Connection: Keep-Alive

licenseID=string&content=string&/paramsXML=string
```

But how do we send a request with a `POST` method? We can't just type in a URL in the browser, since there would be no way for us specify the file/text that we want to upload.

`POST` requests are usually done under the hood for you by JavaScript. 

<details>
<summary>TODO: Make a simple server?</summary>
Let's try it out:

* Open the network tab in Chrome DevTools

* Go to `http://hackschool18.azurewebsites.net/upload`

* Open the new tab `http://hackschool18.azurewebsites.net` to see your message

* Type in your name/messages and click Send.

* See the upload in console!


We can see in the request header, we have a method as `POST`.

We can also see the `Request Payload`, which is the `body`, containing the message that we send.

```JS
{ message: 'my msg', sender: 'Kristie' }
```

The format looks familiar right?
</details>

## What is JSON?

Sometimes the data we want to pass in our body is not necessarily an HTML file. What if we simply wanted to pass a collection of data, like a person's name, age, and favorite food? We don't want to display this data as HTML, perhaps we simply want to pass this information to our server to be stored in a profile. 

We can use JSON!

JSON is __JavaScript Object Notation__. We represent data in the JSON format, as we would in JavaScript. IT looks something like this:
```js
{
    "name": "Jody",
    "age": 19,
    "favoriteFood": "sushi"
}
```
So data in the body of a request or a response could be sent as a JSON! 

Now, an interesting thing is that not only can we request to `GET` a HTML page from the server,
we can also `GET` data from the server in form of JSON. 

Let's try it out.

Here is an URL that we can use to `GET` some cat facts. 

```
cat-fact.herokuapp.com/facts/random
```
It returns a JSON!

## Postman

Great, we now know we can get data from `GET` request as well. 
Let me introduce you to some fantastic software to do testing on HTTP requests.

In Postman, you can make `GET`/`POST` requests. 

Let's try to `GET` a webpage. 
```
www.example.com
```

We can see that it sent us back some HTML. We can preview it using the `preview` tab.

![Postman Response Tab](images/postmanResTab.png)

Let's try with the cat fact example again.

```
cat-fact.herokuapp.com/facts/random
```

Now, we know that we cannot perform a `POST` request with a browser directly, but we can with Postman!

* Put `http://hackschool18.azurewebsites.net/message`
* Select `POST` next the URL field
* Choose the `body` tab  
* Select `raw` and choose `JSON (application/json)`
* Type the following
* Open the new tab `http://hackschool18.azurewebsites.net` to see your message

```JS
{
  "message": "my msg",
  "sender": "Krisite"
}
```

Now, we click send. Magic happens!

Notice that Postman automatically sets one property in the header. 

```
Content-Type: application/json
```

`Content-Type` tells the server what is inside our `body`. That way, the server will know how to interpret/understand it. In this case, the server will interpret the body as JSON, or a JavaScript object. 

Also notice that we get a JSON response back.
```JS
{
    "status": "Success!"
}
```
This means that in a POST request, although we are uploading things, the server can still send a response back too! If the server wants, it could send back a HTML page. 

### What is under the hood in browser?

When we click the `send` button in browser to send a message, the JavaScript code underneath does exactly what we did in Postman. 
It formatted the request header and body, and send it to the server using the URL.

## HTTP Status Code
Ok, let's say you are uploading a message. How do you know that your message got successfully uploaded?

The __response__ can tell us!

A HTTP response is just like a request. It has a __header__ and __body__.


In the `header`, there is a field called `status` containing a number. That number indicates if your request was successful.

```
2XX: The request was successful
4XX: The request was not successful and client probably messed up.
5XX: The request was not successful and server probably messed up.
```

In the `body`, it will contain whatever data is sent back. The data can be JSON/HTML, a random string of text, or even nothing at all.


Let's check the Chrome developer console and go to `www.google.com`.

* We can find `status` in the `Response Header` tab under the `Header` section.
* We can also see the `Response` tab to see what is contained in the body.
* The `Preview` tab provides a prettier view of the `body` data.

We can do this in Postman as well.

Let's send a message to `http://hackschool18.azurewebsites.net/message` but without a body.

We can see the error code, and nothing is being returned. 

![400 bad request](images/400postman.png)

## What is an API?
API stands for __Application Programming Interface__. An API is a definition of methods of communication among various components. 

What are the differences between an API and HTTP then, or how are they related?
* HTTP defines how computers can talk to each other over the world wide web.
  * HTTP was predefined by some super old but also super smart engineers of the Internet.
* You, the programmer:
  * Get to decide which APIs you use
  * Can define your own APIs
    * "To receive information about a Facebook user, make a GET request to `https://graph.facebook.com/{user-id}`"
* Web APIs rely on HTTP to specify what can and can't be done with specific endpoints/URLs in the API.

It is pretty abstract but don't worry. As you get more and more experienced, you'll gain an intuition for what an API is.

In the web context, an API usually refers to a set of specific endpoints that we can call to retrieve some data. 

For example, the cat facts endpoint is part of an API to retrieve JSON data of, well, cat facts. We __HAVE TO__ use a GET method to make a request to the specific URL. There are restrictions on how we can talk to the server, and therefore, it is part of an API.

Moreover, the URL to POST a message we just did was also a part of an API. We __HAVE TO__ use a POST method to make a request to the specific URL. We also have to make sure we have a JSON object in the body that has the key `sender` and `messsage`. There are rules to how we upload a message, and therefore, it is part of an API.


## Write your own API

Setup:
* Make a folder
* npm init
* install express
* Start a server. 

```bash
$ pwd
/Users/galenw/Desktop
$ mkdir myAPIserver
$ cd myAPIserver
$ npm init
# ...
$ npm install --save express
# ...
$ touch server.js
```

Inside `server.js`

```JS
const express = require('express');
const app = express();
```

Let's make an endpoint to return some random numbers in JSON. 

```JS
app.get('/random', (req, res) => {
    let myJSON = {};
    myJSON.number = Math.random();
    // myJSON at this point should look like this
    // { "number": 123 }
    res.json(myJSON);
});

app.listen(8080);
```
* the `res.json` function allows us to pass in an object and express will send it back to the user.
* `Math.random` is a built in function to generate a random number.


We do a `GET` to `localhost:8080/random` in Postman.

However, what happens when we do a `POST` on that URL?

We get a 404 Not Found. The reason is that we only defined what will happens when a `GET` request is made to the endpoint with the `app.get` function, not a `POST` request.


Let us write an endpoint that receives something from the user. 
Since user would be 'uploading' some data, we use the `POST` method with the `app.post` function.

```JS
app.use(express.json());
```
This line tells express that the input body might contain JSON object. If express sees a string that is in JSON format in `body` it will transform it into an actaul JavaScript Object.

```JS
app.use(express.json());
app.post('/name', (req, res) => {
    const message = req.body;
    if (message.name == undefined ) {
        res.status(400);
        const wrong = {
            message: "Input JSON does not contain key 'name'"
        };
        res.json(wrong);
        return;
    }
    else {
        const sayHi = "Hello " + message.name;
        console.log(sayHi);
        const resJSON = {
            message: sayHi
        };
        res.json(resJSON);
    }
})
```
* `app.post` specifies that this endpoint takes a `POST` request.
* `req.body` contains the JSON in the `body` of the **req**uest.
* We used a if-statement to check if the `name` key exists in the body.
* If no, we return a JSON saying the input is invalid with status code 400.
* `res.status` helps us to set the `status` in the response header.
* If it does contain `name`, we return a message saying hello. 


Let's test it with Postman.
* Put `localhost:8080/name`
* Select `POST` next the URL field
* Choose the `body` tab  
* Select `raw` and choose `JSON (application/json)`
* Type the following
```JS
{
	"name": "Jody"
}
```

What if we put some other fields in? Like
```JS
{
    "name": "Jody",
    "age": 75
}
```
We still get the correct behavior since we did not check for if the JSON contains extra fields.

What if we remove the `name` key?
```JS
{
    "age": 75
}
```

Now we get an error with status code `400`!

You have just written your first API!

## Your Task
1. Create another API endpoint called randomFact that will return a random fact about yourself. Have the server respond with a JSON. 

2. Create a POST request that will take that has a JSON body formatted like this:
```js
{
    "name": "yeji",
    "comment": "i see that i'm icy"
}
```
Have our response return an error with a status code of 400 of either of these are not found in the body. Return an error message as a JSON. If both are present, console.log both of them and send a JSON back with a comment in the form:
```
"message" : "(name) said (comment)"
```


