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


var data = [{"stockName":"TCS","buyPrice":"1800","stopLoss":"1700","target":"2000"},{"stockName":"ACC","buyPrice":"1000","stopLoss":"900","target":"1500"},{"stockName":"LTI","buyPrice":"800","stopLoss":"500","target":"2000"},{"stockName":"3MINDIA","buyPrice":"20000","stopLoss":"19000","target":"25000"},{"stockName":"AEGISCHEM","buyPrice":"250","stopLoss":"200","target":"300"}];
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
