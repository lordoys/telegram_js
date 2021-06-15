const express = require('express');
const port = 3000;
const app = express();
const { Telegraf } = require('telegraf');
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })

const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');

app.listen(port, () => {
    bot.start((ctx) => ctx.reply('Добро пожаловать!')); //ответ бота на команду /start
    bot.help((ctx) => ctx.reply('Тут нет.')); //ответ бота на команду /help
    bot.hears('xxx',  (ctx) => {
        nightmare
            .goto('https://learn.javascript.ru/async-await')
            .wait('.main__header-title')
            .evaluate(() => document.querySelector('.main__header-title').textContent)
            .end()
            .then(data => ctx.reply(data))
            .catch(error => {
                console.error('Search failed:', error)
            });
    })
    bot.launch();

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
});
