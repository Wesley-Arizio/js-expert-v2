const assert = require("assert");

function* calculation(a1, a2) {
    yield a1 * a2;
}

function* main () {
    yield "Hello"
    yield "-"
    yield "world"
    yield* calculation(20, 10);
}

const gen = main();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

assert.deepStrictEqual(gen.next(), { value: "Hello", done: false });
assert.deepStrictEqual(gen.next(), { value: "-", done: false });
assert.deepStrictEqual(gen.next(), { value: "world", done: false });
assert.deepStrictEqual(gen.next(), { value: 200, done: false });
assert.deepStrictEqual(gen.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), ["Hello", "-", "world", 200]);
assert.deepStrictEqual([...main()], ["Hello", "-", "world", 200]);


const { readFile, stat, readdir } = require("fs/promises");

function* promisified() {
    yield readFile(__filename);
    yield Promise.resolve("Hey");
}

async function* systemInfo() {
    console.log("called 1");
    yield Promise.resolve(1);
    console.log("called 2");
    yield Promise.resolve(2);
    console.log("called 3");
    yield Promise.resolve(3);
    console.log("called 4");
    yield Promise.resolve(4);
}

;(async () => {
    let i = 0;
    for await (const item of systemInfo()) {
        console.log(`index: ${i} | value: ${item}`);
        i++;
    }

    console.log(await systemInfo().next());
})()





