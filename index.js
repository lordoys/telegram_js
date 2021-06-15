const express = require('express');
const port = 8080;
const { Telegraf } = require('telegraf');
const app = express();
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');

app.listen(port, () => {
    bot.start((ctx) => ctx.reply('Добро пожаловать!'));
    bot.help((ctx) => ctx.reply('Тут sdfsdfsdfsdfsfdsfd нет.'));
    bot.hears('xxx',  (ctx) => {
        nightmare
            .goto('https://learn.javascript.ru/async-await')
            .wait('.main__header-title')
            .evaluate(() => document.querySelector('.main__header-title').textContent)
            .end()
            .then(data => {
                console.error(data);
                ctx.reply(data);
            })
            .catch(error => {
                console.error('Search failed:', error);
                ctx.reply(error);
            });
    })
    bot.launch().then(r => console.log(r));

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
});
