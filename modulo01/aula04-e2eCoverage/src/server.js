const http = require("http");

class Server {
    app;
    constructor(service, port = 3000) {
        this.service = service;
        this.routes = {
            '/swap:get': async (req, res) => {
                try {
                    const data = await this.service.getPlanets("https://swapi.dev/api/planets/1/");
                    res.writeHead(200);
                    return res.end(JSON.stringify(data));
                } catch (e) {
                    res.writeHead(401);
                    return res.end("Internal server error");
                }

            },
            default: (_req, res) => {
                res.writeHead(404);
                return res.end("Not found");
            }
        };

        this.app = http.createServer(this.#handler.bind(this))
            .listen(port, () => {
                console.log("Running at localhost:3000")
            })
    }

    #handler(req, res) {
        const { url, method } = req;
        const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
        const fn = this.routes[routeKey] || this.routes.default;
        return fn(req, res);
    }
}

// const service = new Service();
// const server = new Server(service);
module.exports = Server;

