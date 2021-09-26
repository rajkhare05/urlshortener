import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function About() {
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
                        onClick={() => window.location.href='https://github.com/rajkhare05/urlshortener'}>
                        Contirbute
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default About
