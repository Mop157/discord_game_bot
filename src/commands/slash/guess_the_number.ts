import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';

import BaseCommand from '../../utils/shemacommands';
import { setting, LanguagesGame } from '../../settings/games/settingGuessNumber';
import { config } from "../../config";
import Languages from "../../utils/Languages";

interface verifyNumber {
  content: string;
  error: boolean;
  end?: boolean
}

interface prizetype {
  [key: string]: number;
}

interface game {
  [key: string]: {
    user: string[];
    number: number;
  }
}

class GuessNumberCommand extends BaseCommand {
  data: SlashCommandBuilder;
  slots: game;

  constructor() {
    super();
    this.data = new SlashCommandBuilder()
      .setName(setting.gameName)
      .setDescription(setting.gameDescription)
    this.slots = {} // create game slots
  }

  async execute(interaction: CommandInteraction) {

    if (!setting.game) return;

    else if (!(interaction.channel instanceof TextChannel)) {
      await interaction.reply({ content: LanguagesGame.errorChannel[config.language] });
      return;
    }

    const userId: string = interaction.user.id;
    this.slots[userId] = { 
      user: [], // initialize user's slots
      number: this.getRandomNumber(setting.randomNumber.min, setting.randomNumber.max) // generate random number
    }; // initialize user's slots
    // this.slots[userId].user = []; 
    // this.slots[userId].number = 
    let attempts: number = 3;
    
    await interaction.reply({ content: `
${LanguagesGame.rules[config.language]}

- 🎉 (1) - ${setting.prizelist.prize1}
- 🔴 (± ${setting.radius.radius1}) - ${setting.prizelist.prize2}
- 🟥 (± ${setting.radius.radius2}) - ${setting.prizelist.prize3}
- 🟧 (± ${setting.radius.radius3}) - ${setting.prizelist.prize4}
- 🟨 (± ${setting.radius.radius4}) - ${setting.prizelist.prize5}
- 🟩 (± 100) - ${setting.prizelist.prize6}
      ` });

    await new Promise( resolve => setTimeout(resolve, 5000) ); // timeout for 5 seconds

    await interaction.editReply({ content: `
╔════════-----[${LanguagesGame.name[config.language]}]-
╠═══╣${interaction.user}╠--
║
╠══ ?
║
╠═ ?
║
╠ ?
║
╠═══[3]═-
╚══════════════---
      ` })

    try {
      while (attempts > 0) {

        const message = await this.channelmessage(interaction, userId, setting.time); // get user's message

        if (message) {
          const { content, error, end }: verifyNumber = await this.verify(parseInt(message.content), userId); // verify user's input

          if (error) { // error in user's input
            await interaction.followUp({ content, ephemeral: true });
            continue;

          } attempts--

          await interaction.editReply({ content: `
╔════════-----[${LanguagesGame.name[config.language]}]-
╠═══╣${interaction.user}╠--
║
╠══ ${this.slots[userId].user[0] ?? "?" }
║
╠═ ${this.slots[userId].user[1] ?? "?" }
║
╠ ${this.slots[userId].user[2] ?? "?" }
║
╠═══[${attempts}]═-
╚══════════════---
>${content}<
            ` });

          if (end) break; // end of interaction
          
        }
      }
      const user = await this.userbalance(interaction.user.id, interaction.user.username) // update user's balance

      if (!user) {
        await interaction.reply(Languages.Database.error_save_user[config.language || "EN"]);
        return;
      }
      console.log(this.slots[userId].number)
      delete this.slots[userId]; // remove user from slots
      await interaction.followUp({ content: `${LanguagesGame.upbalance[config.language]} ${user.balance}`, ephemeral: true });

    } catch (error) { // error timeout
      delete this.slots[userId]; // remove user from slots
      await interaction.followUp(LanguagesGame.errorTime[config.language]);
    }
  }

  private async verify(guess: number, userId: string): Promise<verifyNumber> {
    const difference = Math.abs(this.slots[userId].number - guess);

    if (isNaN(guess)) {
      return { content: LanguagesGame.errorNumber[config.language], error: true };

    } else if (guess > setting.randomNumber.max) {
      return { content: LanguagesGame.errorMaxNumber[config.language], error: true };

    } else if (guess < setting.randomNumber.min) {
      return { content: LanguagesGame.errorMinNumber[config.language], error: true };

    } else if (guess === this.slots[userId].number) {
      this.slots[userId].user.push(`${guess} | 🎉`)
      return { content: LanguagesGame.radius1[config.language], error: false, end: true };

    } else if (difference <= setting.radius.radius1) {
      this.slots[userId].user.push(`${guess} | 🔴`)
      return { content: LanguagesGame.radius3[config.language], error: false };

    } else if (difference <= setting.radius.radius2) {
      this.slots[userId].user.push(`${guess} | 🟥`)
      return { content: LanguagesGame.radius15[config.language], error: false };

    } else if (difference <= setting.radius.radius3) {
      this.slots[userId].user.push(`${guess} | 🟧`)
      return { content: LanguagesGame.radius40[config.language], error: false };

    } else if (difference <= setting.radius.radius4) {
      this.slots[userId].user.push(`${guess} | 🟨`)
      return { content: LanguagesGame.radius70[config.language], error: false };

    } else {
      this.slots[userId].user.push(`${guess} | 🟩`)
      return { content: LanguagesGame.radius100[config.language], error: false };
    }
  }

  private async userbalance(userId: string, username: string) {
    const prizelist: prizetype = {
      "🎉": setting.prizelist.prize1,
      "🔴": setting.prizelist.prize2,
      "🟥": setting.prizelist.prize3,
      "🟧": setting.prizelist.prize4,
      "🟨": setting.prizelist.prize5,
      "🟩": setting.prizelist.prize6,
    } // prize user balance
    try {
      let balanse: number = this.slots[userId].user
      .map((slot) => prizelist[slot.slice(slot.length - 2)])
      .reduce((a, b) => a + b, 0); // calculate user's balance

      return await this.updateUserBalance(userId, username, balanse) // update user

    } catch (error) {
      console.error(Languages.Database.error_save_user[config.language || "EN"] + " :", error);
      return;
    }


  }
} 

export default new GuessNumberCommand();