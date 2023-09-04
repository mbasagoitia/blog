import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import UpdateButton from "./UpdateButton";

function PostCard ({ post }) {
    return (
        <Card body className="mb-2">
        <Card.Title className="mb-2">{post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{post.description}</Card.Subtitle>
        <Link to={`/${post._id}`} className="btn btn-primary mb-2">Read More</Link>
        { /* change to isAdmin */ }
        {true ? (
        <UpdateButton post={post} className="mb-2" />
        ) : null}
        <Card.Text className="mb-2">{post.tags ? post.tags.join(", ") : null}</Card.Text>
        </Card>
    )
}

export default PostCard;