const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Bot connecté : ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.content === "!ping") {
    message.reply("Pong !");
  }
});

client.login("MTQ4MDU4NDEzOTY2NDI2MTEyMA.G--lC4.uWfo7aIby9aaB2LyssuUvvUVNhy4WI8qgiVHOw")


