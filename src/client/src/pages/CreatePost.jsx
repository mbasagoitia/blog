import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import BackBtn from "../components/BackBtn";
import FormFields from "../components/FormFields";


function CreatePost({ user }) {

    const token = localStorage.getItem("token");
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    const handleCreatePost = () => {

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
            <FormFields title={title} setTitle={setTitle} description={description} setDescription={setDescription} editorRef={editorRef} initialValue="" tags={tags} setTags={setTags} />
            <BackBtn />
            <Button onClick={() => handleCreatePost()} className="btn-secondary mb-2 mx-2">Save</Button>
        </Container>
        </>
    )
}

export default CreatePost;