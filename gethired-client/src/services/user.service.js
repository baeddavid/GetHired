import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:5000/api/user/";

class UserService {
    getUserInfo() {
        axios.get(API_URL + "me", { headers: authHeader()})
            .then(response => {
                if(response.data.username) {
                    localStorage.setItem("username", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    getUsername() {
        return JSON.parse(localStorage.getItem("username"));
    }
}

export default new UserService();