import { Message } from 'discord.js';

module.exports = {
  name: 'hello',
  description: 'Replies with a greeting',
  execute(message: Message, args: string[]) {
    message.reply('Hello there!');
  },
};