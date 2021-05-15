const express = require('express')
const Nightmare = require('nightmare')
const app = express()
const port = 8080
// const port = 3000
const nightmare = Nightmare({ show: false })

app.listen(port, () => {
    const { Telegraf } = require('telegraf')
    const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk')

    bot.start((ctx) => ctx.reply('Добро пожаловать!')) //ответ бота на команду /start
    bot.help((ctx) => ctx.reply('Тут ничего нет, пока.')) //ответ бота на команду /help
    bot.command('book', (ctx) => {
        if(ctx.from.id === 237016450) {
            let str = 'Привет, ' + ctx.message.from.first_name + '! Сейчас посмотрим какие есть свободные даты.';
            ctx.reply(str);
            console.log('Тут пошел ответ');
        }

        nightmare
            .goto('https://www.appointfix.com/sunnyCourt')
            .wait(2000)
            .wait('.business-info-screen-container-left-booking-button')
            .click('.business-info-screen-container-left-booking-button')
            .wait(2000)
            .wait('.appointment-booking-services-select-details')
            .click('.appointment-booking-services-list .appointment-booking-services-select.ng-star-inserted')
            .wait(2000)
            .click('.appointment-booking-services-select-submit-button')
            .wait(2000)
            .wait('.cal-days')
            .evaluate(() => {
                console.log('Тут начаналсь обратотка');
                let result = [];
                let allDays = document.querySelectorAll('.cal-day-cell');
                allDays.forEach((item) => {
                    if (item.classList.contains('cal-day-disabled')) {

                    } else {
                        result.push(item.querySelector('.cal-day-number').textContent);
                    }
                });
                console.log('Возращаем результат');
                return result;
            })
            .then(result => {
                console.log('Отвечаем');
                let str = 'Вот даты => ' + result + ' Выбери из списка и напиши какая тебе подходит.';
                ctx.reply(str);
            })
            .end()
            .then(console.log)
            .catch(error => {
                console.error('Search failed:', error)
            });
    })
    bot.launch()
})
