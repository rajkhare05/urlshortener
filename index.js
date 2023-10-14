const express = require('express')
const cors = require('cors')
const path = require('path')
const pool = require('./database')
const shrinkUrl = require('./shrinkUrl')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'client', 'build')))
app.set('json spaces', 1)

const PORT = process.env.PORT || 4000
const NODE_ENV = process.env.NODE_ENV || 'development'
const URL = NODE_ENV === 'production' ? process.env.REACT_APP_URL : `http://localhost` + (PORT === 80 ? `` : `:${PORT}`)
const TABLE = process.env.TABLE || 'links'

// routes

// get all urls

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.get('/all-links', async (req, res) => {
    try {
        
        const rawData = await pool.query(`SELECT * FROM ${TABLE} ORDER BY TIME DESC;`)
        if (!(rawData.rowCount > 0)) return res.json({ status: 'failed' })
        res.json(rawData.rows)

    } catch (err) {
        res.json({ status: "failed" })
        console.error(err.message)
    }
})

// shrink url
app.post('/shrink', async (req, res) => {
    try {

        const { original } = req.body
        const short = shrinkUrl()

        await pool.query(
            `INSERT INTO ${TABLE}(SHORT, ORIGINAL) VALUES ($1, $2);`
        , [short, original])

        res.json({
            url: `${URL}/${short}`
        })

    } catch (err) {
        res.json({ status: "failed" })
        console.error(err.message)
    }
})

// redirect and update clicks
app.get('/:shortUrl', async (req, res) => {

    const shortUrl = req.params.shortUrl
    
    const rawData = await pool.query(
        `SELECT ORIGINAL FROM ${TABLE} WHERE SHORT = $1;`
    , [shortUrl])

    if (!(rawData.rowCount > 0)) return res.redirect('/')

    const { original } = rawData.rows[0]

    await pool.query(
        `UPDATE ${TABLE} SET CLICKS = CLICKS + 1 WHERE SHORT = $1`
    , [shortUrl])

    res.redirect(original)
})

app.listen(PORT, () => {
    console.log(`listening: ${URL}`)
})
