const http = require('http');
const PORT = 5555;
const handlers = require('./handlers/index.js');

const server = http.createServer((req, res) => {
   for (const handler of handlers) {
      //handler is every single function inside array in handlers.js file
      if (!handler(req, res)) { //Checks if the function have request and response arguments
         break;
      }
      //res.end();
   }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
