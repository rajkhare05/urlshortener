import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function Header() {
    return (
        <Navbar bg='primary' variant='dark'>
            <Container>

                <LinkContainer to='/'>
                    <Navbar.Brand>Url Shortener</Navbar.Brand>
                </LinkContainer>

                <Nav className='me-auto'>

                    <LinkContainer to='/'>
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>

                    {/* <LinkContainer to='/links'>
                        <Nav.Link>Links</Nav.Link>
                    </LinkContainer> */}

                    <LinkContainer to='/about'>
                        <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                    
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
