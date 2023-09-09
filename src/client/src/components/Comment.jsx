import Card from 'react-bootstrap/Card';
import DeleteBtn from './DeleteBtn';

function Comment ({ comment, commentCount, setCommentCount, user }) {
    const createdAtDateStr = new Date(comment.createdAt);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = createdAtDateStr.toLocaleDateString(undefined, options);
    comment.createdAt = formattedDate;

    return (
    <>
    <Card body className="card-body mb-2">
        <Card.Title>{comment.user.username}</Card.Title>
        <Card.Text className="text-muted">{comment.createdAt}</Card.Text>
        <Card.Text>{comment.comment}</Card.Text>
        {(user && user.username === comment.user.username) || (user && user.role === "admin") ? (
         <DeleteBtn type="comment" id={comment._id} commentCount={commentCount} setCommentCount={setCommentCount} />   
        ): null}
    </Card>
    </> 
    )

}

export default Comment;