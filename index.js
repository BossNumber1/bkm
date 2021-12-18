const answerStore = require("./puzzleElements/answerStore");
const { gameOptions, againOptions } = require("./options");
const onMessageBot = require("./puzzleElements/botOnMessage/botOnMessage");
const onCallback_queryBot = require("./puzzleElements/botOnCallback_query/botOnCallback_query");

const TelegramApi = require("node-telegram-bot-api");
require("dotenv").config();
// const token = process.env.token;
const token = "5073567391:AAEuSakjPEUDnuvggDLOOQITvlNTGSJ3hnU";
const bot = new TelegramApi(token, { polling: true });
const chats = {};
let counter = 0;

const startGame = async (chatId) => {
    counter === 0 &&
        (await bot.sendMessage(
            chatId,
            "Сейчас загадаю цифру от 0 до 9, а тебе стоит её отгадать"
        ));
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    console.log("Верное число =", chats[chatId]);
    await bot.sendMessage(chatId, answerStore[counter].text, gameOptions);
};

const start = () => {
    /*bot.setMyCommands([
        { command: "/info", description: "Получить информацию" },
        { command: "/game", description: "Игра про угадывание цифры" },
        { command: "/top", description: "Топ 3 книги" },
    ]);*/

    async function receivingSticker(chatId, pathToSticker) {
        return bot.sendSticker(chatId, pathToSticker);
    }

    onMessageBot(bot, receivingSticker, startGame);
    onCallback_queryBot(
        bot,
        receivingSticker,
        startGame,
        counter,
        againOptions,
        answerStore,
        chats
    );
};

start();
