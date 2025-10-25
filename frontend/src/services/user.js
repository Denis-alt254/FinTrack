import API from "./api"

export const RegisterUser = async(data) => {
    const res = await API.post('/register', data);
    return res.data;
}

export const Login = async(data) => {
    const res = await API.post('/login', data);
    return res.data;
}

export const GetAllUsers = async() => {
   return await API.get('/');
}