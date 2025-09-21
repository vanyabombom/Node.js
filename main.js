import { delay, time } from "./helper.js";
import { EventEmitter } from 'node:events';

const processor = new EventEmitter();

function onRateEvent(rate) {
    processor.rate = rate;
    console.log(time(), "Rate = ", rate);
    processor.emit('data');
}
function onPriceEvent(price) {
    processor.price = price;
    console.log(time(), "Price = ", price);
    processor.emit('data');
}
function onDataEvent() {
    if(typeof processor.rate  != 'undefined' && 
       typeof processor.price != 'undefined') {
            const hrn = processor.rate * processor.price;
            console.log(`Final price: ${processor.price} x ${processor.rate} = ${hrn}`);
        }
}

processor.on('rate',  onRateEvent );
processor.on('price', onPriceEvent);
processor.on('data',  onDataEvent );
await Promise.all([
    delay(Math.random() * 2000).then(() => processor.emit('rate', 41)),
    delay(Math.random() * 2000).then(() => processor.emit('price', 300)),
]);
processor.off('rate',  onRateEvent );
processor.off('price', onPriceEvent);
processor.off('data',  onDataEvent );