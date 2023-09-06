import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import BackBtn from "../components/BackBtn";

function RegistrationForm () {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                email,
                username,
                password
            }
            const res = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                // redirect to login page
                console.log("Registration successful")
            } else {
                console.error("Registration failed")
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <Container className="p-5">
            <h1 className="mb-4">Create Account</h1>
        <Form>
        <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <Form.Text className="text-muted">
            Already have an account? Log in <Link to="/login">here</Link>
            </Form.Text>
        </Form.Group>
        <BackBtn />
        <Button type="submit" onClick={handleSubmit} className="btn btn-secondary mb-2 mx-2">
            Create Account
        </Button>
        </Form>
        </Container>
        </>
    )
}

export default RegistrationForm;