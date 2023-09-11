import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BackBtn from "../components/BackBtn";

import React, { useRef } from 'react';
import tinymce from 'tinymce/tinymce'
import { Editor } from '@tinymce/tinymce-react';

function CreatePost({ user }) {

    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };

    // const token = localStorage.getItem("token");
    // const navigate = useNavigate();

    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [content, setContent] = useState("");
    // const [tags, setTags] = useState("");

    // const handleCreatePost = () => {

    //     if (title && description && content) {
    //         const apiUrl = "http://localhost:8080/api/new";
    //         const postData = {
    //             title: title,
    //             author: user.username,
    //             description: description,
    //             content: content,
    //             createdAt: Date.now(),
    //             tags: tags
    //         };
    
    //         fetch(apiUrl, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json", "Authorization": token },
    //             body: JSON.stringify(postData)
    //         })
    //         .then((res) => {
    //             if (res.ok) {
    //                 console.log("Post created successfully");
    //                 navigate(-1);
    //             } else {
    //                 console.error("Error creating post")
    //             }
    //         })
    //         .catch((err) => console.error(err))
    //     }

    // }

    return (
        <>
        {/* <Container className="mt-4">
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
                <Form.Control as="textarea" rows={3} value={content} onChange={ (e) => { setContent(e.target.value)} } required={true} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Ex: react, coding challenges, career" value={tags} onChange={ (e) => setTags(e.target.value) } />
            </Form.Group>
            <BackBtn />
            <Button onClick={handleCreatePost} type="submit" className="btn-secondary mb-2 mx-2">Save</Button>
            </Form>
        </Container> */}
              <Editor apiKey='k7n2yaa9ns5vqo3n4rjjw4om7bjrgj6eu6d2ccqc5j6wsrld'
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="<p>This is the initial content of the editor.</p>"
         init={{
           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           image_list: [
            {title: 'My image 1', value: 'https://www.example.com/my1.gif'},
            {title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif'}
          ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
       <button onClick={log}>Log editor content</button>
        </>
    )
}

export default CreatePost;