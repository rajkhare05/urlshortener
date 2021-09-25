const express = require('express')
const cors = require('cors')
const pool = require('./database')
const shrinkUrl = require('./shrinkUrl')

const PROTOCOL = process.env.PROTOCOL || 'http'
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 4000
const app = express()

app.use(cors())
app.use(express.json())

// routes

// get all urls
app.get('/', async (req, res) => {
    try {
        const rawData = await pool.query('SELECT * FROM LINKS ORDER BY TIME DESC;')
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
        const short = await shrinkUrl()
        await pool.query(
            'INSERT INTO LINKS(SHORT, ORIGINAL) VALUES ($1, $2);'
            , [short, original])

        res.json({
            url: `${PROTOCOL}://${HOST}:${PORT}/${short}`
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
        'SELECT ORIGINAL FROM LINKS WHERE SHORT=$1;'
        , [shortUrl])
    if (!(rawData.rowCount > 0)) return res.json({ url: null })
    const { original } = rawData.rows[0]
    await pool.query('UPDATE LINKS SET CLICKS = CLICKS + 1')
    res.redirect(original)
})

app.listen(PORT, () => {
    console.log(`listening: ${PROTOCOL}://${HOST}:${PORT}`)
})
