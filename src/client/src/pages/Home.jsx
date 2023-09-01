import { useState, useEffect } from "react";

function Home() {
    const [blogPosts, setBlogPosts] = useState([]);
    useEffect(() => {
        // Fetch blog posts from API and set to blogPosts state
        // Display blog posts
    }, [])

    return (
        <>
        <h1>Welcome!</h1>
        {blogPosts.map((post) => {
            // Render each blog post
        })}
        </>
    )
}

export default Home;