const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({    
    user: process.env.DB_USER || "dbman",
    password: process.env.DB_PASSWORD || "_dbman_",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DATABASE || "shorturls"
})

module.exports = pool
