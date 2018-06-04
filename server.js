const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var data = [];
app.get('/',function(req, res){
    res.status(200).send(data);
})

app.post('/',function(req, res){
    data.push(req.body);
    res.status(200).send(data);
})

app.listen(PORT, ()=>{console.log("this server is up on port " + PORT);})