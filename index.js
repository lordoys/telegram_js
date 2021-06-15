const { Telegraf } = require('telegraf');
const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');

bot.start((ctx) => ctx.reply('Добро пожаловать!'));
bot.help((ctx) => ctx.reply('Тут ничего нет, совсем.'));
bot.launch().then(r => console.log(r));
