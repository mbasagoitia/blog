import Button from "react-bootstrap/esm/Button";

function DeleteBtn ({ id }) {

    const token = localStorage.getItem("token");

    const handleDeletePost = (id) => {
        // make this more reusable by passing in a type of post or comment
        // useNavigate to either the homepage (post) or the post (comment)
        // style the pages as viewed when logged out

        const apiUrl = `http://localhost:8080/api/delete/${id}`;
        
        fetch(apiUrl, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": token },
        })
        .then((res) => {
            if (res.ok) {
                console.log("Post deleted successfully");
            } else {
                console.error("Error deleting post")
            }
        })
        .catch((err) => console.error(err))
    }

    return (
        <Button onClick={() => handleDeletePost(id)} >Delete</Button>
    )
}

export default DeleteBtn;