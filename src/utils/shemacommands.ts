import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message, TextChannel } from 'discord.js';

import User, { IUser } from "../models/User";

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
}