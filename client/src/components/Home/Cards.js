import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

function Cards({ shrinkedUrl }) {
    const clickHandler = () => {
        navigator.clipboard.writeText(shrinkedUrl)
    }

    return (
        <InputGroup className='mt-4 d-flex justify-content-center'>
            <InputGroup.Text>Shortened Url </InputGroup.Text>
            <InputGroup.Text>{shrinkedUrl}</InputGroup.Text>
            <Button onClick={clickHandler}>copy</Button>
        </InputGroup>
    )
}

export default React.memo(Cards)
