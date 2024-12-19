import { ButtonInteraction } from 'discord.js';

module.exports = {
  customId: 'example_button',
  async execute(interaction: ButtonInteraction) {
    await interaction.reply('You clicked the example button!');
  },
};