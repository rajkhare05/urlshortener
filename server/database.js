const Pool = require('pg').Pool

const pool = new Pool({    
    user: "dbman",
    password: "_dbman_",
    host: "localhost",
    port: 5432,
    database: "shorturls"
})

module.exports = pool
