import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import BaseCommand from '../../utils/shemacommands';
// import { setting, LanguagesGame } from '?';
import { config } from "../../config";

class Game extends BaseCommand {
  data: SlashCommandBuilder;
  private games: any;

  constructor() {
    super();
    this.data = new SlashCommandBuilder()
      .setName("game")
      .setDescription("game??");
    this.games = {};
  }

  async execute(interaction: CommandInteraction) {
    if (false) return;
    const gamechannel: any = await this.createLobby(interaction, 2, 300000);
    if (gamechannel) {
      await interaction.editReply({ content: "Start game!", embeds: [],  components: []})
    }
  }
}

export default new Game();





// import { SlashCommandBuilder } from '@discordjs/builders';
// import { CommandInteraction } from 'discord.js';

// import BaseCommand from '../../utils/shemacommands';
// import { setting, LanguagesGame } from '../../settings/games/settingBuckshotRoulette';
// import { config } from "../../config";
// import Languages from "../../utils/Languages";

// interface game {
//   [key: number]: {
//     user: string[];
//     number: number;
//   }
// }

// class SlotCommand extends BaseCommand {
//   data: SlashCommandBuilder;
//   private slots: game;

//   constructor() {
//     super();
//     this.data = new SlashCommandBuilder()
//       .setName(setting.gameName)
//       .setDescription(setting.gameDescription)
//     this.slots = {}
//   }

//   async execute(interaction: CommandInteraction) {

//     if (!setting.game) return;

//   }
// }

// export default new SlotCommand();