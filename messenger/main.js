/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = 'Mjc1MzIxODExNDM0OTk1NzEz.C2_GYA.uVoSelPmgPc_tI4zK0ScmYexa0w';

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log('I am ready!');
});

// // create an event listener for messages
bot.on('message', message => {
  // if the message is "ping",
  if (message.content === 'ping') {
    // send "pong" to the same channel.
    message.channel.sendMessage('pong');
  }
});

// log our bot in
bot.login(token).then((success) => {
  console.log('Login Successful');
}, (failure) => {
  console.log('Failed to log in');
});