import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const handleCreatePost = () => {
        // Send aPI request to create a new blog post
    }

    return (
        <>
        <Container>
        <h2>New Blog Post</h2>
            <Form>
            <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" value={title} onChange={ (e => setTitle(e.target.value)) } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" value={description} onChange={ (e => setDescription(e.target.value)) }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} value={content} onChange={ (e) => setContent(e.target.value) } />
            </Form.Group>
            </Form>
            <Button>Cancel</Button>
            <Button onClick={handleCreatePost}>Save</Button>
        </Container>
        </>
    )
}

export default CreatePost;