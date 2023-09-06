import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import BackBtn from "../components/BackBtn";
import UpdateButton from "../components/UpdateButton";
import NewComment from "../components/NewComment";
import CommentList from "../components/CommentList";

function BlogPost({ user }) {

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
        <Container>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <p>{post.content}</p>
        <p>{post.tags ? post.tags.join(", "): null}</p>
        <BackBtn />
        {user && user.role === "admin" ? (
            <UpdateButton post={post} />
        ) : null}
        <hr />
        <NewComment postId={id} user={user}/>
        <CommentList postId={id} />
        </Container>
        </>
    )
}

export default BlogPost;