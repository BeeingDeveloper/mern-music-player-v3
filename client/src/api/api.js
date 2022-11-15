import axios from 'axios'

const baseURL = 'http://localhost:5500/';

export const validateUser = async(token)=>{
    try {
        const res = await axios.get(`${baseURL}api/users/login/`,{
            headers: { Authorization: "Bearer "+token}
        });
        return res.data;
    } catch (error) {
        
    }
}

export const fetchAllUsers = async()=>{
    try {
        const res = await axios.get(`${baseURL}api/users/get-users`);
        return res.data
    } catch (error) {
        return null;
    }
}
