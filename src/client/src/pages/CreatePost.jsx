import { useState } from "react";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // Add description?
    const handleCreatePost = () => {
        // Send aPI request to createa new blog post
    }

    return (
        <>
        <h2>Create New Post</h2>
        <input type="text" value={title} onChange={ (e => setTitle(e.target.value)) } />
        <textarea value={content} onChange={ (e) => setContent(e.target.value) }></textarea>
        <button onClick={handleCreatePost}>Create Post</button>
        </>
    )
}

export default CreatePost;