const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 4000;

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json());

app.get('/' , (req,res) => {
    res.sendFile(__dirname + "index.html");
});

app.post('/calculate' , (req,res) => {

    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const operation = req.body.operation;

    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                return res.status(400).json({ error: 'Division by zero is not allowed' });
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result });
});

app.listen(port, () => {
    console.log(`Calculator API listening at http://localhost:${port}`);
});