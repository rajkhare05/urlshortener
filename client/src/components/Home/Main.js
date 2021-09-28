import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cards from './Cards'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Main() {

    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [vis, setVis] = useState(false)

    useEffect(() => {
        const regEx = /^http(s?):\/\/([a-z0-9]+\.)?([a-z0-9]+\.[a-z]+)+(\/(.*))?$/ig
        
        if (regEx.test(url)) {
            setVis(false)
        } else {
            setVis(true)
        }
    }, [url])

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
                    placeholder='your url with http(s)://'
                    required
                />

                <div className='d-flex justify-content-center'>
                    <Button className='mt-3' variant='primary' type='submit' disabled={vis}>
                        Shrink
                    </Button>
                </div>
            </Form>

            {shortUrl && <Cards shrinkedUrl={shortUrl} />}
        </div>
    )
}

export default Main
