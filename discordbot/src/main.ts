import * as bodyParser from 'body-parser';
import * as express    from 'express';
import * as discordBot from './DiscordBot';
const app = express();
const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
  res.send('Timestamp lyfe');
});

app.post('/', jsonParser, (req, res) => {
  const url = req.body.URL;
  const videoId = req.body.VideoID;
  const title = req.body.Title;

  let discordObj = new discordBot.discordRequest(url, videoId, title); 
  discordObj.sendVideoPing();

  res.send('Discord Bot Message Sent!');
});

app.listen(3000, () =>  {
  console.log('Running...');
});

