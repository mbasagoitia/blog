import Card from 'react-bootstrap/Card';

function Comment ({ comment }) {
    return (
    <>
    <Card body className="card-body">
        <Card.Title>{comment.user.username}</Card.Title>
        <Card.Text className="text-muted">{comment.createdAt}</Card.Text>
        <Card.Text>{comment.comment}</Card.Text>
    </Card>;   
    </> 
    )

}

export default Comment;