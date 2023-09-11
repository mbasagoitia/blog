import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Filter from './Filter';

function Navigation ({ blogPosts, setFilteredPosts, setDisplayedPosts, setSearchTerms }) {

    const handleFilter = (searchTerms) => {
        setFilteredPosts(filter(searchTerms));
        setDisplayedPosts([]);
        setSearchTerms(searchTerms);
    }

    function filter (searchTerms) {
        let searchTermsArr = searchTerms.split(",").map((term) => term.trim());

        let matchesAll = blogPosts.filter((blogPost) => {
            return searchTermsArr.every((term) => blogPost.tags.includes(term));
        })
        let matchesSome = blogPosts.filter((blogPost) => {
            return searchTermsArr.some((term) => blogPost.tags.includes(term));
        })
        if (matchesAll.length > 0 && matchesSome.length > 0) {
            return Array.from(new Set([...matchesAll, ...matchesSome]));
        }
        if (matchesAll.length > 0) {
            return matchesAll;
        }
        if (matchesSome.length > 0) {
            return matchesSome;
        }
        return [];
    }

    return (
        <Navbar expand="sm" className="sticky-top navbar-dark">
            <Container fluid className="m-0 w-100 text-center">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 d-flex justify-content-evenly flex-wrap">  
                    <Nav.Link onClick={() => {
                        setFilteredPosts(blogPosts);
                        setSearchTerms("All Posts");
                    }}>All Posts</Nav.Link>
                    <Nav.Link onClick={() => handleFilter("tech trends, tech, trends")}>Tech Trends</Nav.Link>
                    <Nav.Link onClick={() => handleFilter("tutorials")}>Tutorials</Nav.Link>
                    <Nav.Link onClick={() => handleFilter("web design, ux")}>Web Design and UX</Nav.Link>
                <NavDropdown title="Career" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => handleFilter("career")}>All</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleFilter("interview, interview prep")}>Interview Prep</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleFilter("job search, job, jobs")}>Job Search Resources</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleFilter("community, events")}>Community and Events</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleFilter("career switch, switch, career switching, switching")}>Switching Careers</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Filter setFilteredPosts={setFilteredPosts} filter={filter} setSearchTerms={setSearchTerms} />
                </Navbar.Collapse>
            </Container>    
        </Navbar>
    )
}

export default Navigation;