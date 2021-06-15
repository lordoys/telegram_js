const express = require('express');
const port = 3000;
const app = express();
const { Telegraf } = require('telegraf');
const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');

app.listen(port, () => {
    bot.start((ctx) => ctx.reply('Добро пожаловать!')); //ответ бота на команду /start
    bot.help((ctx) => ctx.reply('Тут d a нет.')); //ответ бота на команду /help

    bot.launch();
});
