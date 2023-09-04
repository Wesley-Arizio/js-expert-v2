const assert = require("assert");

// using constructor to initialize map
const map = new Map([
    ['key', 'value'],
    [1, true],
    ['wesley', { age: 22, jobs: 0 }]
]);

assert.deepStrictEqual(map.get('key'), 'value');
assert.ok(map.get(1));
assert.deepStrictEqual(map.get('wesley'), { age: 22, jobs: 0 });

// using set to add more props
map.set(2, "value2");
assert.deepStrictEqual(map.get(2), "value2");
assert.deepStrictEqual(map.get("2"), undefined);

// using objects as keys can only be accessed using reference
const key = { name: "wesley" };
map.set(key, "test");
assert.deepStrictEqual(map.get(key), "test");
assert.deepStrictEqual(map.get({ name: "wesley" }), undefined);
assert.deepStrictEqual(map.get(Object.create(key)), undefined);

// Verify if map has a property with key
assert.ok(map.has(key));
assert.ok(!map.has("2"));

// How many properties it has stored
assert.equal(map.size,  5);

// Return values as iterable
assert.deepStrictEqual(JSON.stringify([...map.values()]), JSON.stringify(['value', true, { age: 22, jobs: 0 }, "value2", "test"]));

// Removes value
assert.ok(map.delete(key));
assert.ok(!map.has(key));

