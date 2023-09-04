import { useState } from "react";

function RegistrationForm () {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/auth/register", {
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
        <Form>
        <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
        </Form.Group>
        <Button type="submit" onClick={ () => handleSubmit}>
            Create Account
        </Button>
        </Form>
        </>
    )
}

export default RegistrationForm;