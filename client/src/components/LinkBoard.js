import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

function LinkBoard() {
    
    const [links, setLinks] = useState([])
    const [status, setStatus] = useState(false)
    
    useEffect(() => {
        axios.get(`https://theurl.ml/all-links`)
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
