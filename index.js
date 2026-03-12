const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

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

  if (message.content === "!panel") {

    const menu = new StringSelectMenuBuilder()
      .setCustomId('ticket_select')
      .setPlaceholder('Choisis la catégorie de ton ticket')
      .addOptions([
        {
          label: 'Support',
          description: 'Besoin d’aide',
          value: 'support',
          emoji: '❓'
        },
        {
          label: 'Recrutement Staff',
          description: 'Postuler pour le staff',
          value: 'staff',
          emoji: '⚒️'
        },
        {
          label: 'Legal',
          description: 'Questions légales',
          value: 'legal',
          emoji: '📗'
        },
        {
          label: 'Illegal',
          description: 'Signalement',
          value: 'illegal',
          emoji: '📕'
        },
        {
          label: 'Partenariat',
          description: 'Demande de partenariat',
          value: 'partenariat',
          emoji: '📩'
        },
        {
          label: 'Win Giveaway',
          description: 'Problème avec un giveaway',
          value: 'giveaway',
          emoji: '🎉'
        }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    message.channel.send({
      content: "🎫 **Ouvre un ticket en choisissant une catégorie :**",
      components: [row]
    });

  }

});

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
