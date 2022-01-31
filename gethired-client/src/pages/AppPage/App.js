import logo from './logo.svg';
import './App.css';
import { React, Component } from 'react';
import { Routes , Route, Link } from "react-router-dom";
import LoginHook from '../../components/LoginComponent/Login.hook';
import Signup from "../../components/SignupComponent/signup.component";
import UserJobs from "../../components/UserJobsComponent/UserJobs.component";
import JobForm from "../../components/JobComponent/NewJob.component";
import NewJobHook from '../../components/JobComponent/NewJob.hook';
import EditJobHook from '../../components/EditComponent/EditJob.hook';

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      username: undefined,
    }
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    const userName = UserService.getUserInfo();
    if(user) {
      this.setState({
        currentUser: user,
        username: UserService.getUsername().username
      });
    }
  }

  render() {
    let userJobs;
    if(this.state.username) {
      userJobs = <UserJobs username={this.state.username}/>;
    } else {
      userJobs = null;
    }
    return(
        <Routes>
          <Route path="login" element={<LoginHook />} />
          <Route path="signup" element={<Signup />} />
          <Route path="jobs" element={userJobs} />
          <Route path="create_job" element={<JobForm />} />
          <Route path="edit_job/:jobId" element={<EditJobHook/>} />
        </Routes>
    )
  }
}

export default App;
