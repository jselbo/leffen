"use strict";
var discordBot = require('./DiscordBot.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.get('/', function (req, res) {
    res.send('Timestamp lyfe');
});
app.post('/', jsonParser, function (req, res) {
    var url = req.body.URL;
    var videoId = req.body.VideoID;
    var title = req.body.Title;
    discordBot.sendMessage(url, videoId, title);
    res.send('Discord Bot Message Sent!');
});
app.listen(3000, function () {
    console.log('Running...');
});
