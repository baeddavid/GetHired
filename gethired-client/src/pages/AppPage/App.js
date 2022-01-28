import logo from './logo.svg';
import './App.css';
import { React, Component } from 'react';
import { Routes , Route, Link } from "react-router-dom";
import LoginHook from '../../components/LoginComponent/Login.hook';
import Signup from "../../components/SignupComponent/signup.component";

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
    return(
      <div>
        <h1>Welcome to react router!</h1>
        <button onClick={ () => console.log(this.state)}>Print State</button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<LoginHook />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    )
  }
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;
