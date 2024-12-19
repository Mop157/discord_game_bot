import { Client, Collection } from 'discord.js';

export interface ExtendedClient extends Client {
  slashCommands: Collection<string, any>;
  prefixCommands: Collection<string, any>;
  buttons: Collection<string, any>;
}