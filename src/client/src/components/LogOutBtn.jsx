import Button from "react-bootstrap/esm/Button";

function LogoutBtn ({ setUser }) {

    function handleLogout () {
        localStorage.removeItem("token");
        console.log("logged out");
        setUser(null);
    }

    return (
        <Button onClick={handleLogout} id="log-out-btn">Log Out</Button>
    )
}

export default LogoutBtn;