const express = require('express');
const port = 8080;
const { Telegraf } = require('telegraf');
const app = express();
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');
let users;

app.listen(port, () => {
    fs.readFile('data.txt', 'utf8' , (err, data) => {
        if (err) {
            console.error(err);
            return false;
        }

        users = JSON.parse(data);

        const parse = function() {
            const start = async function(userId, user) {
                let notesIsChanged = false;
                const response = await fetch(user.url);
                const body = await response.text();
                const $ = cheerio.load(body);
                Array.from($('.list-simple__output .announcement-container')).reduce((carList, car) => {
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

                console.log(users);
            }

            const usersList = Object.keys(users);

            usersList.forEach((item) => {
                if(users[item] && users[item].active) {
                    start(item, users[item]).then(r => r);
                }
            });
        }

        bot.launch().then(r => r);

        bot.start((ctx) => {
            ctx.telegram.sendMessage(ctx.message.chat.id, `Привет!`);
        });

        setInterval(() => parse(), 600000);
    });
});
