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

client.on('messageCreate', async message => {

  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("Pong !");
  }

  if (message.content === "!ticket") {

    const channel = await message.guild.channels.create({
      name: `ticket-${message.author.username}`,
      type: 0
    });

    channel.send(`Bonjour ${message.author}, explique ton problème ici.`);
  }

});

client.login(process.env.TOKEN);


