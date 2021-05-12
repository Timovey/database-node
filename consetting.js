const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "192.168.1.62",
    port: "7000",
    database: "test"
})

module.exports = pool