import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigation from "../components/Navbar";
import { Link } from "react-router-dom";
import LogoutBtn from "../components/LogOutBtn";
import PostsList from "../components/PostsList";
import PaginationControls from "../components/Pagination";
import Footer from "../components/Footer";

function Home({ user, setUser }) {

    const [blogPosts, setBlogPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");

    useEffect(() => {

        // Fetch a list of all existing blog posts

        const apiUrl = "http://localhost:8080/api/posts";
        const fetchBlogPosts = async () => {
            try {
                const res = await fetch(apiUrl);
                if (res.ok) {
                    const data = await res.json();
                    setBlogPosts(data);
                    setFilteredPosts(data);
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
        <h1 className="text-center my-4" id="title">CodeCrafted Chronicles</h1>
            <Navigation blogPosts={blogPosts} setFilteredPosts={setFilteredPosts} setDisplayedPosts={setDisplayedPosts} setSearchTerms={setSearchTerms}/>
                <Container fluid id="hp-container">
                <Row>
                    <Col>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <h1 className="d-inline m-0" id="displayed-posts-heading">{searchTerms && searchTerms !== "All Posts" ? `Posts matching "${searchTerms}"` : "All Posts"}</h1>
                            <div className="d-inline d-flex align-items-center">
                                { user && user.role === "admin" ? (
                                <Link to={"/new"} className="btn btn-secondary mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                </svg>
                                </Link>  
                                ) : null }
                                {user ? <LogoutBtn setUser={setUser} /> :
                                <>
                                <Link to="/login" className="btn btn-primary mx-2">Login</Link>
                                <Link to="/register" className="btn btn-secondary">Register</Link>
                                </> }
                            </div>
                        </div>
                <PostsList displayedPosts={displayedPosts.length > 0 ? displayedPosts : filteredPosts } user={user} />
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                <PaginationControls filteredPosts={filteredPosts} setDisplayedPosts={setDisplayedPosts} />
                </Col>
            </Row>
        </Container>
        <Footer />
        </>
    )
}

export default Home;