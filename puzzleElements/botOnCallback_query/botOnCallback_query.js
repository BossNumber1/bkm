module.exports = (
    bot,
    receivingSticker,
    startGame,
    counter,
    againOptions,
    answerStore,
    chats
) => {
    bot.on("callback_query", async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (msg.data === 'info') { 
            return bot.sendMessage(
                chatId,
                `Что тебя интересует ${
                    msg.from.first_name ? msg.from.first_name : ""
                } ${msg.from.last_name ? msg.from.last_name : ""}?`
            );
        }

        if (msg.data === 'top') { 
            return bot.sendMessage(
                chatId,
                `Топ 3 книги дня:\n1) Метро 2033\n2) Гарри Поттер\n2)Дюна`
            );
        }

        if (msg.data === 'game') { 
            console.log(
                "counter = ",
                counter,
                " / answerStore.length = ",
                answerStore.length
            );

            if (data === "/again") {
                if (counter == answerStore.length - 1) {
                    counter = 1;
                } else {
                    counter++;
                }

                return startGame(chatId);
            }

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
    });
};
