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

export const deleteUser = async(id)=>{
    try {


        const res = await axios.delete(`${baseURL}api/users/delete/${id}` )
        
        return res;
    } catch (error) {
        return null;
    }
}

export const promoteToAdmin = async(id, role)=>{
    try {
        
        const res = await axios.put(`${baseURL}api/users/update/${id}`, {role: "admin"});
        return res;
    } catch (error) {
        return null;
    }
}

export const demoteToMember = async(id, role)=>{
    try {
        const res = await axios.put(`${baseURL}api/users/update/${id}`, {role: "member"});
        return res;
    } catch (error) {
        return null;
    }
}