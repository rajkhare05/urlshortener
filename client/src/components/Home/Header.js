import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Main from './Main'
import LinkBoard from '../LinkBoard'
import About from '../About'

function Header() {
    return (
        <Router>
            <Navbar bg='primary' variant='dark'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Url Shortener</Navbar.Brand>
                    </LinkContainer>
                    <Nav className='me-auto'>
                        <LinkContainer to='/'>
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/links'>
                            <Nav.Link>Links</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/about'>
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/links' component={LinkBoard} />
                <Route path='/about' component={About} />
            </Switch>
        </Router>
    )
}

export default Header
