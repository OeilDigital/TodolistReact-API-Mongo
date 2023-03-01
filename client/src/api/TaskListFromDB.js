import axios from "axios";
import { GET_TASKLIST } from "../config/config";

// const backendUrl = 'http://localhost:3001/api/';

export async function getTaskList() {
    try {
        const user_id = sessionStorage.getItem('_id');
        const token = sessionStorage.getItem('token');
        const { data } = await axios.get(GET_TASKLIST, {
            params: { user_id: user_id },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log(data);
        return data;

    } catch (error) {
        console.log(error)
    }
}


