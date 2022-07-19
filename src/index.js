'use strict';
// requires
const fs = require('fs');
const path = require('node:path');
const Discord = require('discord.js');
const { Client, GatewayIntentBits, Partials } = require('discord.js');require('dotenv').config();

const Mongo = require('mongodb');


const client = new Discord.Client({

  intents: [
    GatewayIntentBits.FLAGS.GUILDS,
  ],

  presence: {
    activities: [{
      name: 'You',
      type: 'WATCHING',
    }],
  },

});

client.on('ready', () => {
  console.log('ready');
});

/**
 * @typedef {Object} GLOBALS
 */
const GLOBALS = {
  // ...
};

client.login(process.env.TOKEN);