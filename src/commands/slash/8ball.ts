import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import BaseCommand from '../../utils/shemacommands';
import { config } from '../../config';
import { setting, LanguagesGame } from "../../settings/games/setting8ball";

class ballCommand extends BaseCommand {
  data: SlashCommandBuilder;
  private texts = (setting.me_texts.me ? setting.me_texts.texts : LanguagesGame.texts[config.language || "EN"]) as string[];

  constructor() {
    super();
    this.data = new SlashCommandBuilder()
      .setName(setting.gameName)
      .setDescription(setting.gameDescription)
      .addStringOption(option =>
        option
        .setName(setting.option.name)
        .setDescription(setting.option.description)
        .setMinLength(setting.option.minLength)
        .setMaxLength(setting.option.maxLength)
        .setRequired(true)
      ) as SlashCommandBuilder;
  }

  async execute(interaction: CommandInteraction) {

    if (!setting.game) return;

    await interaction.reply({ content: `
╔═- ${interaction.options.get(setting.option.name)?.value || LanguagesGame.not_texts[config.language || "EN"]}
║ 
╚═══-${this.texts[this.getRandomNumber(0, this.texts.length - 1)]}
  ` });
  }
}

export default new ballCommand();