const express = require('express');
const port = 8080;
const { Telegraf } = require('telegraf');
const app = express();
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');

app.listen(port, () => {
    bot.start((ctx) => ctx.reply('Добро пожаловать!')); //ответ бота на команду /start
    bot.help((ctx) => ctx.reply('Тут нет.')); //ответ бота на команду /help
    bot.hears('xxx',  (ctx) => {
        console.log('Начало парсинга');
        nightmare
            .goto('https://learn.javascript.ru/async-await')
            .wait('.main__header-title')
            .evaluate(() => document.querySelector('.main__header-title').textContent)
            .end()
            .then(data => {
                console.log(data);
                ctx.reply(data);
            })
            .catch(error => {
                console.error('Search failed:', error);
                ctx.reply(error);
            });
        console.log('Конец парсинга');
    })
    bot.launch().then(r => console.log(r));

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
});
