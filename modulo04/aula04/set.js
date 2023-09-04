const assert = require("assert");

// Unique items in a list

const arr1 = [0, 1, 2];
const arr2 = [2, 0, 3];

const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), [0, 0, 1, 2, 2, 3]);

const set = new Set();
arr1.map(i => set.add(i));
arr2.map(i => set.add(i));

assert.deepStrictEqual(Array.from(set), [0, 1, 2, 3]);
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [0, 1, 2, 3]);