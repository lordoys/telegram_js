// const { Telegraf } = require('telegraf')
// const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk') //сюда помещается токен, который дал botFather
// bot.start((ctx) => ctx.reply('Welcome!!!')) //ответ бота на команду /start
// bot.help((ctx) => ctx.reply('Send me a sticker')) //ответ бота на команду /help
// bot.on('sticker', (ctx) => ctx.reply('')) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
// bot.hears('hi', (ctx) => ctx.reply('Hey there')) // bot.hears это обработчик конкретного текста, данном случае это - "hi"
// bot.launch() // запуск бота
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
