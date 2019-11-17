//Took me 4-5 minutes.  Allow 8-10?
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static_page.html');
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
})

app.listen(3000);
console.log("Server running! Press 'ctrl' + 'c' to quit!")