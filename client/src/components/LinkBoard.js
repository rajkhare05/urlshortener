import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import dotenv from 'dotenv'
dotenv.config()

function LinkBoard() {
    
    const [links, setLinks] = useState([])
    const [status, setStatus] = useState(false)
    const HOST = process.env.REACT_APP_HOST || '127.0.0.1'
    const PORT = process.env.REACT_APP_PORT || 4000
    const URL = process.env.REACT_APP_NODE_ENV === 'production' ? process.env.REACT_APP_URL : `http://${HOST}` + (PORT === 80 ? `` : `:${PORT}`)

    useEffect(() => {
        axios.get(`${URL}/all-links`)
            .then(res => {
                if (res.data.status === 'failed') {
                    setStatus(false)
                }
                else {
                    setLinks(res.data)
                    setStatus(true)
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [URL])

    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Clicks</th>
                    <th>Shortened</th>
                    <th>Original</th>
                </tr>
            </thead>
            {
                { status } &&
                <tbody>
                    {links.map(data =>
                        <tr key={data.short}>
                            <td>{data.clicks}</td>
                            <td>{data.short}</td>
                            <td>{data.original}</td>
                        </tr>
                    )}
                </tbody>
            }
        </Table>
    )
}

export default LinkBoard
