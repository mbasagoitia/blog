import { useState, useEffect } from "react";

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
        <h1>Welcome!</h1>
        <h2>{isAdmin ? "admin" : "not admin"}</h2>
        {blogPosts.map((post) => {
            // Render each blog post
        })}
        </>
    )
}

export default Home;