const EventEmitter = require(`events`);
const http = require("http");

// how many modules inherit event emitter
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on(`newSale`, () => {
  console.log(`There's a new SALE!`);
});

myEmitter.on(`newSale`, () => {
  console.log(`Sales Sales Sales!`);
});

myEmitter.on(`newSale`, (stock) => {
  console.log(`Sale Items Left In Stock: ${stock}`);
});

myEmitter.emit(`newSale`, 92);

////////////////////////////////////////////////////////////////

const server = http.createServer();

server.on(`request`, (req, res) => {
  console.log(`Request Received Bud~`);
  console.log(req.url);
  res.end(`Received`);
});

server.on(`request`, (req, res) => {
  console.log(`Another one`);
});

server.on(`close`, () => {
  console.log(`Server Closed!`);
});

server.listen(8000, `127.0.0.1`, () => {
  console.log(`Waiting for Requests`);
});
