# Hackschool Session 5 Frontend: React
**Location**: Boelter 5249
**Time**: 6–7pm, November 6, 2019

**Teacher**: Timothy Gu

## Resources

**Slides**
* [Session 5 Frontend: React](https://docs.google.com/presentation/d/1TApzt5ti0GoPTCUy56hH792AT5-8tC3RnrxzLEIUifE/edit)

**ACM Membership Attendance Portal**
* [Portal](https://members.uclaacm.com/login)

## What we'll be learning today

* What React is
* Making a simple application with a few components
* Getting started on the final project

## What is React: A 30,000–foot view

Created and maintained by Facebook, React is a JavaScript _framework_ for building user interfaces.
It contains code that other people has written to make your life easier as a web developer.
If you have been coming to our backend workshops, you may remember how Express simplifies the creation of a web server.
React is a bit like Express in that purpose, but for the frontend.

Currently, React is probably the popular web UI framework out there.
As such, it has a large community, meaning you can Google any React question and StackOverflow should answer them for you.

There are some technical reasons too. But let's come back to that after we learn how to use React. 

## Motivation of React

So far, we've learned about HTML elements – the basic building blocks of web pages.
Even the most complex and large web applications are built on simple tags like `h1`, `img`, `p`, `button` etc.

For instance, a typical Facebook post looks like this.

<img src="images/fbpost.png" width="500">

We can reasonably think that, assuming we have the appropriate CSS styling,
the post would have a structure that resembles the following.

```html
<div>
  <img src="dustin.png">
  <p>Dustin Newman</p>
  <button>…</button>

  <p>switch case case …</p>
  <img src="meme.png">

  <p>Timothy Gu, Kevin Tan, and 23 others</p>
  <p>1 Comment Seen by 97</p>

  <button>Like</button>
  <button>Comment</button>
  <button>Share</button>
</div>
```

However, on your Facebook feed, there are always multiple posts. They all inherit a similar structure. There is a user name, user profile picture, time of posting, "like", "comment", and "share" buttons, etc.
If we were to write out the HTML code for each post individually, there would be much duplication. Generally, we want to avoid repeated code. (What if we made a mistake in copying?)

What if we can define a "super" HTML element?

```html
<MemePost 
	profile="dustin.png"
	name="Dustin Newman"
	date="October 15 at 10:00AM"
	text="switch case case case…"
	image="meme.png"
	reax="Timothy Gu, Kevin Tan and 23 others"
	comments="1 Comment"
	seen="Seen by 97"
/>
```

Here, when we use the complex element, we only worry about the _content_ of the post, not the basic structure that is shared by all posts.

This, is exactly what React enables you to do. You can define your own HTML-like elements that can be accessed through JavaScript. These are called **components**.

Once you define a component, you can easily reuse it.

```html
<!-- First Post -->
<MemePost 
	profile="profile1.png"
	name="Galen"
	date="November 7 at 10:00AM"
	text="I love react"
	reax="Timothy Gu, Kevin Tan and 23 others"
	comments="1 Comment"
	seen="Seen by 97"
/>
<!-- Second Post -->
<MemePost 
	profile="profile2.png"
	name="Tim"
	date="November 7 at 6:00PM"
	text="I love react"
/>
```

## Classes in JavaScript

Before we dive into React, we have to learn the syntax of **classes** in JavaScript.

### Declaring a class

A class can be thought of a family of objects, that all share certain traits and methods.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  sayHello() {
    console.log('Hi, my name is ' + this.name);
  }

  changeAge(newAge) {
    this.age = newAge;
    console.log(this.name + ' is now ' + this.age + ' yo.');
  }
}
```

* The `constructor` function is a function called when we create a new *instance* of a class. An instance is an object based on the format of the class definition.
* `constructor` usually defines the properties of instance within the class too. All `Person` objects would have two data properties: `name` and `age`.
* The `this` keyword specifies that it is referring to itself, the instance of the class.
* `sayHello` and `changeAge` are both function within the instances.

### Using a class

```js
// Inside a JavaScript Interactive Environment 
// (e.g. Chrome DevTools)
let me = new Person("Galen", 18);
me
// Output: Person {name: "Galen", age: 18}
me.sayHello();
// Output: Hi, my name is Galen.
me.changeAge(19);
// Output: Galen is now 19 yo.
me
// Output: Person {name: "Galen", age: 19} 
let berg = new Person("berg", 105);
berg
// Output: Person {name: "berg", age: 105}
me
// Output: Person {name: "berg", age: 19}
berg.changeAge(100);
berg
// Output: Person {name: "berg", age: 100}
me
// Output: Person {name: "berg", age: 19}
```
Changing the age of `berg` will not change the age of `me`.

We can see that the `this` keyword specifies which person's age we are changing, namely the "current object/instance" itself.


## Set up React

Create a new directory (hackschool-w6) on your desktop. Create a new `index.html` in the directory.
Navigate to https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html.
Copy all of its content and paste it into `index.html`. Opening the HTML file with your web browser should show a single "Hello, world!" heading.

Let's digest a bit what's happening in the file. We see some `<script>` elements that load React.
But the `<body>` element is basically empty, with a single `<div id="root">`.
The `<script>` element in the body looks like

```jsx
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

### JSX

The syntax is extremely weird. 
It looks like a mix of JavaScript and HTML. 
This syntax is called __JSX__, which is JavaScript-XML.
JSX is made to make writing React easier.

XML is kind of similar to HTML but slightly different; see [here](http://courses.cs.vt.edu/~cs1204/XML/htmlVxml.html).

However, __JSX is not JavaScript__. You cannot execute or write JSX in your browser.
For this code to execute, it must first be _converted_ to plain JavaScript.
That's what the `type="text/babel"` attribute in the `<script>` tag does: Babel is the "transpiler" that converts JSX to JavaScript.

The `<h1>Hello, world!</h1>` part is JSX that creates a React element.

### ReactDOM.render

Now look at the `ReactDOM.render()` call.

```jsx
ReactDOM.render(<h1>…</h1>, document.getElementById('root'));
```

`ReactDOM.render` function takes in 2 things, a React element that we created, and an element from the page. 
What it does is that it replaces the element with `id="root"` with the element in the first argument.

### Class components

A restriction on `ReactDOM.render` is that it can only render a single element.
To build more complex websites, we'd have to package it all into a _component_.

Let's first create a _container_ for the entire app that includes the `<h1>` element. (Yes, the idea of containers exist here too!)

```jsx
class App extends React.Component {
  render() {
    return (
      <>
        <h1>Hello world</h1>
      </>
    );
  }
}
```

We see here that `App` is a class, but a bit special in that it is a `React.Component`.
It has a `render` method that returns whatever we want to be on the page.

```diff
 ReactDOM.render(
-  <h1>Hello, world!</h1>,
+  <App />,
   document.getElementById('root')
 );
```

Let's say we want to make a Twitter clone app.

Let's define a "tweet" component. 

```jsx
class Tweet extends React.Component {
  render() {
    return (
      <div>
        <p>I love De Neve.</p>
        <br />
        <button>❤️</button>
      </div>
    );
  }
}
```

Let put `Tweet` into `App` so we can see it.

```diff
 class App extends React.Component {
   render() {
     return (
       <>
-        <h1>Hello world</h1>
+        <Tweet />
       </>
     );
   }
 }
```

See that we can use our defined components in `App`.
Right now the text of the tweek is _hard-coded_: it always says "I love De Neve."
We can actually change the content of the tweet with something called __props__.

```jsx
class Tweet extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.tweet}</p>
        <br />
        <button>❤️</button>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <>
        <Tweet tweet="I love De Neve" />
      </>
    );
  }
}
```

This `tweet` looks like attribute in HTML, like `<h1 id="title">`.

Whatever "attributes" are being passed into `Tweet` would be store in an object called `props` (properties).
You can access it through `this.props`. 

Notice another thing. `this.props.tweet` is a JavaScript syntax in a bunch of JSX code. 
We make clear that it is JavaScript by surrounding it with `{ }`.

Let's render multiple tweets.

```jsx
class App extends Component {
  render() {
    return (
      <>
        <Tweet tweet="I love De Neve. "/>
        <Tweet tweet="I love Rende. "/>
        <Tweet tweet="I hate BPlate. "/>
      </>
    );
  }
}
```

We can actually uses an array to help us store these tweets.

```jsx
class App extends Component {
  render() {
    const tweets = ["I love Rende", "I hate BPlate"];
    const elements = [];
    for (const tweet of tweets) {
      elements.push(<Tweet tweet={tweet} />);
    }
    return (
      <>
        {elements}
      </>
    );
  }
}
```

`push` is a function of array that adds the argument to the end of the array.
In this case, for each tweet in `tweets`, we create a `Tweet` object with the appropriate prop set.

This is how React allows us to __reuse__ parts of our application.
We reuse the component `Tweet` without worrying the structure inside `Tweet`.
