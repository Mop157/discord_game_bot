import { Message } from 'discord.js';

export default {
  name: 'hello',
  description: 'Replies with a greeting',
  execute(message: Message, args: string[]) {
    message.reply('Hello there!');
  },
};