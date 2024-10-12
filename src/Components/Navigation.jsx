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
            <Nav.Link as={Link} to="/" className="ps-3"> {/* Added left padding */}
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/transfer" className="ps-3"> {/* Added left padding */}
              Transfer Money
            </Nav.Link>
            <Nav.Link as={Link} to="/billing" className="ps-3"> {/* Added left padding */}
              Pay Bills
            </Nav.Link>
            <Nav.Link as={Link} to="/loan" className="ps-3"> {/* Added left padding */}
              Loan Application
            </Nav.Link>
            <Nav.Link as={Link} to="/cards" className="ps-3"> {/* Added left padding */}
              Card Management
            </Nav.Link>
            <Nav.Link as={Link} to="/integrations" className="ps-3"> {/* Added left padding */}
              Customer Support
            </Nav.Link>
            <Nav.Link as={Link} to="/help" className="ps-3"> {/* Added left padding */}
              Help
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
