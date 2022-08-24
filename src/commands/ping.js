const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    console.log(`${interaction} was Run`);
    const mesg = await interaction.reply({
      content: 'Bot Latency: Awaiting Discord...',
      fetchReply: true,
    });
    await interaction.editReply({
      content: `Bot Latency: ${mesg.createdTimestamp - interaction.createdTimestamp}ms`,
    });
  },
};