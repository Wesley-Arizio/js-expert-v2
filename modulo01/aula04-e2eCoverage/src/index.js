const Service = require("./service");
const Server = require("./server");

;(async () => {
    const service = new Service();
    new Server(service);
})();