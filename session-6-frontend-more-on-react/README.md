# Hackschool Session 6 Frontend: More on React
**Location**: Boelter 5249
**Time**: 6–7pm, November 13, 2019

**Teacher**: Shirly Fang

## Resources

**Slides**
* [Session 6 Frontend: More on React](https://tinyurl.com/hackschool19-w7f)

**ACM Membership Attendance Portal**
* [Portal](https://members.uclaacm.com/login)

## What we'll be learning today

* Component state
* Using inputs
* Callbacks and event handlers 
* Making a simple application with a few components and the above concepts

## A simple app using state, input, and callbacks

We are going to make a play generator where we will be able to see a script that we generate ourselves. 
To do this we will select the character we are creating dialogue for, and then input the dialogue that we want. 

Let's create a directory called *hackschool-reactapp* and create a file in it called index.html. 

Go ahead and copy the following boilerplate code into index.html. 

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    
    <!-- Don't use this in production: -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
    
      class PlayGenerator extends React.Component {
        render() {
          return (
            <>
            </>
          );
        }
      }

      ReactDOM.render(<PlayGenerator />, document.getElementById('root'));
    </script>
    <!--
      Note: this page is a great way to try React but it's not suitable for production.
      It slowly compiles JSX with Babel in the browser and uses a large development build of React.
      Read this section for a production-ready setup with JSX:
      https://reactjs.org/docs/add-react-to-a-website.html#add-jsx-to-a-project
      In a larger project, you can use an integrated toolchain that includes JSX instead:
      https://reactjs.org/docs/create-a-new-react-app.html
      You can also use React without JSX, in which case you can remove Babel:
      https://reactjs.org/docs/react-without-jsx.html
    -->
  </body>
</html>
```


### Showing dialogue

Last week we saw we can have a list of strings and then use a for loop to create a list of Tweet components. This was
happening inside of the render function. But what if we wanted our elements to update on the screen whenever a new element was added?
We can do this with **state**. Unlike props, which are passed down by a parent component, with state, we can store certain properties that belong to the component. When the state object changes, the component's render function is called. 

We can initialize state in the component's constructor. Remember that the constructor happens when the component is first created.
```js
  constructor() {
      super();
      this.state = {
          playLines: [],
          selectedCharacter: null
      };
  } 
```

To understand super(); you need to learn about object orientated programming. Feel free to look it up. We initialize playLines 
to an empty list because our play is empty right now. Also, we don't have a selected character to create lines yet. We are
keeping this in the state because we want the visuals to update every time a new play line is added and we want to make sure
we update the character who is speaking that line. 

Next, let's get our play lines onto the page. 

```jsx
  render() {
    return (
      <div className="play-container">
       {this.state.playLines.map(line => <DialogueLine key={line} content={line} />)}
      </div>
    );
  }
```

We can use map here in order to take all of the lines we have in this.state.playLines to create DialogueLines. We create a 
DialogueLine component here because we are going to create our own unique grouping of HTML elements and reuse them.

Note that *className* is used instead of *class* for the CSS styling because in Javascript and thus JSX,
class is a keyword. So, we can't use it freely anymore. 

So, lets add a DialogueLine component to our project.

```jsx
  class DialogueLine extends React.Component {
    render() {
      return (
        <div className="dialogue-container">
            <div className="dialogue-words">
                <p>{this.props.content}</p>
                <br />
            </div> 
        </div>    
      );
    }
  }
```

For the styles, remember we must create a *style.css* file and link it to this file by putting a link in the head.

```html
<head>
...

<link rel="stylesheet" href="style.css" /> 

</head>
```

Here are the styles for the 3 classes we just saw. Put these into the style.css file.

```css
.play-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
}

.dialogue-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100vw;
    margin-top: 10px;
}

.dialogue-words {
    height: 100%;
    width: 80%;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;
}
```


We can test this out by adding some strings to our playLines property in the constructor. 

### Adding dialogue

Next, we can create an input so that we can spontaneously add lines to our play. We will create an input component to do this. 

First, lets add this input component to our PlayGenerator and decide what to do with the input we will get.
We want to be able to add lines to our play visual and in order to do this, we can pass a function to DialogueInput as a props. 

```jsx
  render() {
    return (
      <div className="play-container">
       {this.state.playLines.map(line => <DialogueLine key={line} content={line} />)}
       <DialogueInput addLineToPlay={this.addLineToPlay}/>
      </div>
    );
  }
```

This function is a callback. Callbacks are a function that are run at a later time. 
This means that the parent component gave the child component this function to be used later.

The function will allow the child to pass information back up to the parent, so that it may do what it wishes with it.
In this case, we are going to pass up the inputted text back up to PlayGenerator from the input component. 

So, we want it so that when a user inputs text and presses submit, we will add the line to our
play by passing that text back up to PlayGenerator so that we can update this.state.playLines. By passing addLineToPlay to DialogueInput, we can do exactly that in the DialogueInput component later. 


Let's go ahead write the functionality for addLineToPlay.

```jsx
  class PlayGenerator extends React.Component {
    constructor() {
        ...
        this.addLineToPlay = (content) => { this.addLine(content); }; // add this line to constructor 
    } 

    addLine(content) {
      const newLines = [...this.state.playLines, content];
      this.setState({
        playLines: newLines
      });
    }

    render() {
      ...
    }
  }
```

Let's digest all of what we just did.

We can see we add the line to the array of lines in the state object. Take note of the syntax.
* We use setState and do not access this.state directly because setState will actually cause render to be called again. 
* Because we are using an array, we have to create a new array with the new line and store it into state. 
 

Here is the DialogueInput component.

```jsx
  class DialogueInput extends React.Component {
    render() {
      return (
        <div>
            <label>
                 Enter a beautiful line:
                <input type="text" name="content" />
            </label>
            <button onClick={this.handleSubmit}> Submit </button>
        </div>
      );
    }
  }
```

This gives us a basic textbox but we aren't doing anything with it right now. In React, the component handles what to do with any 
interaction with the above input. So, we want to have the component keep track of what has been inputted and what to do if the
user hits submit. 

Change the existing DialogueInput to look like the following. 

```jsx
      class DialogueInput extends React.Component {
        constructor() {
          super();
          this.state = {value: ''};

          this.handleChange = (e) => { this.changeValue(e); };
          this.handleSubmit = () => { this.clickedSubmit(); };
        }

        changeValue(event) {
          this.setState({value: event.target.value});
        }

        clickedSubmit() {
          this.props.addLineToPlay(this.state.value);
        }
            
        render() {
          return (
            <div>
              <label>
                Enter a beautiful line:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <button onClick={this.handleSubmit}> Submit </button>
            </div>
          );
        }
      }
```

Let's digest a few of the lines we see.


We can see handleChange and handleSubmit are passed into the onChange and onClick events as event handlers. Event handlers are a type of callback. So, when the component is rendered, the functions are not called yet. They are kind
of stored away for later use if those two events happen. 

We can see in clickedSubmit, we are using the callback function we previously saw in PlayGenerator. 

So effectively, as we interact with the input, handleChange is called with whatever was typed in. This is then stored 
in the component's state object. Later, if we hit submit, then handleSubmit is called and we pass the text back up to PlayGenerator where it updates the state and adds the new line.


### Adding characters

So we generated lines but usually a play and script has multiple characters. Let's go ahead and add the ability to choose
a specific character that we want to 'speak' the lines. We can have it so that when we press a button, we set the id/name of that button as the selectedCharacter.

Add the following to PlayGenerator.

```js

  constructor() {
    ...
    this.changeCharacter = (e) => { this.setCharacter(e); }; 
  }

  setCharacter(e) {
    this.setState({
        selectedCharacter: e.target.id
    });
  }

```

Let's also add some characters and choose them as the 'current' speaker of the to-be new line by using buttons. 

```jsx

  render() {
    const characters = ["Chimmy", "Shooky", "Koya"]
    return (
      <div className="play-container">
         {this.state.playLines.map(line => <DialogueLine key={line} content={line} />)}
         {characters.map(name => 
         <button id={name} onClick={(e) => this.changeCharacter(e)} 
         className={name == this.state.selectedCharacter ? "selected" : "unselected"}>
           {name}
         </button>)}
         <DialogueInput addLineToPlay={this.addLineToPlay}/>
      </div>
    );
  }
```

Here we created buttons for all of the characters we want in this play. When the button is clicked, we will set the state object's selectedCharacter to the character name. We can see for the style of the button, we use something called a ternary operator.
Basically, if the most recent clicked on character button id matches the button id of the button that is about to be rendered, we want to make it seem selected, otherwise we want it to seem unselected. So, we give it a selected style while all the other buttons get an unselected style.

Here's the styles.

```css
.selected {
    color: black;
    background-color: lightgreen;
}

.unselected {
    color: black;
}

```


Now that we can have a selectedCharacter, let's add the name to each DialogueLine. We can do this by setting who
the selectedCharacter is as we add the line to the script. We change an object in the array to be an object with a  character and content value instead of just the content string so that we can have an object that has character and content properties grouped together. 

Add the following to PlayGenerator.

```js
  addLine(content) {
    const fullLine = {
      character: this.state.selectedCharacter,
      content: content
    }
    const newLines =  [...this.state.playLines, fullLine];
    this.setState({ 
      playLines: newLines
    });
  }
```

We can now pass this character information to DialogueLine. 

```jsx
{this.state.playLines.map(line => <DialogueLine key={line} character={line.character} content={line.content} />)}

```

Let's update our DialogueLine to show the character name. Also, let's go ahead and add an image to our DialogueLine.
We can create an object of character images and then choose the correct image link in the dictionary by matching the character name. 

Add the following to DialogueLine.

```jsx

  render() {
    const allImages = {
        "Chimmy": "https://cdn.shopify.com/s/files/1/0231/6137/2752/products/1200_chimmy_8809573079480-1_2000x.jpg?v=1565212917",
        "Koya": "https://www.bt21.com/im/character/bt21/koya.gif",
        "Shooky": "https://cdn130.picsart.com/293144906007211.png?r1024x1024"
    }
    return (
      <div className="dialogue-container">
          <img className="dialogue-image" src={allImages[this.props.character]}/>
          <div className="dialogue-words">
              <h3>{this.props.character}</h3>
              <p>{this.props.content}</p>
              <br />
          </div> 
      </div>    
    );
  }

```

Here's the style. 

```css
.dialogue-image {
    height: 100px;
    width: 100px;
}

```


Now, we have a fully functioning script/play generator where we can make up stories with whatever characters we want! 


## Mini project

Right now our project has 3 set characters in the play. 
We can make our PlayGenerator more flexible by allowing users to add any character they want at any point in time to the play. Create the functionality so that that is possible. 

This probably involves creating a way to input character names and image urls. Try it out! 









