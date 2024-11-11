import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import '../App.css'; // Make sure to import your CSS file

function BasicExample() {
  return (
    <Navbar className="navbar-gradient" expand="lg"> {/* Removed bg-dark */}
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          D-Pay
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/dashboard" className="ps-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/money-transfer" className="ps-3">
              Transfer Money
            </Nav.Link>
            <Nav.Link as={Link} to="/billing" className="ps-3">
              Pay Bills
            </Nav.Link>
            <Nav.Link as={Link} to="/loan" className="ps-3">
              Loan Application
            </Nav.Link>
            <Nav.Link as={Link} to="/cards" className="ps-3">
              Card Management
            </Nav.Link>
            <Nav.Link as={Link} to="/help" className="ps-3">
              Help
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
