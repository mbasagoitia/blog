import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

function UpdatePost() {
    const [post, setPost] = useState({});
    const { id } = useParams();

    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [content, setContent] = useState(post.content);
    const [tags, setTags] = useState(post.tags);
    
    // State isn't working
    console.log(title, description, content, tags);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

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

    const handleUpdatePost = (id) => {
        const apiUrl = `http://localhost:8080/api/update/${id}`;
        const updatedData = {
            title: title,
            description: description,
            content: content,
            createdAt: Date.now(),
            tags: tags.split(", ")
        };

        console.log(updatedData);

        fetch(`${apiUrl}?token=${token}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        })
        .then((res) => {
            if (res.ok) {
                console.log("Post updated successfully");
            } else {
                console.error("Error updating post")
            }
        })
        .catch((err) => console.error(err))
    }

    return (
        <>
        <Container>
        <h2>Update Blog Post</h2>
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
            <Link className="btn btn-primary" to="/">Cancel</Link>
            <Button onClick={handleUpdatePost}>Save</Button>
        </Container>
        </>
    )   
}

export default UpdatePost;