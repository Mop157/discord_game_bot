import dotenv from 'dotenv';

dotenv.config();

export const config = {
  token: process.env.DISCORD_TOKEN as string,
  clientId: process.env.CLIENT_ID as string,
  guildId: process.env.GUILD_ID as string,
  mongoUri: process.env.MONGO_URI as string,
  prefix: process.env.PREFIX as string,
  language: process.env.LANGUAGES as string,

  // setting games

  // slot machines (/slots)
  gameSlots: {

    game: true,

    gameName: 'slots',
    gameDescription: 'Play a slot machine game!',

    Slots: ["🍎", "🍊", "🍐", "🍋", "🍉", "🍇", "🍓", "🍒"],

    gameDatabase: {
      database: true,
      defeatAmount: -50,
      victoryAmount: [100, 50]
    }

  }
};