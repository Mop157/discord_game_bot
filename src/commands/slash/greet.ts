import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('greet')
    .setDescription('Greets a person')
    .addStringOption(option => 
      option.setName('name')
        .setDescription('The name of the person to greet')
        .setRequired(true)),
  
  async execute(interaction: CommandInteraction) {
    const name = interaction.options.get('name')?.value as string;
    await interaction.reply(`Привет, ${name}!`);
  },
};