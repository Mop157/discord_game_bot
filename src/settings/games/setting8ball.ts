interface SettingType {
    game: boolean;
    gameName: string;
    gameDescription: string;
    option: {
        name: string;
        description: string;
        minLength: number;
        maxLength: number;
    };
    me_texts: {
        me: boolean;
        texts: string[];
    };
};

interface LanguagesType {
    [key: string]: {
        [key: string]: string | string[];
    };
};

export const setting: SettingType = {
    // magic 8 (/8ball)

    game: true,

    gameName: '8ball',
    gameDescription: 'ask a question to the magic 8!',

    option: {
        name: 'texts',
        description: 'ask a question',
        minLength: 3,
        maxLength: 100
    },

    me_texts: {

        me: false, // my texts in the game

        texts: []
    }
};

export const LanguagesGame: LanguagesType = {
    texts: {
        UA: [
            "Це точно.",
            "Це однозначно так.",
            "Без сумніву.",
            "Так, безумовно.",
            "Ви можете на це покластися.",
            "Наскільки я бачу, так.",
            "Найімовірніше.",
            "Перспективи хороші.",
            "Так.",
            "Знаки вказують на так.",
            "Відповідь неясна, спробуйте ще раз.",
            "Запитай пізніше.",
            "Краще не говорити вам зараз.",
            "Не можу передбачити зараз.",
            "Зосередьтесь і запитайте ще раз.",
            "Не розраховуйте на це.",
            "Перспективи не дуже хороші.",
            "Мої джерела кажуть, що ні.",
            "Дуже сумнівно.",
            "Ні.",
            "Точно ні.",
        ],
        RU: [
            "Это точно.",
            "Это решительно так.",
            "Без сомнения.",
            "Да, безусловно.",
            "Вы можете положиться на него.",
            "Насколько я вижу, да.",
            "Вероятно.",
            "Перспективы хорошие.",
            "да.",
            "Знаки указывают на да.",
            "Ответ неясен, попробуйте еще раз.",
            "Спроси позже.",
            "Лучше не говорить тебе сейчас.",
            "Не могу предсказать сейчас.",
            "Сосредоточьтесь и спросите еще раз.",
            "Не рассчитывайте на это.",
            "Перспективы не очень хорошие.",
            "Мои источники говорят, что нет.",
            "Очень сомнительно.",
            "нет.",
            "точно нет.",
        ],
        EN: [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes, definitely.",
            "You can rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "Outlook not so good.",
            "My sources say no.",
            "Very doubtful.",
            "No.",
            "Definitely not.",
        ],
        CZ: [
            "Je to jisté.",
            "Je to rozhodně tak.",
            "Bezpochyby.",
            "Ano, rozhodně.",
            "Můžete na to spoléhat.",
            "Jak to vidím, ano.",
            "Pravděpodobně.",
            "Vyhlídky jsou dobré.",
            "Ano.",
            "Znamení ukazují na ano.",
            "Odpověď je nejasná, zkuste to znovu.",
            "Zeptejte se později.",
            "Raději vám to teď neřeknu.",
            "Nelze nyní předpovědět.",
            "Soustřeďte se a zeptejte se znovu.",
            "Nepočínejte s tím.",
            "Vyhlídky nejsou moc dobré.",
            "Moje zdroje říkají ne.",
            "Velmi pochybné.",
            "Ne.",
            "Rozhodně ne.",
        ]
    },
    not_texts: {
        UA: "текст не надано",
        RU: "текст не предоставлен",
        EN: "text not provided",
        CZ: "text není poskytnut"
    }
} 