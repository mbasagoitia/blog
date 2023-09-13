import { useNavigate } from "react-router-dom";

function DeleteBtn ({ type, id, commentCount, setCommentCount }) {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleDelete = (type, id) => {

        const apiUrl = `http://localhost:8080/api/delete/${type}/${id}`;
        
        fetch(apiUrl, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": token },
        })
        .then((res) => {
            if (res.ok) {
                console.log(`${type} deleted successfully`);
                if (type === "post") {
                    navigate("/");
                } else if (type === "comment") {
                    setCommentCount(commentCount -1);
                }
            } else {
                console.error(`Error deleting ${type}`)
            }
        })
        .catch((err) => console.error(err))
    }

    return (
        <button onClick={() => handleDelete(type, id)} className="btn btn-danger">Delete</button>
    )
}

export default DeleteBtn;