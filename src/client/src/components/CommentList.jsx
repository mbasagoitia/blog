import { useState, useEffect } from "react";
import Comment from "./Comment";

function CommentList({ postId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const apiUrl = `http://localhost:8080/api/comments/${postId}`;
        const fetchComments = async () => {
            try {
                const res = await fetch(apiUrl);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data.comments);
                    console.log(comments);
                } else {
                    console.error("Error fetching comments");
                }
            } catch(err) {
                console.error(err);
            }
        }
        
        fetchComments();
    }, [postId]);

    return (
        <>
        {comments.length > 0 ? (
            <ul>
                {comments.map((comment) => {
                // this will need to be a separate component
                return <Comment key={comment._id} comment={comment} />
                })}
            </ul>
        ) : null }
        </>
    )
}

export default CommentList;