const http = require('http')
const router = require('./router.js')

const server = http.createServer(router)
const port = 8080
const ready = () => console.log(`server ready on ${port}`);

server.listen(port, ready)     //listen metodo de httpp