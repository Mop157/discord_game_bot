import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import BaseCommand from '../../utils/shemacommands';
import { setting, LanguagesGame } from '../../settings/games/settingSlot';
import { config } from "../../config";
import Languages from "../../utils/Languages";

class SlotCommand extends BaseCommand {
  data: SlashCommandBuilder;
  private slots: string[] = setting.Slots

  constructor() {
    super();
    this.data = new SlashCommandBuilder()
      .setName(setting.gameName)
      .setDescription(setting.gameDescription)
  }

  async execute(interaction: CommandInteraction) {

    if (!setting.game) return;

    let message: string;
    let balanceChange: number;

    const slot1: string = this.slots[this.getRandomNumber(0, this.slots.length - 1)];
    const slot2: string = this.slots[this.getRandomNumber(0, this.slots.length - 1)];
    const slot3: string = this.slots[this.getRandomNumber(0, this.slots.length - 1)];

    if (slot1 === slot2 && slot2 === slot3) {
      message = LanguagesGame.victory_1[config.language || "EN"];
      balanceChange = setting.gameDatabase.victoryAmount[0];

    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
      message = LanguagesGame.victory_2[config.language || "EN"];
      balanceChange = setting.gameDatabase.victoryAmount[1];

    } else {
      message = LanguagesGame.defeat[config.language || "EN"];
      balanceChange = setting.gameDatabase.defeatAmount;
    }

    if (setting.gameDatabase.database) {
        try {

            const user = await this.updateUserBalance(interaction.user.id, interaction.user.username, balanceChange);
            
            await interaction.reply({ content: `
╔═- ${message}
║ ${user.username}: ${user.balance}
╚═-[${slot1}]-[${slot2}]-[${slot3}]-
            ` });

          } catch (error) {
            console.error(Languages.Database.error_save_user[config.language || "EN"] + " :", error);
            await interaction.reply(Languages.Database.error_save_user[config.language || "EN"]);
          }

    } else {

    await interaction.reply({ content: `
╔═- ${message}
║
╚═-[${slot1}]-[${slot2}]-[${slot3}]-
      ` });
    }
  }
}

export default new SlotCommand();