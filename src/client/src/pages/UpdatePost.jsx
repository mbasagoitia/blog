import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import DeleteBtn from "../components/DeleteBtn";
import { Editor } from '@tinymce/tinymce-react';

function UpdatePost() {

    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const editorRef = useRef(null);

    const [post, setPost] = useState({});
    const { id } = useParams();

    const [apiKey, setApiKey] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [initialContent, setInitialContent] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [modalShown, setModalShown] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/api-key")
        .then((res) => res.json())
        .then((data) => setApiKey(data.apiKey))
        .catch((err) => console.error(err));
    }, [])

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
                    setInitialContent(data.content);
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

    const handleUpdatePost = (e, id) => {
        
        e.preventDefault();
        const apiUrl = `http://localhost:8080/api/update/${id}`;

        if (editorRef.current) {
            let htmlContent = editorRef.current.getContent();
            setContent(htmlContent);
          }

        if (title && description && content) {
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
}

    const showModal = () => {
        setModalShown(true);
    }

    return (
        <>
        {modalShown ? (
        <div className="modal-bg">
            <div className="d-flex flex-column justify-content-around text-center p4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="close-modal" className="bi bi-x-lg" viewBox="0 0 16 16" onClick={() => setModalShown(false)}>
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
                <div className="modal-content">
                    <h1 className="modal-heading">Warning</h1>
                    <p className="modal-text">Are you sure you want to delete this post?</p>
                </div>
                <div className="modal-buttons">
                    <Button className="btn-secondary" onClick={() => setModalShown(false)}>Cancel</Button>
                    <DeleteBtn type="post" id={id} />
                </div>
            </div>
        </div>
        ) : null}
        <Container className="mt-4">
        <h2>Edit Blog Post</h2>
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
                <Editor apiKey={apiKey}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={initialContent}
                init={{
                    height: 500,
                    menubar: true,
                    plugins:
                    'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
                    image_list: [
                    {title: 'My image 1', value: 'https://www.example.com/my1.gif'},
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Ex: react, coding challenges, career" value={tags} onChange={ (e) => setTags(e.target.value) } required />
            </Form.Group>
            </Form>
            <Link className="btn btn-primary" to="/">Cancel</Link>
            <Button onClick={(e) => handleUpdatePost(e, id)} className="btn-secondary mx-2">Save</Button>
            <Button className="btn btn-primary" onClick={showModal}>Delete</Button>
        </Container>
        </>
    )   
}

export default UpdatePost;