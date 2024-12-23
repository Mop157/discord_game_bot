interface SettingType {
    game: boolean;
    gameName: string;
    gameDescription: string;
    Slots: string[];
    gameDatabase: {
        database: boolean;
        defeatAmount: number;
        victoryAmount: [number, number];
    };
};

interface LanguagesType {
    [key: string]: {
        [key: string]: string;
    };
};

export const setting: SettingType = {

    // slot machines (/slots)
    
    game: true,

    gameName: 'slots',
    gameDescription: 'Play a slot machine game!',

    Slots: ["🍎", "🍊", "🍐", "🍋", "🍉", "🍇", "🍓", "🍒"],

    gameDatabase: {

        database: true,

        defeatAmount: -50,
        victoryAmount: [100, 50]

    }
};

export const LanguagesGame: LanguagesType = {
    "victory_1": {
        "UA": "перемога, вітаю!",
        "RU": "Уфф, победа, поздравляю!",
        "EN": "victory, congratulations!",
        "CZ": "vítězství, gratuluji!"
    },
    "victory_2": {
        "UA": "Майже готово, спробуйте ще раз!",
        "RU": "Почти получилось, попробуй еще раз!",
        "EN": "Almost there, try again!",
        "CZ": "Už je to skoro, zkuste to znovu!"
    },
    "defeat": {
        "UA": "Не пощастило, пощастить наступного разу.",
        "RU": "Неудача, в следующий раз повезет.",
        "EN": "Bad luck, better luck next time.",
        "CZ": "Smůla, příště více štěstí."
    }
}