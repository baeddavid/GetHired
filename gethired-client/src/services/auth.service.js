import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
    login(usernameOrEmail, password) {
        return axios
        .post(API_URL + "signin", {
            usernameOrEmail,
            password
        })
        .then(response => {
            if(response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(name, username, email, password) {
        return axios.post(API_URL + "signup", {
            name,
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();