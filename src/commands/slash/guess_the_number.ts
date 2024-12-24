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
    this.slots = {}
  }

  async execute(interaction: CommandInteraction) {

    if (!setting.game) return;

    else if (!(interaction.channel instanceof TextChannel)) {
      await interaction.reply({ content: LanguagesGame.errorChannel[config.language] });
      return;
    }

    const userId: string = interaction.user.id;
    this.slots[userId] = { 
      user: [],
      number: this.getRandomNumber(setting.randomNumber.min, setting.randomNumber.max) // generate random number
    };
    let attempts: number = 3;
    let textstart: string = `
${LanguagesGame.rules[config.language]}

- ${setting.emojis.WIN}  (1) - ${setting.prizelist.prize1}
- ${setting.emojis.CLOSE}  (± ${setting.radius.radius1}) - ${setting.prizelist.prize2}
- ${setting.emojis.NEAR}  (± ${setting.radius.radius2}) - ${setting.prizelist.prize3}
- ${setting.emojis.FAR}  (± ${setting.radius.radius3}) - ${setting.prizelist.prize4}
- ${setting.emojis.VERY_FAR}  (± ${setting.radius.radius4}) - ${setting.prizelist.prize5}
- ${setting.emojis.RANDOM}  (± ${setting.randomNumber.max}) - ${setting.prizelist.prize6}`

    const textgame = (content: string): string => `
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
`
    
    await interaction.reply({ content: textstart });

    await new Promise( resolve => setTimeout(resolve, 5000) ); // timeout for 5 seconds

    await interaction.editReply({ content: textgame("?") })

    try {
      while (attempts--) {

        const message = await this.channelmessage(interaction, userId, setting.time); // get user's message

        if (message) {
          const { content, error, end }: verifyNumber = await this.verify(parseInt(message.content), userId); // verify user's input

          if (error) {
            await interaction.followUp({ content, ephemeral: true });
            continue;

          }

          await interaction.editReply({ content: textgame(content) });

          if (end) break;
          
        }
      }
      const user = await this.userbalance(interaction.user.id, interaction.user.username) // update user's balance

      if (!user) {
        await interaction.followUp({ content: Languages.Database.error_save_user[config.language || "EN"], ephemeral: true });
        return;
      }
      delete this.slots[userId];
      await interaction.followUp({ content: `${LanguagesGame.upbalance[config.language]} ${user.balance}`, ephemeral: true });

    } catch (error) { // error timeout
      delete this.slots[userId]; 
      await interaction.followUp(LanguagesGame.errorTime[config.language]);
    }
  }

  private async verify(guess: number, userId: string): Promise<any> {
    const radiusMapping = [
      { radius: setting.radius.radius1, emoji: setting.emojis.CLOSE, message: LanguagesGame.radius3[config.language] },
      { radius: setting.radius.radius2, emoji: setting.emojis.NEAR, message: LanguagesGame.radius15[config.language] },
      { radius: setting.radius.radius3, emoji: setting.emojis.FAR, message: LanguagesGame.radius40[config.language] },
      { radius: setting.radius.radius4, emoji: setting.emojis.VERY_FAR, message: LanguagesGame.radius70[config.language] },
      { radius: setting.randomNumber.max, emoji: setting.emojis.RANDOM, message: LanguagesGame.radius100[config.language] }
    ]

    if (isNaN(guess)) {
      return { content: LanguagesGame.errorNumber[config.language], error: true };

    } else if (guess > setting.randomNumber.max) {
      return { content: LanguagesGame.errorMaxNumber[config.language], error: true };

    } else if (guess < setting.randomNumber.min) {
      return { content: LanguagesGame.errorMinNumber[config.language], error: true };

    } else if (guess === this.slots[userId].number) {
      this.slots[userId].user.push(`${guess} | 🎉`)
      return { content: LanguagesGame.radius1[config.language], error: false, end: true };

    }
    const difference = Math.abs(this.slots[userId].number - guess);
    for (const { radius, emoji, message } of radiusMapping) {
      if (difference <= radius) {
        this.slots[userId].user.push(`${guess} | ${emoji}`);
        return { content: message, error: false };
      }
    }
  }

  private async userbalance(userId: string, username: string) {
    const prizelist: prizetype = {
      [setting.emojis.WIN]: setting.prizelist.prize1,
      [setting.emojis.CLOSE]: setting.prizelist.prize2,
      [setting.emojis.NEAR]: setting.prizelist.prize3,
      [setting.emojis.FAR]: setting.prizelist.prize4,
      [setting.emojis.VERY_FAR]: setting.prizelist.prize5,
      [setting.emojis.RANDOM]: setting.prizelist.prize6,
    }; // prize user balance
    try {
      let balanse: number = this.slots[userId].user
      .map((slot) => prizelist[slot.slice(slot.length - 2)])
      .reduce((a, b) => a + b, 0);
      console.log(balanse);

      return await this.updateUserBalance(userId, username, balanse) // update user

    } catch (error) {
      console.error(Languages.Database.error_save_user[config.language || "EN"] + " :", error);
      return;
    }


  }
} 

export default new GuessNumberCommand();