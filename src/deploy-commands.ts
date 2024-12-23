import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
import path from 'path';

import { config } from './config';
import Languages from "./utils/Languages";

const commands = [];
const slashCommandFiles = fs.readdirSync(path.join(__dirname, 'commands', 'slash')).filter(file => file.endsWith('.ts'));

for (const file of slashCommandFiles) {
  const command = require(`./commands/slash/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
  try {
    console.log(Languages.read.Started[config.language || "EN"]);

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands },
    );

    console.log(Languages.read.Successfully[config.language || "EN"]);
  } catch (error) {
    console.error(Languages.read.Error_Started[config.language || "EN"], error);
  }
})();