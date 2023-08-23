const assert = require('assert');

// literal objects 
const obj = {};
const arr = [];
const fn = () => {};

// literal objects become explicit functions ex:
// {} => Object
// [] => Array
// fn() => Function

assert.deepStrictEqual(new Object().__proto__, obj.__proto__);

// obj.__proto__ is a reference for its own properties, 
// inherited from object literals that can be changed any time.
assert.deepStrictEqual(Object.prototype, obj.__proto__);

assert.deepStrictEqual(Array.prototype, arr.__proto__);

assert.deepStrictEqual(Function.prototype, fn.__proto__);

// The Object.prototype.__proto__ is null
// obj.__proto__ points to Object.prototype and the __proto__ of Object.prototype is null
assert.deepStrictEqual(Object.prototype.__proto__, null);
assert.deepStrictEqual(obj.__proto__, Object.prototype);
assert.deepStrictEqual(obj.__proto__.__proto__, null);


function Employee() {}
Employee.prototype.salary = () => "salary**";

// Supervisor inherits salary from employee prototype
function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => "profitShare**";


// Manager inherits salary and profitShare from Employee and Supervisor;
function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => "bonuses**";

// assert.strictEqual(Manager.prototype.salary(), "salary**");

// Manager.__proto__ points to Function.prototype, the default
// proto chain
assert.deepStrictEqual(Manager.__proto__, Function.prototype);
assert.deepStrictEqual(Manager.__proto__.__proto__, Function.prototype.__proto__);
assert.deepStrictEqual(Manager.__proto__.__proto__.__proto__, null);

// Prototype chain
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);
assert.deepStrictEqual(Manager.prototype.__proto__.__proto__, Employee.prototype);

// Using new keyword, the __proto__ receives prototype
assert.deepStrictEqual(Manager.prototype.salary(), "salary**");
assert.deepStrictEqual(new Manager().salary(), "salary**");
assert.deepStrictEqual(new Manager().profitShare(), "profitShare**");
assert.deepStrictEqual(new Manager().monthlyBonuses(), "bonuses**");
console.log('new Manager().__proto__: ', new Manager().__proto__);
console.log('new Manager().__proto__.__proto__', new Manager().__proto__.__proto__);
console.log('new Manager().__proto__.__proto__.__proto__', new Manager().__proto__.__proto__.__proto__);
assert.deepStrictEqual(new Manager().__proto__, Manager.prototype);
assert.deepStrictEqual(new Manager().__proto__.__proto__,  Supervisor.prototype);
assert.deepStrictEqual(new Manager().__proto__.__proto__.__proto__,  Employee.prototype);
assert.deepStrictEqual(new Manager().__proto__.__proto__.__proto__.__proto__,  Object.prototype);
assert.deepStrictEqual(new Manager().__proto__.__proto__.__proto__.__proto__.__proto__,  null);


class T1 {
    ping() { return 'ping' }
}

class T2 extends T1 {
    pong() { return 'pong' } 
}

class T3 extends T2 {
    shoot() { return 'shoot' }
    test() { return "Ok" }
}

// Without new key word
assert.deepStrictEqual(T3.prototype.__proto__, T2.prototype);
assert.deepStrictEqual(T3.prototype.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(T3.prototype.__proto__.__proto__.__proto__, Object.prototype);
assert.deepStrictEqual(T3.prototype.__proto__.__proto__.__proto__.__proto__, null);

// With new key word
const t3 = new T3();
assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, Object.prototype.__proto__);