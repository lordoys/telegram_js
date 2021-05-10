const express = require('express')
const app = express()
// const port = 8080
const port = 3000

app.listen(port, () => {
    const { Telegraf } = require('telegraf')
    const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk')
    const request = require('request');
    const cheerio = require('cheerio');

    bot.start((ctx) => ctx.reply('ctx.message')) //ответ бота на команду /start
    bot.help((ctx) => ctx.reply('Send me a sticker')) //ответ бота на команду /help
    bot.on('sticker', (ctx) => ctx.reply('')) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
    bot.use((ctx) => {
        let result = 'OOOOO ';
        let result1 = ' !!!!! ';
        let result2 = ' @@@@@';

        request('https://www.toramp.com/schedule.php?id=' + ctx.message.text, function (error, response, body) {
            if(error){console.log(error);}
            else{
                var $ = cheerio.load(body);
                result = $('.title-basic span:first-child').text();
            }
            return ctx.reply(result)
        });

        // return ctx.reply(ctx.message.text)
    })
    bot.launch()
})
