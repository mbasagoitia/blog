import Button from "react-bootstrap/esm/Button";

function DeleteBtn ({ id, adminToken }) {

    const handleDeletePost = (id) => {
        const apiUrl = `http://localhost:8080/api/delete/${id}`;
        
        fetch(`${apiUrl}?token=${adminToken}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
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