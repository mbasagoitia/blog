import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login () {
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
                // redirect
            } else {
                console.error("Login failed")
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <Form>
            <Form.Group className="mb-3" controlId="loginFormEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginFormPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </Form.Group>
            <Button type="submit" onClick={handleSubmit}>
                Login
            </Button>
        </Form>
        </>
    )
}

export default Login;