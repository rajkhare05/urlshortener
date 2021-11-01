import React, { useState } from 'react'
import axios from 'axios'
import Cards from './Cards'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import dotenv from 'dotenv'
dotenv.config()

function Main() {

    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const HOST = process.env.REACT_APP_HOST || '127.0.0.1'
    const PORT = process.env.REACT_APP_PORT || 4000
    const URL = process.env.REACT_APP_NODE_ENV === 'production' ? process.env.REACT_APP_URL : `http://${HOST}` + (PORT === 80 ? `` : `:${PORT}`)
    
    const submitHandler = (e) => {
        e.preventDefault()
        
        axios.post(`${URL}/shrink`, {
            original: url
        })
            .then((response) => {
                setUrl('')
                setShortUrl(response.data.url)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='container'>

            <Form onSubmit={submitHandler}>

                <Form.Control
                    className='mt-3 text-center'
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    type='text'
                    placeholder='your url with http(s)://'
                    required
                />

                <div className='d-flex justify-content-center'>
                    <Button className='mt-3' variant='primary' type='submit'>
                        Shrink
                    </Button>
                </div>
            </Form>

            {shortUrl && <Cards shrinkedUrl={shortUrl} />}
        </div>
    )
}

export default Main
