import { useState } from "react";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const handleCreatePost = () => {
        // Send API request to create a new blog post
    }

    return (
        <>
        <h2>Create New Post</h2>
        <input type="text" value={title} onChange={ (e) => setTitle(e.target.value) } />
        <textarea value={content} onChange={ (e) => setContent(e.target.value) } />
        <button onclick={handleCreatePost}>Create Post</button>
        </>
    )
}

export default CreatePost;