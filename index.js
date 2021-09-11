const express = require('express');
const port = 8080;
const { Telegraf } = require('telegraf');
const app = express();
const fetch = require("node-fetch");
const cheerio = require('cheerio');
const fs = require('fs');
const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');
const url = 'https://www.bazaraki.com/car-motorbikes-boats-and-parts/cars-trucks-and-vans/gearbox---1/year_min---63/?ordering=newest&price_min=6000&price_max=20000';

app.listen(port, () => {
    const parse = function() {
        const start = async function(data) {
            const notes = JSON.parse(data);
            let notesIsChanged = false;
            const response = await fetch(url);
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

                if (!notes[carId] || notes[carId] !== carPrice) {
                    console.log('name: ' + carName);
                    console.log('price: ' + carPrice);
                    console.log('url: ' + carUrl);
                    notes[carId] = carPrice;
                    notesIsChanged = true;
                    bot.telegram.sendMessage(237016450, `${carUrl}`);
                }

                carList[carId] = carPrice;

                return carList;
            }, {});

            if (notesIsChanged) {
                fs.writeFile("test.txt", JSON.stringify(notes), function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }

            console.log(result.length);
        }

        fs.readFile('test.txt', 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                return false;
            }
            start(data).then(r => r);
        })
    }

    bot.launch().then(r => console.log(r));

    setInterval(() => parse(), 1800000);
});
