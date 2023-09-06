import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from './Filter';

function Navigation ({ blogPosts, setDisplayedPosts }) {
    return (
        <Navbar expand="sm">
            <Container fluid className="m-0 w-100 text-center">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 d-flex justify-content-evenly flex-wrap">  
                    <Nav.Link href="#home">All Posts</Nav.Link>
                    <Nav.Link href="#home">Tech Trends</Nav.Link>
                    <Nav.Link href="#link">Tutorials</Nav.Link>
                    <Nav.Link href="#link">Web Design and UX</Nav.Link>
                <NavDropdown title="Career" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Interview Prep</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Job Search Resources</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Community and Events</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Switching Careers</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Filter blogPosts={blogPosts} setDisplayedPosts={setDisplayedPosts} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;