import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
import path from 'path';

import { config } from '../config';
import { ExtendedClient } from '../index';
import Languages from "../utils/Languages";

export default {
  name: 'ready',
  once: true,
  async execute(client: ExtendedClient) {
    console.log(`${Languages.read.Logged[config.language]} ${client.user?.tag}!`);

    // Register slash commands
    const commands = [];
    const slashCommandFiles = fs.readdirSync(path.join(__dirname, '..', 'commands', 'slash')).filter(file => file.endsWith('.ts'));

    for (const file of slashCommandFiles) {
      const { default: command } = await import(path.join(__dirname, '..', 'commands', 'slash', file));
      commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(config.token);

    try {
      console.log(Languages.read.Started[config.language]);

      await rest.put(
        Routes.applicationGuildCommands(config.clientId, config.guildId),
        { body: commands },
      );

      console.log(Languages.read.Successfully[config.language] );
    } catch (error) {
      console.error(Languages.read.Error_Started[config.language], error);
    }
  },
};