import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navigation from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/Card";
import LogoutBtn from "../components/LogOutBtn";

function Home() {

    const [blogPosts, setBlogPosts] = useState([]);
    
    useEffect(() => {
        // Fetch blog posts from API and set to blogPosts state
        const apiUrl = "http://localhost:8080/api/posts";
        const fetchBlogPosts = async () => {
            try {
                const res = await fetch(apiUrl);
                if (res.ok) {
                    const data = await res.json();
                    setBlogPosts(data);
                } else {
                    console.error("Error fetching blog posts");
                }
            } catch (err) {
                console.error("Error:", err);
            }
        }
        fetchBlogPosts();
    }, [])

    return (
        <>
        <Container fluid>
            <Row>
                <Col>
                <h1 className="text-center my-4">CodeCrafted Chronicles</h1>
                </Col>
            </Row>
            <Navigation />
            <Row>
                <Col>
                <div className="d-flex justify-content-between">
                { /* change to is admin */ }
                { true ? (
                <Link to={"/new"} className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
                </Link>  
                ) : null }
                <h1 className="text-center">All Posts</h1>
                <div>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                    <Link to="/register" className="btn btn-secondary">Register</Link>
                    <LogoutBtn />
                </div>
                </div>
                <ul>
                {blogPosts.map((post) => {
                    return <li key={post._id}>
                            <PostCard post={post} />
                            </li>
                    })}
                </ul>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home;