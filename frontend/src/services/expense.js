import API from "./api"

export const GetAllExpense = async() => {
    return await API.get('/expense/');
}

export const AddExpense = async(data) => {
    const res = await API.post('/expense/', data);
    return res.data;
}

export const EditExpense = async(id, data) => {
    const res = await API.put(`/expense/${id}`, data);
    return res.data;
}

export const DeleteExpense = async(id) => {
    return await API.delete(`/expense/${id}`);
}

export const FilterExpense = async(category) => {
    return await API.post(`/expense/filter/${category}`);
}