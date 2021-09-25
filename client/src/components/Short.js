import React, { useState } from 'react'
import axios from 'axios'
import Cards from './Cards'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Short() {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/shrink', {
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
                    placeholder='Paste your url here' 
                    required />
                <Button className='mt-3' variant='primary' type='submit'>
                    Shrink
                </Button>
            </Form>
            {shortUrl && <Cards shrinkedUrl={shortUrl}/>}
        </div>
    )
}

export default Short
