import API from "./api"

export const SetBudget = async(data) => {
    const res = await API.post('/budget/', data);
    return res.data;
}

export const CheckBudgetUsage = async() => {
    return await API.get('/budget/');
}