import { SlashCommandBuilder } from '@discordjs/builders';
import { 
  CommandInteraction, 
  EmbedBuilder,
  ComponentType,
  TextChannel,
  Message,
  ActionRowBuilder,
  ButtonBuilder
} from 'discord.js';

import { config } from "../config";
import User, { IUser } from "../models/User";
import Buttons from '../buttons/LobbyButton';
import { setting, LanguagesGame, LobbyType } from '../settings/games/settingLobby';


export default abstract class BaseCommand {
  abstract data: SlashCommandBuilder;

  abstract execute(interaction: CommandInteraction): Promise<void>;

  protected async channelmessage(
    interaction: CommandInteraction,
    userId: string,
    time: number = 1000
  ): Promise<Message<boolean> | undefined> {

    const filter = (message: Message): boolean => message.author.id === userId;

    if (!(interaction.channel instanceof TextChannel)) return

    const collected = await interaction.channel?.awaitMessages({
      filter,
      max: 1,
      time,
      errors: ['time']
    })

    return collected?.first();

  }

  protected getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  protected async updateUserBalance(
    userId: string,
    globalName: string,
    amount: number
  ): Promise<IUser> {
    let user = await User.findOne({ userId: userId });
    
    if (!user) {
      user = new User({
        userId: userId,
        username: globalName,
        balance: 0,
      });
    }

    if ((user.balance + amount) < 0) user.balance = 0;
    else user.balance += amount;

    await user.save();
    return user;
  }

  protected async createLobby(
    interaction: CommandInteraction,
    maxPlayers: number = setting.maxPlayers,
    time: number = setting.time,
    gameinfo: string = setting.gameinfo || LanguagesGame.gameInfo[config.language]
  ): Promise<LobbyType | undefined> {

    if (!(interaction.channel instanceof TextChannel)) {
      await interaction.reply({ content: LanguagesGame.errorChannel[config.language], ephemeral: true });
      return;
    }
    const games: LobbyType = {};
    const gameId: number = Date.now();
    games[gameId] = {
      users: [interaction.user.id],
      creator: interaction.user.id,
      maxPlayers
    };

    const embed = new EmbedBuilder()
      .setColor(setting.colorLobby)
      .setTitle(`${LanguagesGame.lobbyname[config.language]} #${gameId}`)
      .setDescription(`${LanguagesGame.lobbyplaer[config.language]} 1/${games[gameId].maxPlayers}`)
      .addFields({ name: LanguagesGame.lobbycreator[config.language], value: `<@${interaction.user.id}>` })
      .setFooter({ text: LanguagesGame.lobbytext[config.language] });

    const row: ActionRowBuilder<ButtonBuilder> = await Buttons.createLobbyButtons(gameId);

    await interaction.reply({ embeds: [embed], components: [row] });

    const collector = interaction.channel?.createMessageComponentCollector({ 
      componentType: ComponentType.Button,
      time
    });

    try {
      const gamechannel: LobbyType | null = await Buttons.buttonClick(collector, games, embed, row, gameinfo);

      if (gamechannel) {
        return gamechannel

      } else {
        await interaction.followUp({ content: LanguagesGame.errorTime[config.language] });
      }

    } catch (err) {
      console.error(LanguagesGame.errorButton[config.language], err);
      await interaction.followUp({ content: LanguagesGame.errorButtonSend[config.language] });

    }
  }
}