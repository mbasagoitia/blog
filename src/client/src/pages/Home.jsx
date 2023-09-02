import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navigation from "../components/Navbar";

function Home() {
    const [isAdmin, setIsAdmin] = useState(false);

    fetch("http://localhost:8080/api/get-admin-token")
    .then((res) => res.json())
    .then((data) => {
        const adminToken = data.adminToken;
        const hasAdminAccess = window.location.href.includes(adminToken);
        if (hasAdminAccess) {
            setIsAdmin(true);
        }
    })
    .catch((err) => {
        console.error(err)
    });

    const [blogPosts, setBlogPosts] = useState([]);
    useEffect(() => {
        // Fetch blog posts from API and set to blogPosts state
        // Display blog posts
    }, [])

    return (
        <>
        <Container fluid>
            <Row>
                <Col>
                <h1 className="text-center">CodeCrafted Chronicles</h1>
                <h2 className="text-center">{isAdmin ? "admin" : "not admin"}</h2>
                </Col>
            </Row>
            <Navigation />
            { isAdmin? (
                <Row>
                    <Col>
                        {/* Routes you to CreatePost.jsx */}
                        <Button className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg></Button>
                    </Col>
                </Row>    
            ) : null }
            <Row>
                <Col>
                {blogPosts.map((post) => {
            // Render each blog post
                })}
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home;