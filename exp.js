const fs = require('fs');
let min = '&price_min';
let max = '&price_max';
const parametr = '&price_min=200';
const parametr2 = '&price_max=200';
let url = 'https://www.bazaraki.com/car-motorbikes-boats-and-parts/cars-trucks-and-vans/gearbox---1/year_min---63/?ordering=newest&price_max=20000&price_min=10000';

const startMin = url.indexOf(min);
const endMin = url.indexOf('&', startMin + min.length);
const firstMin = url.slice(0, startMin);
const secondMin = (endMin > -1) ? url.slice(endMin) : '';
console.log('-----------------------------------------------------------------------------');
console.log(startMin);
console.log(endMin);
console.log('Начало строки: ' + firstMin);
console.log('Конец строки: ' + secondMin);
console.log('Возвращенный вариант: ' + firstMin + parametr + secondMin);
console.log('-----------------------------------------------------------------------------');
url = (firstMin + parametr + secondMin);

const start = url.indexOf(max);
const end = url.indexOf('&', start + max.length);
const first = url.slice(0, start);
const second = (end > -1) ? url.slice(end) : '';
console.log('Начало строки: ' + first);
console.log('Конец строки: ' + second);
console.log('Возвращенный вариант: ' + first + parametr2 + second);
console.log('-----------------------------------------------------------------------------');
