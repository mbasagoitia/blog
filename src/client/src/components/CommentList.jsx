import { useState, useEffect } from "react";
import Comment from "./Comment";

function CommentList({ postId, commentCount, setCommentCount }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const apiUrl = `http://localhost:8080/api/comments/${postId}`;
        const fetchComments = async () => {
            try {
                const res = await fetch(apiUrl);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data.comments);
                    setCommentCount(data.comments.length);
                } else {
                    console.error("Error fetching comments");
                }
            } catch(err) {
                console.error(err);
            }
        }
        
        fetchComments();
    }, [postId, commentCount]);

    return (
        <>
        {comments.length > 0 ? (
            <>
            <span>Comments: ({commentCount})</span>
            <ul>
                {comments.map((comment) => {
                return <Comment key={comment._id} comment={comment} />
                })}
            </ul>
            </>
        ) : null }
        </>
    )
}

export default CommentList;