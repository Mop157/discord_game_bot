import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import BaseCommand from '../../utils/shemacommands';
import { config } from '../../config';
import Languages from "../../utils/Languages";

class SlotCommand extends BaseCommand {
  data: SlashCommandBuilder;
  slots: string[] = config.gameSlots.Slots

  constructor() {
    super();
    this.data = new SlashCommandBuilder()
      .setName(config.gameSlots.gameName)
      .setDescription(config.gameSlots.gameDescription)
  }

  async execute(interaction: CommandInteraction) {

    if (!config.gameSlots.game) return;

    let message: string;
    let balanceChange: number;

    const slot1: string = this.slots[this.getRandomNumber(0, this.slots.length)];
    const slot2: string = this.slots[this.getRandomNumber(0, this.slots.length)];
    const slot3: string = this.slots[this.getRandomNumber(0, this.slots.length)];

    if (slot1 === slot2 && slot2 === slot3) {
      message = Languages.games.slots.victory_1[config.language];
      balanceChange = config.gameSlots.gameDatabase.victoryAmount[0];

    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
      message = Languages.games.slots.victory_2[config.language];
      balanceChange = config.gameSlots.gameDatabase.victoryAmount[1];

    } else {
      message = Languages.games.slots.defeat[config.language];
      balanceChange = config.gameSlots.gameDatabase.defeatAmount;
    }

    if (config.gameSlots.gameDatabase.database) {
        try {

            const user = await this.updateUserBalance(interaction.user.id, interaction.user.username, balanceChange);
            
            await interaction.reply({ content: `
╔═- ${message}
║ Баланс: ${user.balance}
╚═-[${slot1}]-[${slot2}]-[${slot3}]-
            ` });

          } catch (error) {
            console.error(Languages.Database.error_save_user[config.language] + " :", error);
            await interaction.reply(Languages.Database.error_save_user[config.language]);
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