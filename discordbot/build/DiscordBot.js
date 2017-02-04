"use strict";
//API: https://discord.js.org/#/
var Discord = require('discord.js');
var hook = new Discord.WebhookClient('275384669137272832', '1lk5fTweeRNRdJBdROdSdQTcVa1tmfmO4ps6k_VkLKmVJdQYUn88vbFDSyt7Nw6prXx-');
//TODO: Add a command/listening function for users to give the bot 
//videoid and timestamps
module.exports = {
    sendMessage: function (url, videoId, title) {
        var msg = 'Video URL: https://' + url + ' Title: ' + title;
        hook.sendMessage(msg);
    }
};
