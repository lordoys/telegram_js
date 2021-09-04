const fetch = require('node-fetch');
const cheerio = require('cheerio');
const url = 'https://www.bazaraki.com/car-motorbikes-boats-and-parts/cars-trucks-and-vans/mazda/gearbox---1/year_min---67/?type_view=line&ordering=newest&price_max=500';

const parser = async function() {
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    // const result = $('.list-simple__output .announcement-container')[0].children[3].attribs.href;
    const result = Array.from($('.list-simple__output .announcement-container')).reduce((carList, car) => {
        carList.push(car.children.reduce((propsList, prop) => {
            if (prop.name === 'a') {
                propsList.push(prop.attribs.href);
            }

            return propsList;
        }, []));

        return carList;
    }, []);

    console.log(result);
}

parser().then(r => r);
