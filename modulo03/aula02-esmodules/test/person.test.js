import { describe, test } from 'mocha';
import { expect } from "chai";
import Person from "../src/person.js";

describe("Person", () => {
    it("Should return a person instance from string", () => {
        const text = "1 Yatch,Submarine,Ship 20000 2023-02-11 2023-03-12";
        const expected = {
            from: '2023-02-11',
            to: '2023-03-12',
            vehicles: ['Yatch', 'Submarine', 'Ship'],
            kmTraveled: '20000',
            id: '1'
        }

        expect(Person.generateInstanceFromString(text)).to.be.deep.equal(expected);
    })
    test("Should format correctly the data", () => {
        const text = "1 Yatch,Submarine,Ship 20000 2023-02-11 2023-03-12";
        const expected = {
            from: 'February 11, 2023',
            to: 'March 12, 2023',
            vehicles: "Yatch, Submarine, and Ship",
            kmTraveled: '20,000 km',
            id: 1
        }

        expect(Person.generateInstanceFromString(text).formatted()).to.be.deep.equal(expected);
    })
})