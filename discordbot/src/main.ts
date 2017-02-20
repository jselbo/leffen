import * as bodyParser from 'body-parser';
import * as express from 'express';
import DiscordBot from './DiscordBot';

import * as http from 'http';

const port = 3000

const app = express();
const jsonParser = bodyParser.json();
const discordBot = new DiscordBot.Bot();
discordBot.listen();

app.get('/', (req, res) => {
  res.send('Timestamp lyfe');
});

app.post('/', jsonParser, (req, res) => {
  const url = req.body.URL;
  const videoId = req.body.VideoID;
  const title = req.body.Title;

  const discordRequest = new DiscordBot.Request(url, videoId, title);
  discordRequest.sendVideoPing();

  res.send('Discord Bot Message Sent!');
});

app.listen(port, () =>  {
  console.log('Running...');
});

