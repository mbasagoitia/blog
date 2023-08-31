import { useState, useEffect } from "react";

function Home() {
    const [blogPosts, setBlogPosts] = useState([]);
    useEffect(() => {
        // fetch blog posts from API and set to blogPosts state
        // display blog posts
    }, [])

    return (
        <>
        <h1>Welcome!</h1>
        {blogPosts.map((post) => {
            // render each blog post
        })}
        </>
    )
}

export default Home;