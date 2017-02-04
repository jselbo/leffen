var discordBot = require('./DiscordBot.js');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.get('/', (req, res) => {
  res.send('Timestamp lyfe');
});

app.post('/', jsonParser, (req, res) => {
  const url = req.body.URL;
  const videoId = req.body.VideoID;
  const title = req.body.Title;
  discordBot.sendMessage(url, videoId, title);
  res.send('Discord Bot Message Sent!');
});

app.listen(3000, () =>  {
  console.log('Running...');
});

