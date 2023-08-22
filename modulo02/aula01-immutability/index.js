const assert = require("assert");

let counter = 0;
let counter2 = counter;


// Primitive types generate an in memory copy;
counter++;
assert.strictEqual(counter, 1);
assert.strictEqual(counter2, 0);
counter2++;
assert.strictEqual(counter, 1);
assert.strictEqual(counter2, 1);

// Reference types copy the memory address and points to the same place
const item = { counter: 0 };
const item2 = item;

item2.counter++;
assert.strictEqual(item2.counter, 1);
assert.strictEqual(item.counter, 1);

item.counter++;
assert.strictEqual(item2.counter, 2);
assert.strictEqual(item.counter, 2);