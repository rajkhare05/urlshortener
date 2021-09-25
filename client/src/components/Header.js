import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function Header() {
    return (
        <Navbar bg='primary' variant='dark'>
            <Container>
                <Navbar.Brand href='#'>Url Shortener</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link href='#'>Home</Nav.Link>
                    <Nav.Link href='#'>Links</Nav.Link>
                    <Nav.Link href='#'>About</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
