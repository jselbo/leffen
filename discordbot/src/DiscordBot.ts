/* API: https://discord.js.org/
 * Eventually this should change to import, but I tried doing this and
 * the defintion file that comes with discord.js is broken and Promises werent defined
 */
const Discord = require('discord.js');
const hook = new Discord.WebhookClient('275384669137272832', '1lk5fTweeRNRdJBdROdSdQTcVa1tmfmO4ps6k_VkLKmVJdQYUn88vbFDSyt7Nw6prXx-');

/* TODO:
 * 1.) Create a Messenge Listener
 * 2.) Create message parser 
 * 3a.) Accept Timestamps + Video ID
 * 3b.) Store TimeStampes + Video ID 
 * 4.) Return stored Timestampes 
 */

export class discordRequest {
  private url      : string;
  private videoId  : string; 
  private title    : string;

  public constructor(url: string, videoId: string, title: string) {
    this.url     = url;
    this.videoId = videoId;
    this.title   = title;
  }

  public sendVideoPing() {
    hook.sendMessage(`Video ${this.videoId}: https://${this.url} Title: ${this.title}`);
  }
}
