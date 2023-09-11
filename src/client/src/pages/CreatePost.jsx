import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BackBtn from "../components/BackBtn";
import { Editor } from '@tinymce/tinymce-react';

function CreatePost({ user }) {

    const editorRef = useRef(null);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [apiKey, setApiKey] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
      fetch("http://localhost:8080/api/api-key")
      .then((res) => res.json())
      .then((data) => setApiKey(data.apiKey))
      .catch((err) => console.error(err));
  }, [])

    const handleCreatePost = (e) => {
      e.preventDefault();

      if (editorRef.current) {
        let htmlContent = editorRef.current.getContent();
        setContent(htmlContent);
      }

        if (title && description && content) {
            const apiUrl = "http://localhost:8080/api/new";
            const postData = {
                title: title,
                author: user.username,
                description: description,
                content: content,
                createdAt: Date.now(),
                tags: tags
            };
    
            fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": token },
                body: JSON.stringify(postData)
            })
            .then((res) => {
                if (res.ok) {
                    console.log("Post created successfully");
                    navigate(-1);
                } else {
                    console.error("Error creating post")
                }
            })
            .catch((err) => console.error(err))
        }

    }

    return (
        <>
        <Container className="mt-4">
        <h2>New Blog Post</h2>
            <Form>
            <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" value={title} onChange={ (e) => setTitle(e.target.value) } required={true} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" value={description} onChange={ (e) => setDescription(e.target.value) } required={true} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
            <Editor apiKey={apiKey}
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue=""
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
                <Form.Control type="text" placeholder="Ex: react, coding challenges, career" value={tags} onChange={ (e) => setTags(e.target.value) } />
            </Form.Group>
            <BackBtn />
            <Button onClick={(e) => handleCreatePost(e)} type="submit" className="btn-secondary mb-2 mx-2">Save</Button>
            </Form>
        </Container>
        </>
    )
}

export default CreatePost;