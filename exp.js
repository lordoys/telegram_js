const fs = require('fs');
let min = '&price_min=';
let max = '&price_max=';
let url = 'https://www.bazaraki.com/car-motorbikes-boats-and-parts/cars-trucks-and-vans/gearbox---1/year_min---63/?ordering=newest&price_max=20000&price_min=10000';

const start = url.indexOf(min);
const end = url.indexOf('&', start + min.length);
const first = url.slice(0, start)
const second = end ? '' : url.slice(end);

console.log(start);
console.log(end);
console.log(first);
console.log(second);
console.log(first + second);

const start = url.indexOf(max);
const end = url.indexOf('&', start + max.length);
const first = url.slice(0, start)
const second = end ? '' : url.slice(end);

console.log(start);
console.log(end);
console.log(first);
console.log(second);
console.log(first + second);
