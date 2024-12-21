import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

import { config } from './config';
import { connectDatabase } from './utils/database';
import Languages from "./utils/Languages";

export interface ExtendedClient extends Client {
  slashCommands: Collection<string, any>;
  prefixCommands: Collection<string, any>;
  buttons: Collection<string, any>;
}

const client: ExtendedClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}) as ExtendedClient;

client.slashCommands = new Collection();
client.prefixCommands = new Collection();
client.buttons = new Collection();

// Load slash commands
( async () => {
  const slashCommandFiles = fs.readdirSync(path.join(__dirname, 'commands', 'slash')).filter(file => file.endsWith('.ts'));
  for (const file of slashCommandFiles) {
    const { default: command } = await import(`./commands/slash/${file}`);
    client.slashCommands.set(command.data.name, command);
  }

  // Load prefix commands
  const prefixCommandFiles = fs.readdirSync(path.join(__dirname, 'commands', 'prefix')).filter(file => file.endsWith('.ts'));
  for (const file of prefixCommandFiles) {
    const { default: command } = await import(`./commands/prefix/${file}`);
    client.prefixCommands.set(command.name, command);
  }

  // Load buttons
  const buttonFiles = fs.readdirSync(path.join(__dirname, 'buttons')).filter(file => file.endsWith('.ts'));
  for (const file of buttonFiles) {
    const { default: button } = await import(`./buttons/${file}`);
    client.buttons.set(button.customId, button);
  }

  // Load events
  const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.ts'));
  for (const file of eventFiles) {
    const { default: event } = await import(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}
)();

// Handle interactions (slash commands and buttons)
client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: Languages.error.commands[config.language], ephemeral: true });
    }
  } else if (interaction.isButton()) {
    const button = client.buttons.get(interaction.customId);
    if (!button) return;

    try {
      await button.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: Languages.error.buttons[config.language], ephemeral: true });
    }
  }
});

// Handle prefix commands
const prefix = config.prefix;
client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  const command = client.prefixCommands.get(commandName);
  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(Languages.error.invalid_command[config.language]);
  }
});

connectDatabase().then(() => {
  client.login(config.token);
});