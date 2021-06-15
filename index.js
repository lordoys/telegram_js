const express = require('express');
const port = 8080;
const { Telegraf } = require('telegraf');
const app = express();
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');

app.listen(port, () => {
    bot.start((ctx) => ctx.reply('Добро пожаловать!'));
    bot.hears('xxx', async (ctx) => {
        const response = await nightmare
            .goto('https://learn.javascript.ru/async-await')
            .wait('.main__header-title')
            .evaluate(() => document.querySelector('.main__header-title').textContent)
            .end()
            .then()
            .catch(error => {
                console.error('Search failed:', error)
            });

        ctx.reply(response);
    })
    bot.help((ctx) => ctx.reply('Тут sdfsdfsdfsdfsfdsfd нет.'));

    bot.launch();
});
