import { useState } from "react";
import { GetAllUsers } from "../services/user";

export const GetUsers = () => {

    const[error, setError] = useState('')
 
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await GetAllUsers();
        } catch (error) {
            setError(error.response?.error || 'Getting all users failed.');
        }
    }
    return(
        <>
            <h1>GetAllUsers</h1>
            <div onSubmit={handleSubmit}>
                <button type="submit">GetUsers</button>
            </div>
        </>
    )
}