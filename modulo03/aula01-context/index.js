'use_strict';

class File {
    watch(_event, filename) {
        this.showContent(filename)
    }

    async showContent(filename) {
        console.log("________________________________________")
        console.log((await readFile(filename)).toString())
    }
}

const { watch, promises: { readFile } } = require("fs");

const file = new File();
// change the function context using bind function
watch(__filename, file.watch.bind(file));

// Changes the context and set the arguments
// const context = { showContent: () => console.log("hello world") };
// const arguments = [null, __filename];
// file.watch.call(context, null, ...arguments);

// // Does the same thing as call but the arguments are passed as array
// const context1 = { showContent: () => console.log("hello world") };
// const arguments1 = [null, __filename];
// file.watch.call(context1, null, ...arguments1);