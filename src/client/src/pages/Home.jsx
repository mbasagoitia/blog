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
                    <Button>Create New Post</Button>
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