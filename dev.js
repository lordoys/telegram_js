const express = require('express');
const port = 3000;
const app = express();
const {Telegraf} = require('telegraf');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');
let users;
const sliceParametrs = function (substring, parametr, url) {
    const start = url.indexOf(substring);
    const end = url.indexOf('&', start + substring.length);
    const first = url.slice(0, start)
    const second = (end > -1) ? url.slice(end) : '';
    return (first + parametr + second);
};

app.listen(port, () => {
    fs.readFile('data.txt', 'utf8' , (err, data) => {
        if (err) {
            console.error(err);
            return false;
        }

        users = JSON.parse(data);

        const startConversation = function (ctx) {
            const userId = ctx.update.callback_query.from.id;

            if (!users[userId]) {
                users[userId] = {};
            }

            if (!users[userId].carList) {
                users[userId].carList = {};
            }

            if (!users[userId].url) {
                users[userId].url = 'https://www.bazaraki.com/car-motorbikes-boats-and-parts/cars-trucks-and-vans'
            }

            users[userId].active = false;

            fs.writeFile("data.txt", JSON.stringify(users), function(err) {
                if (err) {
                    console.log(err);
                    return false;
                }

                ctx.telegram.sendMessage(userId, '\n\nДавай выберем минимальную цена авто', {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: 'Без минимальной', callback_data: '&price_min=0'},
                                {text: '500', callback_data: '&price_min=500'},
                            ],
                            [
                                {text: '1 000', callback_data: '&price_min=1000'},
                                {text: '1 500', callback_data: '&price_min=1500'},
                                {text: '2 000', callback_data: '&price_min=2000'},
                            ],
                            [
                                {text: '3 000', callback_data: '&price_min=3000'},
                                {text: '4 000', callback_data: '&price_min=4000'},
                                {text: '5 000', callback_data: '&price_min=5000'},
                            ],
                            [
                                {text: '6 000', callback_data: '&price_min=6000'},
                                {text: '7 000', callback_data: '&price_min=7000'},
                                {text: '8 000', callback_data: '&price_min=8000'},
                            ],
                            [
                                {text: '9 000', callback_data: '&price_min=9000'},
                                {text: '10 000', callback_data: '&price_min=10000'},
                                {text: '12 500', callback_data: '&price_min=12500'},
                            ],
                            [
                                {text: '15 000', callback_data: '&price_min=15000'},
                                {text: '17 500', callback_data: '&price_min=17500'},
                                {text: '20 000', callback_data: '&price_min=20000'},
                            ],
                            [
                                {text: '22 500', callback_data: '&price_min=22500'},
                                {text: '25 000', callback_data: '&price_min=25000'},
                                {text: '30 000', callback_data: '&price_min=30000'},
                            ],
                            [
                                {text: '35 000', callback_data: '&price_min=35000'},
                                {text: '40 000', callback_data: '&price_min=40000'},
                                {text: '45 000', callback_data: '&price_min=45000'},
                            ],
                            [
                                {text: '50 000', callback_data: '&price_min=50000'},
                                {text: '60 000', callback_data: '&price_min=60000'},
                                {text: '70 000', callback_data: '&price_min=70000'},
                            ]
                        ]
                    }
                });
            });
        }

        const setMinPrice = function (ctx) {
            const userId = ctx.update.callback_query.from.id;
            const minPrice = ctx.update.callback_query.data;

            if (isMinPrice(users[userId].url)) {
                users[userId].url = sliceParametrs('&price_min', minPrice, users[userId].url);
            } else {
                users[userId].url += minPrice;
            }

            fs.writeFile("data.txt", JSON.stringify(users), function(err) {
                if (err) {
                    console.log(err);
                    return false;
                }

                ctx.telegram.sendMessage(userId, `\n\nТеперь давай выберем максимальная цена авто`, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: 'Без максимальной', callback_data: '&price_max=1000000000'},
                                {text: '500', callback_data: '&price_max=500'},
                            ],
                            [
                                {text: '1 000', callback_data: '&price_max=1000'},
                                {text: '1 500', callback_data: '&price_max=1500'},
                                {text: '2 000', callback_data: '&price_max=2000'},
                            ],
                            [
                                {text: '3 000', callback_data: '&price_max=3000'},
                                {text: '4 000', callback_data: '&price_max=4000'},
                                {text: '5 000', callback_data: '&price_max=5000'},
                            ],
                            [
                                {text: '6 000', callback_data: '&price_max=6000'},
                                {text: '7 000', callback_data: '&price_max=7000'},
                                {text: '8 000', callback_data: '&price_max=8000'},
                            ],
                            [
                                {text: '9 000', callback_data: '&price_max=9000'},
                                {text: '10 000', callback_data: '&price_max=10000'},
                                {text: '12 500', callback_data: '&price_max=12500'},
                            ],
                            [
                                {text: '15 000', callback_data: '&price_max=15000'},
                                {text: '17 500', callback_data: '&price_max=17500'},
                                {text: '20 000', callback_data: '&price_max=20000'},
                            ],
                            [
                                {text: '22 500', callback_data: '&price_max=22500'},
                                {text: '25 000', callback_data: '&price_max=25000'},
                                {text: '30 000', callback_data: '&price_max=30000'},
                            ],
                            [
                                {text: '35 000', callback_data: '&price_max=35000'},
                                {text: '40 000', callback_data: '&price_max=40000'},
                                {text: '45 000', callback_data: '&price_max=45000'},
                            ],
                            [
                                {text: '50 000', callback_data: '&price_max=50000'},
                                {text: '60 000', callback_data: '&price_max=60000'},
                                {text: '70 000', callback_data: '&price_max=70000'},
                            ]
                        ]
                    }
                });
            });
        }

        const setMaxPrice = function (ctx) {
            const userId = ctx.update.callback_query.from.id;
            const maxPrice = ctx.update.callback_query.data;

            if (isMaxPrice(users[userId].url)) {
                users[userId].url = sliceParametrs('&price_max', maxPrice, users[userId].url);
            } else {
                users[userId].url += maxPrice;
            }

            fs.writeFile("data.txt", JSON.stringify(users), function(err) {
                if (err) {
                    console.log(err);
                    return false;
                }

                ctx.telegram.sendMessage(ctx.update.callback_query.from.id, 'Теперь у меня достаточно данных для поиска, давай нечнем?', {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: 'Начать искать', callback_data: 'startSearching'},
                            ]
                        ]
                    }
                });
            });
        }

        const startSearching = function () {
            console.log('Start!');
        }

        const parse = function() {
            const start = async function(userId, user) {
                let notesIsChanged = false;
                const response = await fetch(user.url);
                const body = await response.text();
                const $ = cheerio.load(body);
                const result = Array.from($('.list-simple__output .announcement-container')).reduce((carList, car) => {
                    let carId = null;
                    let carPrice = null;
                    let carName = null;
                    let carUrl = null;

                    car.children.reduce(( result, prop) => {
                        if (prop.name === 'div' && prop.attribs['data-id']) {
                            carId = prop.attribs['data-id'];
                        } else if (prop.name === 'div') {
                            prop.children.reduce((res, info) => {
                                if (info.name === 'div' && info.attribs.class.includes('announcement-block-link')) {

                                    info.children.reduce((result, price) => {
                                        if (price.name === 'div' && price.attribs.class.includes('announcement-block__price')) {

                                            price.children.reduce((result, meta) => {
                                                if (meta.name === 'meta') {
                                                    if (meta.attribs.itemprop === 'price') {
                                                        carPrice = meta.attribs.content;
                                                    } else if (meta.attribs.itemprop === 'name') {
                                                        carName = meta.attribs.content;
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else if (prop.name === 'a') {
                            carUrl = 'https://www.bazaraki.com/' + prop.attribs.href;
                        }
                    });

                    if (!user.carList[carId] || user.carList[carId] !== carPrice) {
                        console.log('name: ' + carName);
                        console.log('price: ' + carPrice);
                        console.log('url: ' + carUrl);
                        user.carList[carId] = carPrice;
                        notesIsChanged = true;
                        bot.telegram.sendMessage(userId, `${carUrl}`);
                    }

                    carList[carId] = carPrice;

                    return carList;
                }, {});

                if (notesIsChanged) {
                    fs.writeFile("data.txt", JSON.stringify(users), function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }

                console.log(result.length);
            }

            const usersList = Object.keys(users);

            usersList.forEach((item) => {
                if(users[item] && users[item].active) {
                    start(item, users[item]).then(r => r);
                }
            });
        }

        const isMinPrice = function (string) {
            return string.includes('price_min') ? string : false;
        }

        const isMaxPrice = function (string) {
            return string.includes('price_max') ? string : false;
        }

        bot.launch().then(r => r);

        bot.start((ctx) => {
            ctx.telegram.sendMessage(ctx.message.chat.id, `Привет! \n Я бот для отслеживания свежих объявлений о продаже авто на www.bazaraki.com. \n Я задам несколько вопросов, мы настроим фильтры поиска и ты начнешь получать сообщения по мере появления новых объявлений.`, {
                reply_markup: {
                    inline_keyboard: [[{text: 'Погнали!', callback_data: 'startСonversation'}]]
                }
            })
        });

        bot.on('callback_query', (ctx) => {
            switch (ctx.update.callback_query.data) {
                case 'startСonversation':
                    startConversation(ctx);
                    break;
                case isMinPrice(ctx.update.callback_query.data):
                    setMinPrice(ctx);
                    break;
                case isMaxPrice(ctx.update.callback_query.data):
                    setMaxPrice(ctx);
                    break;
                case 'startSearching':
                    startSearching();
                    break;
            }
        });

        setInterval(() => parse(), 600000);
    });
});
