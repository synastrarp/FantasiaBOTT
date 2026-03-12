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

client.login("MTQ4MDU4NDEzOTY2NDI2MTEyMA.Gh0ab6.T7sYdhcqDmiBXBw55ZSaIEI3Tcq4Bc2jxmMqnA")

