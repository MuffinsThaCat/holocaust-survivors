db = {
    dev: {
        connectionString: 'mongodb://localhost:27017/mailerDemo'
    }, // string

    live: {
        connectionString: 'live settings'


    }

}

module.exports = db;
console.log(module.exports = db);