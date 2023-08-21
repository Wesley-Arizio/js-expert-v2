const { describe, it, after, before } = require("mocha");
const supertest = require("supertest");
const assert = require("assert");
const { createSandbox } = require("sinon");

const Server = require("../../src/server");
const Service = require("../../src/service");

const sinon = createSandbox();
const tatooine = require("../../mocks/tatooine.json");

describe("Api test suit", () => {
    let app;
    let service;
    before(done => {
        service = new Service();
        sinon
            .stub(service, service.makeRequest.name)
            .withArgs("https://swapi.dev/api/planets/1/")
            .resolves(tatooine);
        app = new Server(service).app;

        app.once("listening", done);
    });
    after(done => app.close(done));
    describe("/swap", () => {
        it("Should return the tatooine data from /swap endpoint with status code 200", async () => {
            const spy = sinon.spy(service, service.getPlanets.name);
            const response = await supertest(app).get("/swap").expect(200);


            assert.equal(spy.callCount, 1);
            assert.strictEqual("https://swapi.dev/api/planets/1/", spy.getCall(0).args[0]);
            assert.strictEqual(response.text, '{"name":"Tatooine","surfaceWater":"1","appeardIn":5}')
        });
   }) 

   describe("default route", () => {
    it("Should return not found with status code 404 when route does not exist", async () => {
        const response = await supertest(app).get("/test").expect(404);

        assert.strictEqual(response.text, 'Not found')
    });
}) 
})