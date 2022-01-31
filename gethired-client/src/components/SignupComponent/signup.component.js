import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import styles from "./SignupComponent.module.css";
import { isEmail } from "validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUser, faEnvelope, faKey } from "@fortawesome/fontawesome-free-solid";

import AuthService from '../../services/auth.service';

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className={styles.urgent}>
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className={styles.urgent}>
        Username must be 3 - 20 characters
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className={styles.urgent}>
        Password must be 6 - 40 characters
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  isFormValid() {
    return !(
      this.state.name &&
      this.state.email &&
      this.state.username &&
      this.state.password !== ""
    );
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.name,
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message, 
            successful: true  
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    let submit = this.isFormValid() ?
      <button disabled="true" className="btn btn-danger">Sign Up!</button> :
      <button className="btn btn-success">Sign Up!</button>;

    let success = <Link path="/login">Go ahead and log in now!</Link>
    return (
      <div className={styles.background}>
        <div className="container h-100">
          <div className="d-flex justify-content-center h-100">
            <div className={styles.userCard1}>
              <h2 className={styles.title} style={{ color: "white" }}>Sign Up</h2>
              <div className="d-flex justify-content-center form-container">
                <Form className="form-group mb-0"
                  onSubmit={this.handleRegister}
                  ref={c => {
                    this.form = c;
                  }}>
                  {!this.state.successful && (
                    <div>
                      <div className="input-group mb-3">
                        <div className="input-group-append">
                          <span className={`input-group-text ${styles.icon}`}>
                            <FontAwesomeIcon icon={faUser} style={{ color: "black" }} />
                          </span>
                        </div>
                        <Input
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChangeName}
                          placeholder="Name"
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-append">
                          <span className={`input-group-text ${styles.icon}`}>
                            <FontAwesomeIcon icon={faSignInAlt} tyle={{ color: "black" }} />
                          </span>
                        </div>
                        <Input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          validations={[vusername]}
                          placeholder="Username"
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-append">
                          <span className={`input-group-text ${styles.icon}`}>
                            <FontAwesomeIcon icon={faEnvelope} tyle={{ color: "black" }} />
                          </span>
                        </div>
                        <Input
                          type="text"
                          className="form-control"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          validations={[email]}
                          placeholder="Email"
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-append">
                          <span className={`input-group-text ${styles.icon}`}>
                            <FontAwesomeIcon icon={faKey} tyle={{ color: "black" }} />
                          </span>
                        </div>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[vpassword]}
                          placeholder="Password"
                        />
                      </div>
                      <div className="d-flex justify-content-center mt-3 login_container">
                        {submit}
                      </div>
                    </div>
                  )}

                  {this.state.message && (
                    <div className="form-group">
                      <div
                        className={
                          this.state.successful
                            ? "alert alert-success"
                            : `${styles.urgent}`
                        }
                        role="alert"
                      >
                          {this.state.successful ? <Link to="/login">Go ahead and login now!</Link> : this.state.message}
                      </div>
                    </div>
                  )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}