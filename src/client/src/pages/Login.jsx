import { useState } from "react";

function Login () {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)

            })
            if (res.ok) {
                // redirect
                console.log("login successful");
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
                <Form.Control type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginFormPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
            </Form.Group>
            <Button type="submit" onClick={() => handleSubmit}>
                Create Account
            </Button>
        </Form>
        </>
    )
}

export default Login;