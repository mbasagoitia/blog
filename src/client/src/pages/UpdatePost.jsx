import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Modal from "../components/Modal";
import FormFields from "../components/FormFields";

function UpdatePost() {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [initialContent, setInitialContent] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [modalShown, setModalShown] = useState(false);

    useEffect(() => {
        const apiUrl = `http://localhost:8080/api/singlepost/${id}`;
        const fetchSinglePost = async () => {
            try {
                const res = await fetch(apiUrl);
                if (res.ok) {
                    const data = await res.json();
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

    const handleUpdatePost = (id) => {
        
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


    return (
        <>
        {modalShown ? (
            <Modal setModalShown={setModalShown} id={id} />
        ) : null}
        <Container className="mt-4">
        <h2>Edit Blog Post</h2>
            <FormFields title={title} setTitle={setTitle} description={description} setDescription={setDescription} editorRef={editorRef} initialValue={initialContent} tags={tags} setTags={setTags} />
            <Link className="btn btn-primary" to="/">Cancel</Link>
            <Button onClick={() => handleUpdatePost(id)} className="btn-secondary mx-2">Save</Button>
            <Button className="btn btn-primary" onClick={() => {
                window.scrollTo(0, 0);
                setModalShown(true);
                }}>Delete</Button>
        </Container>
        </>
    )   
}


export default UpdatePost;