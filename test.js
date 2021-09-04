const express = require('express');
const port = 3000;
const app = express();
const { Telegraf } = require('telegraf');
const fetch = require("node-fetch");
const cheerio = require('cheerio');
const bot = new Telegraf('1731362068:AAGZGBDhdv7h5-jBCps1ZyTPuq8ZPXD0Ztk');
const url = 'https://www.bazaraki.com/car-motorbikes-boats-and-parts/cars-trucks-and-vans/gearbox---1/year_min---67/?type_view=line&price_max=15000';

app.listen(port, () => {

    const parse = async function() {
        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load(body);
        const result = $('.list-simple__output .announcement-container');

        console.log(result[0]);
        console.log(typeof result);

        await bot.telegram.sendMessage(237016450, result[0]);
    }

    bot.launch().then(r => console.log(r));

    setInterval(() => parse(), 3000);
});
