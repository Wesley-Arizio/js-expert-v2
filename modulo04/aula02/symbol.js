const assert = require("assert");

// Always unique in memory address level
const uniqueKey = Symbol("name");
const user = {};

user["name"] = "wesley";
user[uniqueKey] = "allan";

assert.deepStrictEqual(user["name"], "wesley");
assert.deepStrictEqual(user[Symbol("name")], undefined);
assert.deepStrictEqual(user[uniqueKey], "allan");

// Thats why symbols are not secret
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);


// iterator counter
const obj = {
    [Symbol.iterator]() {
        return {
            from: 0,
            to: 5,
            next() {
                if (this.from >= this.to) {
                    return { done: true, value: this.from }
                } else {
                    return { done: false, value: this.from++ }
                }
            }
        }
    }
}



for (const item of obj) {
    console.log(item);
}