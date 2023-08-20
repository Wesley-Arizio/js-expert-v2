const File = require("./src/file");
const { error } = require("./src/constants");

const assert = require("assert");

;(async () => {
    {
        const filePath = './mocks/invalid-emptyFile.csv';
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/invalid-header.csv';
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/invalid-fiveItems.csv';
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/valid-threeItems.csv';
        const expected = [
            { id: '1', name: 'mariana', profession: 'artista',       age: '19' },
            { id: '2', name: 'daniel', profession: 'escritor',      age: '21' },
            { id: '3', name: 'charlie', profession: 'business man',  age: '20' }
        ];
        const result = await File.csvToJson(filePath);
        
        assert.deepEqual(result, expected);
    }
})()
