import logo from './logo.svg';
import './App.css';
import { React, Component } from 'react';
import { Routes , Route, Link } from "react-router-dom";
import LoginHook from '../../components/Login.hook';

import AuthService from "../../services/auth.service";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined
    }
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if(user) {
      this.setState({
        currentUser: user
      });
    }
  }

  render() {
    return(
      <div>
        <h1>Welcome to react router!</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
    <Route path="login" element={<LoginHook/>} />
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
