import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

function Cards({ shrinkedUrl }) {

    const style = {
        paddingLeft: 2,
        paddingBottom: 2,
        width: 17,
        height: 16
    }

    const clickHandler = () => {
        navigator.clipboard.writeText(shrinkedUrl)
    }

    return (
        <InputGroup className='mt-4 d-flex justify-content-center'>

            <InputGroup.Text>Shortened Url </InputGroup.Text>
            <InputGroup.Text>{shrinkedUrl}</InputGroup.Text>
            <Button onClick={clickHandler}>copy</Button>
            <Button onClick={() => window.open(`${shrinkedUrl}`, '_blank')}
                variant='info'>
                <img src='https://img.icons8.com/fluency-systems-regular/50/000000/external-link.png' style={style} alt='icon-r' />
            </Button>

        </InputGroup>
    )
}

export default React.memo(Cards)
