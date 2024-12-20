import axios from "axios";

export const customAxios = axios.create({
    baseURL: 'https://todo.timurbek-saburov.space',
    headers: {
        'Content-Type': 'application/json'
    }
})