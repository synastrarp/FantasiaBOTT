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

client.login(process.env.TOKEN);


client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(c => c.name === "⛷️㆐arrivants");

  if (!channel) return;

  channel.send(`Bienvenue ${member} sur le serveur !`);
});

