console.assert(String(123) === '123', "Explicit convertion to string");
console.assert(123 + '' === '123',    "Implicit convertion to string")

// || e && always returns the value and the convertion to boolean is implicit
console.assert("hello" || 123 === 'hello',  "|| returns the first true value");
console.assert("hello" && 123 === 123,      "&& returns the last true value");

const item = {
    name: "wesley",
    age: 22,
    // If the return value is not primitive type, it calls valueOf
    toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
    },
    // If the return value is not primitive type, it calls toString as fallback
    valueOf() {
        return this.age;
    },
}

// Explicit convertion of item to string
console.assert(String(item) === 'Name: wesley, Age: 22');

// Explicit convertion of item to number
console.assert(Number(item) === 22);

// Implicit convertion using valueOf
console.assert(item + 1 === 23);

const item2 = {
    count: 22,
    // If the return value is not primitive type, it calls valueOf
    toString() {
        return `Count: ${this.count}`
    },
    // If the return value is not primitive type, it calls toString as fallback
    valueOf() {
        return { count: this.count }
    }
}

console.assert(String(item2) === "Count: 22");
// In case valueOf does not return a primitive type, it calls toString() 
// and tries to convert 'Count: 22' to a number
console.assert(isNaN(Number(item2)));

const item3 = {
    profession: 'developer',
    // It override every convertion function there is and uses this implementation
    [Symbol.toPrimitive](coercionType) {
        const types = {
            string: JSON.stringify(this),
            number: 14,
        }
        console.log("trying to convert to: ", coercionType);

        return types[coercionType] || types.string
    }
}

// Uses default boolean convertion and does not call Symbol.toPrimitive;
// Implicit convertion to boolean;
console.assert(!!item3);

// Uses default boolean convertion and does not call Symbol.toPrimitive;
// Explicit convertion to boolean;
console.assert(Boolean(item3));

// Implicit convertion to string
console.assert("test".concat(item3) === 'test{"profession":"developer"}');

// Uses the default convertion (string)
console.assert(item3 + 1 === '{"profession":"developer"}1');


// Explicit convertion to string
console.assert(String(item3) === '{"profession":"developer"}');

// Implicit and Explicit coercion type
console.assert(item3 == String(item3));

// Explicit convertion to Number
console.assert(Number(item3) === 14);

// Implicit and Explicit coercion type
// console.assert(item3 == Number(item3));