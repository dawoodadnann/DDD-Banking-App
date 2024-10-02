import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../assets/logo2.png"

const Navigation = () => {
  return (
    <Navbar  bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
      <Navbar.Brand href="#home">
            <img
              alt=""
              src= {logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            D-Pay
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About Us</Nav.Link>
            <Nav.Link href="#link">Contact Us</Nav.Link>
            <Nav.Link href="#link">Help</Nav.Link>
            <Nav.Link href="#link">FAQs</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation