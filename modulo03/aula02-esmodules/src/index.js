import database from "./../database.json" assert { type: "json" };
import Person from "./person.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANG = "pt-BR";

const terminalController = new TerminalController();
terminalController.intializeTerminal(database, DEFAULT_LANG);

const END_PROCESS = ":q";

async function mainLoop() {
    try {
        const answer = await terminalController.question("");
        
        if (answer == END_PROCESS) {
            terminalController.closeTerminal();
            return;
        }

        const person = Person.generateInstanceFromString(answer);
        terminalController.updateTable(person.formatted());
        return mainLoop()
    } catch (e) {
        console.error(e);
        return mainLoop();
    }
}

await mainLoop();