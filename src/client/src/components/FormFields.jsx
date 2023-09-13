import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import BackBtn from "./BackBtn";
import TextEditor from "../components/TextEditor";

function FormFields ({ title, setTitle, description, setDescription, editorRef, initialValue, tags, setTags, handleSubmit, id }) {

    const [apiKey, setApiKey] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/api-key")
        .then((res) => res.json())
        .then((data) => setApiKey(data.apiKey))
        .catch((err) => console.error(err));
    }, [])

    return (
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
                <TextEditor apiKey={apiKey} editorRef={editorRef} initialValue={initialValue} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Ex: react, coding challenges, career" value={tags} onChange={ (e) => setTags(e.target.value) } required />
            </Form.Group>
            <BackBtn />
            <Button onClick={(e) => handleSubmit(e, id ? id : null)} type="submit" className="btn-secondary mb-2 mx-2">Save</Button>
        </Form>
    )
}

export default FormFields;