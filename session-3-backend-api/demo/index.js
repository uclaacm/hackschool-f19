const express = require('express');
const app = express();

app.get('/random', (request, response) => {
    const myJSON = {
	    number: Math.random()
    };
    response.json(myJSON);
});

app.use(express.json());
app.post('/name', (request, response) => {
    const body = request.body;
    if (body.name === undefined ) {
        response.status(400);
        const wrong = {
            message: "Input JSON does not contain key 'name'"
        };
        response.json(wrong);
        return;
    }
    else {
        const sayHi = "Hello " + body.name;
        console.log(sayHi);
        const resJSON = {
            message: sayHi
        };
        response.json(resJSON);
    }
});


app.listen(3000);
console.log("Yay our server is running! Access it through localhost:3000");
