import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import BackBtn from "../components/BackBtn";
import UpdateButton from "../components/UpdateButton";
import NewComment from "../components/NewComment";
import CommentList from "../components/CommentList";

function BlogPost({ user }) {

    const [post, setPost] = useState({});
    const [commentCount, setCommentCount] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const apiUrl = `http://localhost:8080/api/singlepost/${id}`;
        const fetchSinglePost = async () => {
            try {
                const res = await fetch(apiUrl);
                if (res.ok) {
                    const data = await res.json();
                    const createdAtDateStr = new Date(data.createdAt);
                    const options = { year: "numeric", month: "long", day: "numeric" };
                    const formattedDate = createdAtDateStr.toLocaleDateString(undefined, options);
                    data.createdAt = formattedDate;
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
        <Container className="mt-4">
        <h1>{post.title}</h1>
        <span className="text-muted">By: {post.author} | {post.createdAt} </span>
        <div dangerouslySetInnerHTML={{__html: post.content}} className="mt-4" />
        {post.tags && post.tags.length > 0 ? (
                    <div className="mt-4"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags" viewBox="0 0 16 16">
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                    </svg>
                    <span className="mx-2">{post.tags.join(", ")}</span>
                </div>
        ) : null}
        <div className="mt-4">
        <BackBtn />
        {user && user.role === "admin" ? (
            <UpdateButton post={post} />
        ) : null}
        </div>
        <hr />
        <NewComment postId={id} user={user} commentCount={commentCount} setCommentCount={setCommentCount}/>
        <CommentList postId={id} commentCount={commentCount} setCommentCount={setCommentCount} user={user} />
        </Container>
        </>
    )
}

export default BlogPost;