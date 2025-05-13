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

// Home page
app.get('/', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

// List all URLs
app.get('/all-links', async (_, res) => {
    try {
        
        const result = await pool.query(`SELECT short, original, clicks, time FROM ${TABLE} ORDER BY TIME DESC;`)
        const data = result.rowCount
        if (data && data > 0) {
            return res.json(result.rows)
        }
        return res.json({})

    } catch (err) {
        res.status(500).json({ error : "Error" })
        console.error(err.message)
    }
})

// Shrink URL
app.post('/shrink', async (req, res) => {
    try {

        const { original } = req.body
        const short = shrinkUrl()

        await pool.query(
            `INSERT INTO ${TABLE}(short, original) VALUES ($1, $2);`
        , [short, original])

        return res.status(201).json({
            url: `${URL}/${short}`
        })

    } catch (err) {
        res.status(500).json({ error : "Error" })
        console.error(err.message)
    }
})

// redirect and update clicks
app.get('/:keyword', async (req, res) => {

    const keyword = req.params.keyword

    // validate the keyword
    const regex = new RegExp(/\w{5,9}/)
    if (regex.test(keyword) && keyword.length <= 9) {

        try {
            // fetch the original URL
            const result = await pool.query(
                `SELECT original FROM ${TABLE} WHERE SHORT = $1;`
                , [keyword])

            const rows = result.rowCount

            if (rows > 0) {
                const { original } = result.rows[0]

                // update the clicks 
                await pool.query(
                    `UPDATE ${TABLE} SET clicks = clicks + 1 WHERE SHORT = $1`
                    , [keyword])

                return res.redirect(original)
            }

        } catch (err) {
            res.status(500).json({ error : "Error" })
            console.error(err.message)
        }
    }
    return res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`listening: ${URL}`)
})

