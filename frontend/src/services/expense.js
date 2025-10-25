import API from "./api"

export const GetAllExpense = async() => {
    return await API.get('/');
}

export const AddExpense = async(data) => {
    const res = await API.post('/', data);
    return res.data;
}

export const EditExpense = async(id, data) => {
    const res = await API.put(`/${id}`, data);
    return res.data;
}

export const DeleteExpense = async(id) => {
    return await API.delete(`/${id}`);
}

export const FilterExpense = async(category) => {
    return await API.post(`/filter/${category}`);
}