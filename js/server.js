//require the http module first
    //WDTM???: Require is a nodejs way of loading in a module. Basically works like import in java, but is nodejs specific
    //         what this does is load the http module from nodejs modules for later use
const http = require('http');


//import app.js file
    //WDTM???: This require is loading app.js on the same level using the relative filepath. You dont need the extension i guess.
const app = require('./app');

//define port to be used
const port = process.env.PORT || 3100;

const server = http.createServer(app);

server.listen(port, () => {
    //    let's print a message when the server run successfully
    console.log("Server restarted successfully")
});