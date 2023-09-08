import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import DeleteBtn from "../components/DeleteBtn";

function UpdatePost({ adminToken }) {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [post, setPost] = useState({});
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
        const apiUrl = `http://localhost:8080/api/singlepost/${id}`;
        const fetchSinglePost = async () => {
            try {
                const res = await fetch(apiUrl);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                    setTitle(data.title);
                    setDescription(data.description);
                    setContent(data.content);
                    setTags(data.tags.join(", "));
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
            tags: tags
        };

        fetch(apiUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": token },
            body: JSON.stringify(updatedData)
        })
        .then((res) => {
            if (res.ok) {
                console.log("Post updated successfully");
                navigate(-1);
            } else {
                console.error("Error updating post")
            }
        })
        .catch((err) => console.error(err))
    }

    return (
        <>
        <Container className="mt-4">
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
            <Button onClick={() => handleUpdatePost(id)} className="btn-secondary mx-2">Save</Button>
            <DeleteBtn id={id} adminToken={adminToken} />
        </Container>
        </>
    )   
}

export default UpdatePost;