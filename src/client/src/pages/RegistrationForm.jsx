import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";

function RegistrationForm () {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [activeEmail, setActiveEmail] = useState(false);

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [activePassword, setActivePassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validPassword) {
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
                    navigate(-1);
                    console.log("Registration successful")
                } else {
                    console.error("Registration failed")
                }
            } catch (err) {
                console.error(err);
            }
        }

    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
        const isMinLength = password.length >= 8;

        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isMinLength;
    }

    return (
        <>
        <Container className="p-5">
            <h1 className="mb-4">Create Account</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address {validEmail ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" className={activeEmail ? "" : "d-none"} viewBox="0 0 16 16">
                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                    </svg>
                     :<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#DC3545" className={activeEmail ? "" : "d-none"} viewBox="0 0 16 16">
                     <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                     </svg>}</Form.Label>
                    <Form.Control type="email" className="mb-1" placeholder="Enter email" value={email} onChange={(e) => {
                        setActiveEmail(true);
                        setEmail(e.target.value);    
                        setValidEmail(validateEmail(email));
                    }} required />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password {validPassword ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" className={activePassword ? "" : "d-none"} viewBox="0 0 16 16">
                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                    </svg>
                     :<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#DC3545" className={activePassword ? "" : "d-none"} viewBox="0 0 16 16">
                     <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                     </svg>}
                    </Form.Label>
                    <Form.Control type="password" className="mb-2" placeholder="Password" value={password} onChange={(e) => {
                        setActivePassword(true);
                        setPassword(e.target.value);    
                        setValidPassword(validatePassword(password));
                    }} required/>
                    <Form.Text className="text-muted">
                    Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.
                    </Form.Text>
                    <Form.Text className="text-muted d-block">
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