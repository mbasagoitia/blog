import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import BackBtn from "./BackBtn";

function NewComment({ postId, user }) {

    const token = localStorage.getItem("token");

    const [comment, setComment] = useState("");

    const handleCreateComment = () => {
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
            } else {
                console.error("Error posting comment")
            }
        })
        .catch((err) => console.error(err))
    }

    return (
        <>
        <h2>Post a Comment</h2>
            <Form>
            <Form.Group className="mb-3" controlId="Comment">
                <Form.Label>{user ? `@${user.username}` : "" }</Form.Label>
                <Form.Control type="text" placeholder="Your comment here..." value={comment} onChange={ (e) => setComment(e.target.value) } required />
            </Form.Group>
            <BackBtn />
            <Button onClick={handleCreateComment} className="mb-2">Save</Button>
            </Form>
        </>
    )
}

export default NewComment;