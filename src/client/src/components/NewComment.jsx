import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, redirect } from "react-router-dom";
import BackBtn from "./BackBtn";

function NewComment({ postId, user, commentCount, setCommentCount }) {

    const token = localStorage.getItem("token");

    const [comment, setComment] = useState("");

    const handleCreateComment = (e) => {
        e.preventDefault();
        const apiUrl = "http://localhost:8080/api/comment";
        const commentData = {
            comment: comment,
            post: postId,
            createdAt: Date.now(),
        };

        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": token },
            body: JSON.stringify(commentData)
        })
        .then((res) => {
            if (res.ok) {
                console.log("Comment posted successfully");
                setCommentCount(commentCount + 1);
            } else {
                console.error("Error posting comment")
            }
        })
        .catch((err) => console.error(err))
        setComment("");
    }

    return (
        <>
        {user ? (
            <>
            <h2>Post a Comment</h2>
            <Form onSubmit={(e) => handleCreateComment(e)} className="mb-4">
            <Form.Group className="mb-3" controlId="Comment">
                <Form.Label>{`@${user.username}`}</Form.Label>
                <Form.Control type="text" placeholder="Your comment here..." value={comment} onChange={ (e) => setComment(e.target.value) } required />
            </Form.Group>
            <Button type="submit" className="mb-2">Submit</Button>
            </Form>
            </>
        ) : <p><Link to="/login">Log in</Link> or <Link to={"/register"}>Register</Link> to Post a Comment</p>}
        </>
    )
}

export default NewComment;