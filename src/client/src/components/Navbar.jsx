import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

function Navigation () {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 d-flex justify-content-evenly">  
                    <Nav.Link href="#home">All Posts</Nav.Link>
                    <Nav.Link href="#home">Tech Trends</Nav.Link>
                    <Nav.Link href="#link">Basics and Tutorials</Nav.Link>
                    <Nav.Link href="#link">Web Design and UX</Nav.Link>
                <NavDropdown title="Career" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Interview Prep</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Job Search Resources</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Community and Events</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Switching Careers</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                </Navbar.Collapse>
                <div className="input-group w-25">
                <div className="input-group-prepend">
                <span className="input-group-text h-100" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg></span>
                </div>
                <input type="search" className="form-control" placeholder="Search by tags..." aria-label="Search"></input>
                </div>
            </Container>
        </Navbar>
    )
}

export default Navigation;