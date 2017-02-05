# Melee YouTube Export Notifier (MYEN)

## Components
1. A script that traverses folder with videos and starts the upload to YouTube.
2. A Discord Bot that notifies users that a video has been uploaded and allows them to specify noteworthy timestamps.
3. [Future work] A web app that allows users to view information on the videos they have access to.

## Upload Script

### Purpose
To automate video uploading from a folder to YouTube.

### How to use
./leffen -f folder/path/with/videos

## Discord Bot

Description coming soon

### Development

1. [Install Node.js](https://nodejs.org/en/download/)
2. Install TypeScript: `npm install -g typescript`
3. In the root of the Discord Bot, run `yarn` or `yarn install` to install project modules
4. Run `tsc` to compile TypeScript source files
5. Run `node build/main.js` to start the bot
