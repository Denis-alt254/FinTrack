import API from "./api"

export const RegisterUser = async(data) => {
    const res = await API.post('/users/register', data);
    return res.data;
}

export const Loginuser = async(data) => {
    const res = await API.post('/users/login', data);
    return res.data;
}

export const GetAllUsers = async() => {
   return await API.get('/users/');
}