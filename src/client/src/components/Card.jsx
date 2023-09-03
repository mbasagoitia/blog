import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import UpdateButton from "./UpdateButton";

function PostCard ({ post, isAdmin }) {
    return (
        <Card body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle>{post.description}</Card.Subtitle>
        <Link to={`/${post._id}`} className="btn btn-primary">Read More</Link>
        {isAdmin ? (
        <UpdateButton post={post}/>
        ) : null}
        <Card.Text>{post.tags ? post.tags.join(", ") : null}</Card.Text>
        </Card>
    )
}

export default PostCard;