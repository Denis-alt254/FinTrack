import { useState } from "react"
import { RegisterUser } from "../services/user";

export const Register = () => {
    const [form, setForm] = useState({username: '', email: '', password: ''});
    const [error, setError] = useState("");

    const handleFormChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    } 

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const data = await RegisterUser(form);
            localStorage.setItem('token', data.token);
        } catch (error) {
            setError(error.response?.data?.error || 'Registration Failed.');
        }
    }

    return(
        <>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="username"
                placeholder="username"
                value={form.username}
                onChange={handleFormChange}
                required
                />
                <input 
                type="email" 
                name="email"
                placeholder="email"
                value={form.email}
                onChange={handleFormChange}
                required
                />
                <input 
                type="password" 
                name="password"
                placeholder="password"
                value={form.password}
                onChange={handleFormChange}
                required
                />
                {error && <p>{error}</p>}
                <button type="submit">SignUp</button>
            </form>
        </>
    )
}