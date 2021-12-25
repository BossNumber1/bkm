module.exports = (
    bot,
    receivingSticker,
    startGame,
    counter,
    againOptions,
    answerStore,
    chats
) => {
    const mainKeyboard = [
        [
            {
                text: 'Информация',
                callback_data: 'info'
            }
        ],
        [
            {
                text: 'Топ книг',
                callback_data: 'top'
            }
        ],
        [
            {
                text: 'Игра',
                callback_data: 'game'
            }
        ],
        [
            {
                text: 'FaQ',
                callback_data: 'FaQ'
            }
        ],
    ]

    const faqKeyboard = [
        [
            {
                text: 'Вопрос1',
                callback_data: 'faq_1'
            }
        ],
        [
            {
                text: 'Вопрос2',
                callback_data: 'faq_2'
            }
        ],
        [
            {
                text: 'Вопрос3',
                callback_data: 'faq_3'
            }
        ],
        [
            {
                text: 'Назад',
                callback_data: 'start'
            }
        ],
    ]

    const answers = [
        {name: "faq_1", answer: "Ответ1"},
        {name: "faq_2", answer: "Ответ2"},
        {name: "faq_3", answer: "Ответ3"}
    ]

    let gameState = false;

    bot.on("callback_query", async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (msg.data === 'info') { 
            gameState = false;
            return bot.sendMessage(
                chatId,
                `Что тебя интересует ${
                    msg.from.first_name ? msg.from.first_name : ""
                } ${msg.from.last_name ? msg.from.last_name : ""}?`
            );
        }

        if (msg.data === 'top') { 
            gameState = false;
            return bot.sendMessage(
                chatId,
                `Топ 3 книги дня:\n1) Метро 2033\n2) Гарри Поттер\n2)Дюна`
            );
        }

        if (msg.data === 'FaQ') { 
            gameState = false;
            return bot.sendMessage(
                chatId,
                `Это меню FaQ - тут находятся часто задаваемые вопросы.`,
                {reply_markup: {
                    inline_keyboard: faqKeyboard
                  }}
            );
        }

        if (msg.data === 'start') { 
            gameState = false;
            return bot.sendMessage(
                chatId,
                `Главное меню:`, {reply_markup: {
                    inline_keyboard: mainKeyboard
                  }}
            );
        }

        if ((msg.data).includes("faq_")) { 
            for(let i=0, len=answers.length; i < len; i++){
                if( answers[i].name === msg.data){
                    return bot.sendMessage(
                        chatId,
                        answers[i].answer,
                    );
                }
            }
        }

        if (data === "/again") {
            if (counter == answerStore.length - 1) {
                counter = 1;
            } else {
                counter++;
            }

            return startGame(chatId);
        }

        if(gameState == true){
            if (data == chats[chatId]) {
                receivingSticker(
                    chatId,
                    "https://cdn.tlgrm.ru/stickers/c62/4a8/c624a88d-1fe3-403a-b41a-3cdb9bf05b8a/256/1.webp"
                ).then((res) => {
                    return bot.sendMessage(
                        chatId,
                        `Урааа!!! Ты отгадал цифру. Красавчик 👍`,
                        againOptions
                    );
                });
            } else {
                receivingSticker(
                    chatId,
                    "https://cdn.tlgrm.ru/stickers/c62/4a8/c624a88d-1fe3-403a-b41a-3cdb9bf05b8a/256/6.webp"
                ).then((res) => {
                    return bot.sendMessage(
                        chatId,
                        `Нет, не верно. Цифра ${data} не подходит. Стоит попробовать ещё раз 😊`
                    );
                });
            }
        }

        

        if (msg.data === 'game') { 
            gameState = true;
            startGame(chatId);
            console.log(
                "counter = ",
                counter,
                " / answerStore.length = ",
                answerStore.length
            );

            
        }
    });
};
