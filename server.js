const express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'));
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", function(req, res){
    res.sendFile( __dirname + "/" + "index.html");
});


var data = [];
app.get('/rest/',function(req, res){
    res.status(200).send(data);
})


app.post('/rest/',function(req, res){
    data.push(req.body);
    res.status(200).send("Ok");
})


app.delete('/rest/:index',function(req, res){
    data.splice(req.params.index, 1);
    res.status(200).send("Ok");
})


app.listen(PORT, ()=>{console.log("this server is up on port " + PORT);})