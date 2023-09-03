import { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const handleCreatePost = () => {
        const apiUrl = "http://localhost:8080/api/new";
        const postData = {
            title,
            description,
            content,
            createdAt: Date.now(),
            // make this better
            tags: []
        };

        fetch(`${apiUrl}?token=${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        })
        .then((res) => {
            if (res.ok) {
                console.log("Post created successfully");
            } else {
                console.error("Error creating post")
            }
        })
        .catch((err) => console.error(err))
    }

    return (
        <>
        <Container>
        <h2>New Blog Post</h2>
            <Form>
            <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" value={title} onChange={ (e) => setTitle(e.target.value) } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" value={description} onChange={ (e) => setDescription(e.target.value) }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} value={content} onChange={ (e) => {
                    console.log(e.target.value);
                    setContent(e.target.value);
                    console.log(content);
                    }} />
            </Form.Group>
            </Form>
            <Link className="btn btn-primary" to="/">Cancel</Link>
            <Button onClick={handleCreatePost}>Save</Button>
        </Container>
        </>
    )
}

export default CreatePost;