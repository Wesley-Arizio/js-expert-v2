'use-strict';

const Event = require("events");

const event = new Event();
const name = "counter";
event.on(name, msg => console.log("counter updated: ", msg));

const counter = {
    counter: 0,
}

const proxy = new Proxy(counter,  {
    set: (target, key, newValue) => {
        event.emit(name, { newValue, key: target[key] });
        target[key] = newValue;
        return true;
    },
    get: (obj, prop) => {
        // console.log("chamou", { obj, prop });
        return obj[prop];
    }
});

// setInterval(function() {
//     proxy.counter += 1;
//     if (proxy.counter === 10) clearInterval(this)
// }, 100);


