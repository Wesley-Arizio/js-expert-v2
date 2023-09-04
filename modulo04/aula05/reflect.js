'use-strict';

const assert = require("assert");

// assures security and semmantics in objects

const obj = {
    add(value) {
        return this.arg1 + this.arg2 + value;
    }
}

// Changes apply usage for malicious purposes
// Function.prototype.apply = () => { throw new TypeError("Error") }
// obj.add.apply = () => { throw new Error("Error") };

assert.deepStrictEqual(obj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

obj.add.apply = () => { throw new TypeError("ARRRR") };
assert.throws(() => obj.add.apply({}, []), { name: "TypeError", message: "ARRRR" });

const result = Reflect.apply(obj.add, { arg1: 10, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 230);

Reflect.apply = () => { throw new Error("reflect apply function hacked") }
assert.throws(() => Reflect.apply(obj.add, { arg1: 10, arg2: 20 }, [200]), { name: "Error", message: "reflect apply function hacked" });

const withDelete = { pass: 123 };
assert.ok(withDelete.pass);

delete withDelete.pass;

assert.ok(!withDelete.pass);

const key = Symbol("id");
const withReflection = { pass: 123, [key]: 1111 };

assert.deepStrictEqual(withReflection[key], 1111);
assert.deepStrictEqual(Reflect.get(withReflection, key), 1111);
Reflect.deleteProperty(withReflection, "pass");
Reflect.deleteProperty(withReflection, key);

assert.ok(!withReflection.pass);
assert.ok(!withReflection[key]);

assert.throws(() => Reflect.get(1, "test"), TypeError("Reflect.get called on non-object"))