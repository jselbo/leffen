/*
 * API: https://discord.js.org/
 * Eventually this should change to import, but I tried doing this and
 * the defintion file that comes with discord.js is broken and Promises werent defined
 */
const Discord = require('discord.js');

const CLIENT_READY_TOKEN = 'ready';
const CLIENT_MESSAGE_TOKEN = 'message';

const BOT_ID = '275384669137272832';
const BOT_TOKEN = '1lk5fTweeRNRdJBdROdSdQTcVa1tmfmO4ps6k_VkLKmVJdQYUn88vbFDSyt7Nw6prXx-';

const TEMP_TOKEN = 'MjgzMTI3NTI3NjYzMjA2NDAw.C4wiug.5IayjFUBGlhS-A1d4-wIMpFR2GI';

const hook = new Discord.WebhookClient(BOT_ID, BOT_TOKEN);

/*
 * TODO:
 * 1.) Create a Messenge Listener
 * 2.) Create message parser 
 * 3a.) Accept Timestamps + Video ID
 * 3b.) Store TimeStampes + Video ID 
 * 4.) Return stored Timestampes 
 */

module DiscordBot {

  export class Request {
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

  export class Bot {

    private client;
    private messageParser;
    private requestHandler;

    public constructor() {
      this.client = new Discord.Client();
      this.messageParser = new MessageParser();
      this.requestHandler = new RequestHandler();
    }

    public listen() {
      this.setUpListeners();
      this.client.login(TEMP_TOKEN);
    }

    private setUpListeners() {
      this.client.on(CLIENT_READY_TOKEN, () => {
        this.onClientReady();
      });
      this.client.on(CLIENT_MESSAGE_TOKEN, message => {
        this.onClientMessage(message);
      });
    }

    private onClientReady() {
      console.log('[BOT] Ready!');
    }

    private onClientMessage(message) {
      console.log('[BOT] Received message: ' + message.content);
      try {
        const actionRequest = this.messageParser.parseMessage(message.content);
        this.requestHandler.handleActionRequest(actionRequest);
      } catch (error) {
        console.log('[BOT] Failed to parse message! ' + error);
      }
    }
  }

  /*
   * Types of action request messages.
   */
  enum RequestType {
    // If the message was not directed at the bot, i.e. didn't start with "!"
    NO_ACTION,
    // Request to record a timestamp for a certain video
    RECORD_TIMESTAMP,
  }

  /*
   * Stores information about a message request.
   */
  abstract class ActionRequest {

    public constructor(readonly type: RequestType) {
    }
  }

  class NoActionRequest extends ActionRequest {

    public constructor() {
      super(RequestType.NO_ACTION);
    }
  }

  class RecordTimestampRequest extends ActionRequest {

    public constructor(
        readonly videoId: string,
        readonly timestamp: Timestamp,
        readonly comment: string) {
      super(RequestType.RECORD_TIMESTAMP);
    }
  }

  /*
   * Parses messages sent in the Discord channel.
   */
  class MessageParser {

    public parseMessage(messageText: string): ActionRequest {
      if (messageText.length === 0 || !this.stringStartsWith(messageText, '!')) {
        return new NoActionRequest();
      }

      const tokens = messageText.split(' ');
      const command = tokens[0].substr(1);
      const commandType = this.parseCommandType(command);

      switch (commandType) {
        case RequestType.RECORD_TIMESTAMP:
          if (tokens.length < 3) {
            throw new Error('Invalid record timestamp format');
          }
          const videoId = tokens[1];
          const timestamp = Timestamp.parse(tokens[2]);
          const comment = tokens.slice(3).join(' ');
          return new RecordTimestampRequest(videoId, timestamp, comment);

        case RequestType.NO_ACTION:
        default:
         // Shouldn't happen - this is not a parseable command
         throw new Error('unreachable');
      }
    }

    private parseCommandType(command: string): RequestType {
      if (command.length === 0) {
        throw new Error('Empty command');
      }
      if (command === 'ts' ||
          command === 'timestamp') {
        return RequestType.RECORD_TIMESTAMP;
      }
      throw new Error('Invalid command: ' + command);
    }

    private stringStartsWith(haystack: string, needle: string): boolean {
      return haystack.lastIndexOf(needle, 0) === 0;
    }
  }

  /*
   * Handles requests made by users in the Discord channel.
   */
  class RequestHandler {

    public handleActionRequest(request: ActionRequest) {
      switch (request.type) {
        case RequestType.NO_ACTION:
          // Not for us.
          break;
        case RequestType.RECORD_TIMESTAMP:
          const recordTimestampRequest = <RecordTimestampRequest> request;

          // TODO implement
          console.log('record timestamp');
          break;
      }
    } 
  }

  /*
   * A timestamp.
   */
  class Timestamp {

    private constructor(
        readonly hours: number,
        readonly minutes: number,
        readonly seconds: number) {
      // TODO normalize values, i.e. if seconds > 60 convert to minutes, etc.
    }

    public toString(): string {
      return this.hours + ':' + this.minutes + ':' + this.seconds;
    }

    static parse(rawTimestamp: string): Timestamp {
      if (rawTimestamp.indexOf(':') === -1) {
        return null;
      }
      const tokens = rawTimestamp.split(':');
      if (tokens.length === 2) {
        const minutes = parseInt(tokens[0]);
        const seconds = parseInt(tokens[1]);
        if (minutes === NaN || seconds === NaN) {
          return null;
        }
        return new Timestamp(0, minutes, seconds);
      }
      if (tokens.length === 3) {
        const hours = parseInt(tokens[0]);
        const minutes = parseInt(tokens[1]);
        const seconds = parseInt(tokens[2]);
        if (hours === NaN || minutes === NaN || seconds === NaN) {
          return null;
        }
        return new Timestamp(hours, minutes, seconds);
      }
      return null;
    }
  }

}
export default DiscordBot;
