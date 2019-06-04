'use strict';
const app = require('../app');
const debug = require('debug')('holocaust:server');
const http = require('http');

const PORT = process.env.PORT || 3000;
const server = http.createServer('app', app);

server.listen(PORT, (error) => {
    if (error) {
        throw error;


    } else {
        console.log(`server running at :${PORT}`);
    }

})