import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function About() {

    const style = {
        paddingLeft: 3,
        width: 20,
        height: 16
    }

    return (
        <div className='container mt-3'>

            <Card bg='light'>
                <Card.Header>&copy; Raj Khare</Card.Header>

                <Card.Body>
                    <Card.Title>Url Shortener</Card.Title>

                    <Card.Text>
                        This project is made with 💙 using PERN Stack
                    </Card.Text>

                    <Button variant='danger'
                        onClick={() => window.open('https://github.com/rajkhare05/urlshortener', '_blank')}>
                        Contirbute
                        <img src='https://img.icons8.com/fluency-systems-regular/50/000000/external-link.png' style={style} alt='icon-r' />
                    </Button>
                    
                </Card.Body>
            </Card>
        </div>
    )
}

export default About
