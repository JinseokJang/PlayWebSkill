const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));

require('./routes/db')(app);
require('./routes/daum')(app);

app.get("/",(req,res)=>{
    res.sendFile("/index.html",{root:__dirname+"/public"});
})

app.listen(8081,()=>{
    console.log("server open");
})