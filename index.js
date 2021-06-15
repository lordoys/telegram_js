const { Telegraf } = require('telegraf');
// const bot = new Telegraf('1794222017:AAGieh5HVbGgzhXmAG8FUVClC-3_5YliUJU');
const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');
// const Nightmare = require('nightmare')
// const nightmare = Nightmare({ show: false })

bot.start((ctx) => ctx.reply('Добро пожаловать!')); //ответ бота на команду /start
bot.help((ctx) => ctx.reply('Тут нет.')); //ответ бота на команду /help
// bot.hears('xxx', (ctx) => {
//     nightmare
//         .goto('https://learn.javascript.ru/async-await')
//         .wait('.main__header-title')
//         .evaluate(() => document.querySelector('.main__header-title').textContent)
//         .end()
//         .then(data => ctx.reply(data))
//         .catch(error => {
//             console.error('Search failed:', error)
//             ctx.reply(error)
//         });
//     ctx.reply('asdfg');
// })

bot.launch();
