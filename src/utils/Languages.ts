const Languages: LanguagesType = {
    "games": {
        "slots": {
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
    },

    "Database": {
        "connection": {
            "UA": "Підключення до бази даних завершено успішно!",
            "RU": "Подключение к базе данных завершено успешно!",
            "EN": "Database connection successful!",
            "CZ": "Připojení k databázi proběhlo úspěšně!"
        },
        "error_connection": {
            "UA": "Помилка підключення до бази даних! :",
            "RU": "Ошибка подключения к базе данных! :",
            "EN": "Database connection error! :",
            "CZ": "Chyba připojení k databázi! :"
        },
        "error_save_user": {
            "UA": "Помилка збереження користувача!",
            "RU": "Ошибка сохранения пользователя!",
            "EN": "Error saving user!",
            "CZ": "Chyba uložení uživatele!"
        }
    },

    "error": {
        "commands": {
            "UA": "Під час виконання цієї команди сталася помилка!",
            "RU": "При выполнении этой команды произошла ошибка!",
            "EN": "There was an error while executing this command!",
            "CZ": "Při provádění tohoto příkazu došlo k chybě!"
        },
        "buttons": {
            "UA": "Під час обробки цієї кнопки сталася помилка!",
            "RU": "При обработке этой кнопки произошла ошибка!",
            "EN": "There was an error while processing this button!",
            "CZ": "Při zpracování tohoto tlačítka došlo k chybě!"
        },
        "invalid_command": {
            "UA": "Під час спроби виконати цю команду сталася помилка!",
            "RU": "При попытке выполнить эту команду произошла ошибка!",
            "EN": "There was an error trying to execute that command!",
            "CZ": "Při pokusu o provedení tohoto příkazu došlo k chybě!"
        }
    },

    "read": {
        "Logged": {
            "UA": "Увійшли як",
            "RU": "Вы вошли как",
            "EN": "Logged in as",
            "CZ": "Přihlášen jako"
        },
        "Started": {
            "UA": "Розпочато оновлення команд програми (/).",
            "RU": "Начато обновление команд приложения (/).",
            "EN": "Started refreshing application (/) commands.",
            "CZ": "Byla zahájena aktualizace příkazů aplikace (/)."
        },
        "Successfully": {
            "UA": "Команди програми (/) успішно перезавантажено.",
            "RU": "Команды приложения (/) успешно перезагружены.",
            "EN": "Successfully reloaded application (/) commands.",
            "CZ": "Příkazy aplikace (/) byly úspěšně znovu načteny."
        },
        "Error_Started": {
            "UA": "Помилка оновлення команд програми (/):",
            "RU": "Ошибка обновления команд приложения (/):",
            "EN": "Error refreshing application (/) commands:",
            "CZ": "Chyba při obnovování příkazů aplikace (/):"
        }

    }
}

interface LanguagesType {
    "games": {
        [key: string]: {
            [key: string]: {
                [key: string]: string;
            };
        };
    },
    "Database": {
        [key: string]: {
            [key: string]: string;
        };
    },
    "error": {
        [key: string]: {
            [key: string]: string;
        };
    },
    "read": {
        [key: string]: {
            [key: string]: string;
        };
    }
}

export default Languages
