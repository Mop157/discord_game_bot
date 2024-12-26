

# Discord Game Bot

Discord Game Bot is a multilingual game bot for Discord currently in development. The bot is designed to host various games on Discord servers and supports four languages: Ukrainian (UA), Russian (RU), English (EN), and Czech (CZ).

## Features

- Multilingual support (UA, RU, EN, CZ)
- Various mini-games (in development)
- User balance system
- Slash commands for easy interaction

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Mop157/discord_game_bot.git
   ```

2. Navigate to the project directory:
   ```
   cd discord_game_bot
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory of the project and add the following environment variables:
   ```
   DISCORD_TOKEN=your_discord_bot_token
   CLIENT_ID=client ID
   GUILD_ID=your guild ID
   MONGODB_URI=your_mongodb_connection_string
   PREFIX=bot prefix
   LANGUAGES=language // "UA" or "RU" or "EN" or "CZ"
   ```

5. Build the project:
   ```
   npm run build
   ```

## Usage

1. Start the bot:
   ```
   npm start
   ```

2. Invite the bot to your Discord server using a link with the necessary permissions.

3. Use slash commands to interact with the bot. For example:
   ```
   /slot - to play the slot machine
   ```

## Development

To run the bot in development mode, use:
```
npm run dev
```

To deploy new slash commands, use:
```
npm run deploy
```

## Current Status

The project is actively being developed. Some features may be unavailable or require manual configuration. Stay tuned for updates!

## Contributing

We welcome contributions to the project! If you have ideas or suggestions, please create an issue or submit a pull request.
