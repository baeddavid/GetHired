import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:5000/api/";

class UserService {
    createNewJob(jobListingName, link, company, referral, status, tags, jobLength) {
        return axios
            .post(API_URL + "jobs", {
                jobListingName,
                link,
                company,
                referral,
                status,
                tags,
                jobLength
            }, { headers: authHeader() });
    }

    updateJob(jobListingName, link, company, referral, status, tags, jobLength, jobId) {
        return axios
            .put(API_URL + "jobs/" + jobId, {
                jobListingName,
                link,
                company,
                referral,
                status,
                tags,
                jobLength
            }, { headers: authHeader() });
    }

    deleteJob(jobId) {
        return axios
            .delete(API_URL + "jobs/" + jobId, { 
                headers: authHeader()
            });
    }

    getJobById(jobId) {
        return axios
            .get(API_URL + "jobs/" + jobId, { headers: authHeader() });
    }

    getUserJobs(username) {
       return axios.get(API_URL + "users/" + username + "/jobs", { headers: authHeader() });
    }

    getUserInfo() {
        axios.get(API_URL + "user/" + "me", { headers: authHeader()})
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