import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BackBtn from "../components/BackBtn";
import jwtDecode from "jwt-decode";

function Login ({ setUser }) {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                email,
                password
            }
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                console.log("login successful");
                const data = await res.json();
                const token = data.token;

                localStorage.setItem("token", token);

                const decodedToken = jwtDecode(token);
                setUser(decodedToken.user);
                window.dispatchEvent(new Event("userLogin"));
                navigate("/");
            } else {
                console.error("Login failed")
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <Container className="p-5" id="login-form">
            <h1 className="mb-4">Log In</h1>
        <Form>
            <Form.Group className="mb-3" controlId="loginFormEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginFormPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <Form.Text className="text-muted">Don't have an account? Register <Link to="/register">here</Link></Form.Text>
                </Form.Group>
            <BackBtn />
            <Button type="submit" className="mb-2 mx-2 btn btn-secondary" onClick={handleSubmit}>
                Login
            </Button>
        </Form>
        </Container>
        </>
    )
}

export default Login;