import { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import BackBtn from "../components/BackBtn";

function CreatePost() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const handleCreatePost = () => {
        const apiUrl = "http://localhost:8080/api/new";
        const postData = {
            title: title,
            description: description,
            content: content,
            createdAt: Date.now(),
            tags: tags.split(", ")
        };
        console.log(postData);

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
                <Form.Control type="text" placeholder="Title" value={title} onChange={ (e) => setTitle(e.target.value) } required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" value={description} onChange={ (e) => setDescription(e.target.value) } required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} value={content} onChange={ (e) => { setContent(e.target.value)} } required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Ex: react, coding challenges, career" value={tags} onChange={ (e) => setTags(e.target.value) } required />
            </Form.Group>
            </Form>
            <BackBtn />
            <Button onClick={handleCreatePost}>Save</Button>
        </Container>
        </>
    )
}

export default CreatePost;