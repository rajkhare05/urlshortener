import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

function LinkBoard() {
    const [links, setLinks] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/')
            .then(res => {
                setLinks(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Clicks</th>
                    <th>Shortened</th>
                    <th>Original</th>
                </tr>
            </thead>
            <tbody>
                {links.map(data =>
                    <tr key={data.short}>
                        <td>{data.clicks}</td>
                        <td>{data.short}</td>
                        <td>{data.original}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default LinkBoard
