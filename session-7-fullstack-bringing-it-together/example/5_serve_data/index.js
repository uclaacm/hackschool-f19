const express = require('express');
const app = express();
app.use(express.json());

const cards = [
    {
        name:"Kykar, Wind's Fury", 
        url: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=466966&type=card"
    },
    {
        name:"Niv-Mizzet, Parun", 
        url: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=452942&type=card"
    },
    {
        name: "Ral, Storm Conduit", 
        url: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=461138&type=card"
    },
    {
        name: "Thousand-Year Storm", 
        url: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=452957&type=card"
    },
    {
        name: "Expansion // Explosion", 
        url: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=452974&type=card"
    },
    {
        name: "Narset's Reversal", 
        url: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=460989&type=card"
    },
    {
        name: "Frantic Search", 
        url: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=456653&type=card"
    },
    {
        name: "Fiery Confluence", 
        url: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=446834&type=card"
    },
]

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static_page.html');
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
})

app.get('/cards', (req, res) => {
    res.contentType = 'application.json'
    res.json(cards);
})

app.listen(3000);
console.log("Server running! Press 'ctrl' + 'c' to quit!")