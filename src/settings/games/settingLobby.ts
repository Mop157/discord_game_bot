import { ButtonStyle, ColorResolvable, Message } from 'discord.js';

type buttonstyle = ButtonStyle.Primary | ButtonStyle.Secondary | ButtonStyle.Success | ButtonStyle.Danger | ButtonStyle.Link | ButtonStyle.Premium

interface SettingType {
    maxPlayers: number;
    time: number;
    colorLobby: ColorResolvable | null;
    gameinfo: string
    textStart: {
        TrueorFalse: boolean;
        text: string;
    }
    buttonjoin: {
        label: string;
        style: buttonstyle
    }
    buttoninfo: {
        label: string;
        style: buttonstyle
    }
    buttonleave: {
        label: string;
        style: buttonstyle
    }
    buttonstart: {
        label: string;
        style: buttonstyle
    }
};

interface LanguagesType {
    [key: string]: {
        [key: string]: string;
    };
};

export const setting: SettingType = {

    // settings Lobby of all games

    maxPlayers: 2, // standard players
    time: 300000, // 5 minutes
    colorLobby: '#0099ff', // color lobby
    gameinfo: "", // standard info for games

    textStart: {
        TrueorFalse: true, // standard start message for true/false games
        text: "Starting the game...", // standard start message for games
    },

    buttonjoin: {
        label: '✅',
        style: ButtonStyle.Primary
    },

    buttoninfo: { 
        label: '❓',
        style: ButtonStyle.Secondary
    },

    buttonleave: {
        label: '✖️',
        style: ButtonStyle.Danger
    },

    buttonstart: {
        label: '▶️',
        style: ButtonStyle.Success
    }
};

export const LanguagesGame: LanguagesType = {
    errorChannel: {
        UA: "Ця команда може бути використана лише у текстовому каналі.",
        RU: "Эта команда может быть использована только в текстовом канале.",
        EN: "This command can only be used in a text channel.",
        CZ: "Tento příkaz lze použít pouze v textovém kanálu."
    },
    errorTime: {
        UA: "Таймер закінчився чи гра не почалася",
        RU: "Таймер закончился или игра не началась",
        EN: "The timer has run out or the game has not started",
        CZ: "Časovač vypršel nebo hra nezačala"
    },
    errorButton: {
        UA: "Неочікувана помилка в buttonClick:",
        RU: "Неожиданная ошибка в buttonClick:",
        EN: "Unexpected error in buttonClick:",
        CZ: "Neočekávaná chyba v buttonClick:"
    },
    errorButtonSend: {
        UA: "Сталася помилка під час обробки гри",
        RU: "Произошла ошибка при обработке игры",
        EN: "An error occurred while processing the game",
        CZ: "Při zpracování hry došlo k chybě"
    },
    lobbyname: {
        UA: "Лоббі",
        RU: "Лобби",
        EN: "Lobby",
        CZ: "Lobby"
    },
    lobbyplaer: {
        UA: "играючі:",
        RU: "игроки:",
        EN: "players:",
        CZ: "hráči:"
    },
    lobbycreator: {
        UA: "Створив:",
        RU: "Создал:",
        EN: "created by:",
        CZ: "vytvořil:"
    },
    lobbytext: {
        UA: "Чекаємо на гравців...",
        RU: "Ждем игроков...",
        EN: "Waiting for players...",
        CZ: "Čekání na hráče..."
    },
    textButtonjoin: {
        UA: "Ви вже в грі!",
        RU: "Вы уже в игре!",
        EN: "You are already in the game!",
        CZ: "Už jste ve hře!"
    },
    textButtonLeaveCreator: {
        UA: "Ви не можете залишити гру як творець!",
        RU: "Вы не можете покинуть игру как создатель!",
        EN: "You cannot leave the game as the creator!",
        CZ: "Nemůžete opustit hru jako tvůrce!"
    },
    textButtonLeave: {
        UA: "Ви не в цій грі!",
        RU: "Тебя нет в этой игре!",
        EN: "You are not in this game!",
        CZ: "Nejste v této hře!"
    },
    textButtonStart: {
        UA: "Тільки творець може почати гру!",
        RU: "Начать игру может только создатель!",
        EN: "Only the creator can start the game!",
        CZ: "Hru může spustit pouze tvůrce!"
    },
    gameInfo : {
        UA: "Інформація не вказана для гри",
        RU: "Информация не указана для игры",
        EN: "Information not provided for the game",
        CZ: "Informace nebyly poskytnuty pro hru"
    }
}

export interface LobbyType {
    [key: number]: {
        users: String[];
        creator: String;
        maxPlayers: number;
      }
}