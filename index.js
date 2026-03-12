const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log(`Bot connecté : ${client.user.tag}`);
});


// MESSAGE DE BIENVENUE
client.on('guildMemberAdd', member => {

  const channel = member.guild.channels.cache.find(c => c.name === "bienvenue");

  if (!channel) return;

  channel.send(`👋 Bienvenue ${member} sur le serveur !`);

});


// COMMANDES
client.on('messageCreate', async message => {

  if (message.author.bot) return;

  // ping
  if (message.content === "!ping") {
    message.reply("Pong !");
  }


  // panel ticket
  if (message.content === "!panel") {

    const menu = new StringSelectMenuBuilder()
      .setCustomId('ticket_select')
      .setPlaceholder('Choisis la catégorie du ticket')
      .addOptions([
        {
          label: 'Support',
          value: 'support',
          emoji: '❓'
        },
        {
          label: 'Recrutement Staff',
          value: 'staff',
          emoji: '⚒️'
        },
        {
          label: 'Legal',
          value: 'legal',
          emoji: '📗'
        },
        {
          label: 'Illegal',
          value: 'illegal',
          emoji: '📕'
        },
        {
          label: 'Partenariat',
          value: 'partenariat',
          emoji: '📩'
        },
        {
          label: 'Win Giveaway',
          value: 'giveaway',
          emoji: '🎉'
        }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    message.channel.send({
      content: "🎫 **Choisis la catégorie de ton ticket :**",
      components: [row]
    });

  }

});


// CREATION DU TICKET
client.on('interactionCreate', async interaction => {

  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === "ticket_select") {

    const type = interaction.values[0];

    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: 0
    });

    channel.send(`🎫 Ticket **${type}** ouvert par ${interaction.user}`);

    interaction.reply({
      content: `✅ Ton ticket a été créé : ${channel}`,
      ephemeral: true
    });

  }

});

client.login(process.env.TOKEN);
