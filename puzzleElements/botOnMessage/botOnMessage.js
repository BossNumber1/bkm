module.exports = (bot, receivingSticker, startGame) => {
    bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === "/start") {
            await receivingSticker(
                chatId,
                "https://cdn.tlgrm.ru/stickers/c62/4a8/c624a88d-1fe3-403a-b41a-3cdb9bf05b8a/256/4.webp"
            );

            return bot.sendMessage(
                chatId,
                `Тебя приветствует виртуальный помощник революционного проекта BookMen. Будет хорошо :)`
            );
        }

        if (text === "/info") {
            return bot.sendMessage(
                chatId,
                `Что тебя интересует ${
                    msg.from.first_name ? msg.from.first_name : ""
                } ${msg.from.last_name ? msg.from.last_name : ""}?`
            );
        }

        if (text === "/game") {
            return startGame(chatId, 0);
        }

        return bot.sendMessage(
            chatId,
            "Я тебя не понимаю. Со мной можно общаться лишь командами :)"
        );
    });
};
