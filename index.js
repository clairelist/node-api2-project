//DATA SECTION
const server = require('./api/server');

const port = 9000;

server.listen(port,()=>{
    console.log('Current implementation of "server" listening on port '+port);
});