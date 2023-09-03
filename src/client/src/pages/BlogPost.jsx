import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import UpdateButton from "../components/UpdateButton";

function BlogPost() {
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
        <BackBtn />
        {isAdmin ? (
            <UpdateButton post={post} />
        ) : null}
        </>
    )
}

export default BlogPost;