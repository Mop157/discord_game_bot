interface SettingType {
    game: boolean;
    gameName: string;
    gameDescription: string;
    randomNumber: {
        min: number;
        max: number;
    }
    radius: {
        radius1: number
        radius2: number
        radius3: number
        radius4: number
    }
    prizelist: {
        prize1: number
        prize2: number
        prize3: number
        prize4: number
        prize5: number
        prize6: number
    }
    time: number;

};

interface LanguagesType {
    [key: string]: {
        [key: string]: string;
    };
};

export const setting: SettingType = {

    // Guess the number (/guess_the_number)
    
    game: true,

    gameName: 'guess_the_number',
    gameDescription: 'try to guess the number!',

    randomNumber: {
        min: 0, // minimal random number
        max: 100 // maximum random number
    },
    radius: {
        radius1: 3,
        radius2: 15,
        radius3: 40,
        radius4: 70
    },
    prizelist: {
        prize1: 250,
        prize2: 100,
        prize3: 40,
        prize4: 0,
        prize5: -25,
        prize6: -50
    },
    time: 180000, // 3 minutes (180000 milliseconds)

};

export const LanguagesGame: LanguagesType = {
    errorChannel: {
        UA: "Ця команда може бути використана лише у текстовому каналі.",
        RU: "Эта команда может быть использована только в текстовом канале.",
        EN: "This command can only be used in a text channel.",
        CZ: "Tento příkaz lze použít pouze v textovém kanálu."
    },
    errorTime: {
        UA: "Час вийшов! Ви не встигли вгадати число.",
        RU: "Время вышло! Вы не успели угадать число.",
        EN: "Time's up! You didn't manage to guess the number.",
        CZ: "Čas vypršel! Neměl jsi čas uhodnout číslo."
    },
    errorNumber: {
        UA: "Будь ласка, введіть число.",
        RU: "Пожалуйста, введите число.",
        EN: "Please enter a number.",
        CZ: "Zadejte číslo."
    },
    errorMaxNumber: {
        UA: "ваше число більше за належний радіус",
        RU: "ваше число больше положенного радиуса",
        EN: "your number is greater than the required radius",
        CZ: "vaše číslo je větší než požadovaný poloměr"
    },
    errorMinNumber: {
        UA: "ваше число менше належного радіусу",
        RU: "ваше число меньше положенного радиуса",
        EN: "your number is less than the required radius",
        CZ: "vaše číslo je menší než požadovaný poloměr"
    },
    rules: {
        UA: "Все, а зараз будь ласка запам'ятайте ці кольори:",
        RU: "Всё, а сейчас пожалуйста запомните вот эти цвета:",
        EN: "That's it, now please remember these colors:",
        CZ: "To je vše, nyní si prosím zapamatujte tyto barvy:"
    },
    name: {
        UA: "вгадай число",
        RU: "угадай число",
        EN: "guess the number",
        CZ: "hádejte číslo"
    },
    upbalance: {
        UA: "вас баланс оновлено:",
        RU: "вас баланс обновлен:",
        EN: "your balance has been updated:",
        CZ: "váš zůstatek byl aktualizován:"
    },
    radius1: {
        UA: "Бінго! Ви майстер вгадування!",
        RU: "Бинго! Ты мастер угадывания!",
        EN: "Bingo! You're a guessing master!",
        CZ: "Bingo! Jste mistr hádání!"
    },
    radius3: {
        UA: "Так близько! Ви майже вгадали!",
        RU: "Бинго! Ты мастер угадывания!",
        EN: "So close! You're nearly there!",
        CZ: "Tak blízko! Skoro jste to měl!"
    },
    radius15: {
        UA: "Гарна спроба, але поки що мимо. Ще одна спроба?",
        RU: "Бинго! Ты мастер угадывания!",
        EN: "Good try, but still a miss. Another go?",
        CZ: "Dobrá snaha, ale stále vedle. Další pokus?"
    },
    radius40: {
        UA: "Ви на правильному шляху, але потрібно ще трохи попрактикуватися.",
        RU: "Ты на правильном пути, но ещё нужно немного попрактиковаться.",
        EN: "Not bad, but give it another shot. I think you can do it!",
        CZ: "Není to špatné, ale zkuste to znovu. Myslím, že to zvládnete!"
    },
    radius70: {
        UA: "Ну, вже краще. Ще кілька спроб і вийде!",
        RU: "Ну-у, уже получше. Ещё пара попыток, и ты там!",
        EN: "Well, closer now. A few more tries and you'll get it!",
        CZ: "No, už je to lepší. Ještě pár pokusů a máte to!"
    },
    radius100: {
        UA: "Упс! Майже в іншій галактиці. Давайте ще раз!",
        RU: "Упс! Почти в другой галактике. Давай ещё раз!",
        EN: "Oops! Almost in another galaxy. Give it another go!",
        CZ: "Ups! Skoro v jiné galaxii. Zkuste to ještě jednou!"
    }
}