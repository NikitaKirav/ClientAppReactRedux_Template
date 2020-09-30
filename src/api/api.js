import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://3.120.34.31:1550/api/',
});

export const blogAPI = {
    getArticles() {
        return instance.get(`blog/getArticles`).then(responce => {
            return responce.data;
        });
    }
}