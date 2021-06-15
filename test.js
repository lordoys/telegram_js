const express = require('express');
const port = 3000;
const app = express();
const { Telegraf } = require('telegraf');
const fetch = require("node-fetch");
const cheerio = require('cheerio');

const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');

app.listen(port, () => {
    bot.start((ctx) => ctx.reply('Добро пожаловать!')); //ответ бота на команду /start
    bot.help((ctx) => ctx.reply('Тут test test test нет.')); //ответ бота на команду /help
    bot.hears('xxx',  async (ctx) => {
        const response = await fetch('https://alohabrowser.com/');
        const body = await response.text();
        const $ = cheerio.load(body);
        const result = $('.header-welcome-title').text();

        console.log(result);

        ctx.reply(result);
    })
    bot.launch().then(r => console.log(r));
});
