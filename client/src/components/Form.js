import React, { useState } from 'react'
import axios from 'axios'
import Cards from './Cards'

function Form() {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        // if (!e.target.value) return
        axios.post('http://localhost:4000/shrink', {
            original: url
        })
            .then((response) => {
                // setUrl('')
                setShortUrl(response.data.url)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>url: </label>
                <input type='text' onChange={e => setUrl(e.target.value)} />
                <button type='submit'>shrink</button>
            </form>
            {shortUrl && <Cards shrinkedUrl={shortUrl}/>}
        </div>
    )
}

export default Form
