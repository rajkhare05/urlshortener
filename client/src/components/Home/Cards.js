import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

function Cards({ shrinkedUrl }) {
    const clickHandler = () => {
        navigator.clipboard.writeText(shrinkedUrl)
    }

    return (
        <div className='container mt-3'>
            <InputGroup className="mb-3">
                <InputGroup.Text>Shortened Url: </InputGroup.Text>
                <FormControl value={shrinkedUrl} readOnly/>
                <Button onClick={clickHandler}>copy</Button>
            </InputGroup>
        </div>
    )
}

export default React.memo(Cards)
