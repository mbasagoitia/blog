import Card from 'react-bootstrap/Card';

function Comment ({ comment }) {
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
    </Card>
    </> 
    )

}

export default Comment;