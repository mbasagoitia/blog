import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BlogPost() {
    const [post, setPost] = useState({});
    const { id } = useParams();
    useEffect(() => {
        const apiUrl = `http://localhost:8080/api/singlepost/${id}`;
        const fetchSinglePost = async () => {
            try {
                const res = await fetch(apiUrl);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                } else {
                    console.error("Error fetching single post");
                }
            } catch(err) {
                console.error(err);
            }
        }
        
        fetchSinglePost();
    }, [id]);

    return (
        <>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <p>{post.content}</p>
        <p>{post.tags ? post.tags.join(", "): null}</p>
        </>
    )
}

export default BlogPost;