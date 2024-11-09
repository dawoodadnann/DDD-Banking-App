// Navbar.jsx
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; // Use Link for proper routing in React Router
import logo from '../assets/logo2.png';

function BasicExample() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
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

            <Nav.Link as={Link} to="/portfolio" className="ps-3"> {/* Added left padding */}
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="ps-3"> {/* Added left padding */}
              User Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" className="ps-3"> {/* Added left padding */}
              User Signup
            </Nav.Link>
            <Nav.Link as={Link} to="/managerlogin" className="ps-3"> {/* Added left padding */}
              Manager Login
            </Nav.Link>
            <Nav.Link as={Link} to="/managersignup" className="ps-3"> {/* Added left padding */}
              Manager Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
