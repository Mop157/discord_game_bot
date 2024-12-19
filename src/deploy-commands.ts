import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { config } from './config';
import fs from 'fs';
import path from 'path';

const commands = [];
const slashCommandFiles = fs.readdirSync(path.join(__dirname, 'commands', 'slash')).filter(file => file.endsWith('.ts'));

for (const file of slashCommandFiles) {
  const command = require(`./commands/slash/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error refreshing application (/) commands:', error);
  }
})();