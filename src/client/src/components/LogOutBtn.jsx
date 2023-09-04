import Button from "react-bootstrap/esm/Button";

function LogoutBtn () {

    function handleLogout () {
        localStorage.removeItem("token");
        console.log("logged out");
        console.log(localStorage.getItem("token"));
    }

    return (
        <Button onClick={handleLogout}>Log Out</Button>
    )
}

export default LogoutBtn;