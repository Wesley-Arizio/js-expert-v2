import Draftlog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readline from "readline";
import Person from "./person.js";

export default class TerminalController {
    constructor() {
        this.print = {};
        this.data = {};
    }

    intializeTerminal(db, lang) {
        Draftlog(console).addLineListener(process.stdin);
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.initializeTable(db, lang);
    }

    initializeTable(db, lang) {
        const data = db.map((c) => new Person(c).formatted(lang));
        const table = chalkTable(this.tableOptions(), data);
        this.data = data;
        this.print = console.draft(table);
    }

    updateTable(item) {
        this.data.push(item);
        this.print(chalkTable(this.tableOptions(), this.data))
    }

    question(msg = '') {
        return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    closeTerminal() {
        this.terminal.close();
    }

    tableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.cyan("Id") },
                { field: "vehicles", name: chalk.cyan("Vehicles") },
                { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
                { field: "from", name: chalk.cyan("From") },
                { field: "to", name: chalk.cyan("To") },
            ]
        }
    }

}