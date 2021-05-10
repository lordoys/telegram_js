const express = require('express')
const app = express()
// const port = 8080
const port = 3000

app.listen(port, () => {
    const { Telegraf } = require('telegraf')
    const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk')

    bot.start((ctx) => ctx.reply('ctx.message')) //ответ бота на команду /start
    bot.help((ctx) => ctx.reply('Send me a sticker')) //ответ бота на команду /help
    bot.on('sticker', (ctx) => ctx.reply('')) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
    bot.hears('hi', (ctx) => {
        let result = 'П';
        let result1 = 'уст';
        let result2 = 'о';

        // fetch('https://www.appointfix.com/sunnyCourt/book/date')
        //     .then(function (response) {
        //         result =  response.status;
        //     })
        //     .then(function (template) {
        //         result1 = template;
        //     })
        //     .catch(function (response) {
        //         result2 = response.statusText;
        //     });

        return ctx.reply(result + ' ' + result1 + ' ' + result2)
    }) // bot.hears это обработчик конкретного текста, данном случае это - "hi"
    bot.launch()
})
