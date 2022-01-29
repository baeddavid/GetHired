import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:5000/api/user/";
const API_URL2 = "http://localhost:5000/api/users/";
const API_URL3 = "http://localhost:5000/api/";

class UserService {
    createNewJob(jobListingName, link, company, referral, status, tags, jobLength) {
        return axios
            .post(API_URL3 + "jobs", {
                jobListingName,
                link,
                company,
                referral,
                status,
                tags,
                jobLength
            }, { headers: authHeader() });
    }

    getUserJobs(username) {
       return axios.get(API_URL2 + username + "/jobs", { headers: authHeader() });
    }

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