'use strict';
// requires
const fs = require('fs');
const path = require('node:path');
const {
  Client,
  Collection,
  GatewayIntentBits,
  ActivityType,
} = require('discord.js');
require('dotenv').config();

// Database Related
const Mongo = require('mongodb');
// const command = require('nodemon/lib/config/command');
const mongo = new Mongo.MongoClient(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});


const client = new Client({

  intents: [
    GatewayIntentBits.Guilds,
  ],

  presence: {
    activities: [{
      name: 'Myself',
      type: ActivityType.Playing,
    }],
  },

});

// /////////////////////////////////////////////////////////////////////////// //
// Event Handling
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  // console.log(event);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  }
  else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// /////////////////////////////////////////////////////////////////////////// //
// Command Handling
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  // eslint-disable-next-line no-shadow
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

module.exports = {
  mongo,
  client,
};

client.login(process.env.TOKEN);