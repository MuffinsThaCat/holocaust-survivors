'use strict';
const app = require('../app');
const debug = require('debug')('holocaust:server');
const http = require('http');

const PORT = pocess.env.PORT || 3000;
const server = http.creatServer('app', app);

server.listen(PORT, (error) => {
    if (error) {
        throw error;
        console.error(error);

    } else {
        console.log(`server running at :${PORT}`);
    }

})