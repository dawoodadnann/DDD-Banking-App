// Navbar.jsx
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; // Use Link for proper routing in React Router
import logo from '../assets/logo2.png';

function BasicExample() {
  return (
    <Navbar
      bg="dark"
      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md" // Gradient added here
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="/" className="text-white">
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
            <Nav.Link
              as={Link}
              to="/manager-dashboard"
              className="ps-3 text-white hover:text-gray-200" // Added white text color and hover effect
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/managerfaqpage"
              className="ps-3 text-white hover:text-gray-200" // Added white text color and hover effect
            >
              Manager Faq
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/managerapproval"
              className="ps-3 text-white hover:text-gray-200" // Added white text color and hover effect
            >
              Manager Approval
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/managerupdate"
              className="ps-3 text-white hover:text-gray-200" // Added white text color and hover effect
            >
              Update User
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
