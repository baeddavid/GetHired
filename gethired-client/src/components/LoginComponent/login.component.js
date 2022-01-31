import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import styles from "./LoginComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import { faKey } from "@fortawesome/fontawesome-free-solid";


import AuthService from "../../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    console.log(this.props);
                    this.props.navigation("/");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div className={styles.background}>
                <div className="container col-xs-1" align="center" id={styles.center}>
                    <div className={styles.userCard}>
                        <div>
                            <div className="d-flex justify-content-center">
                                <h2 className={styles.title} style={{ color: "white" }}>GetHired</h2>
                            </div>
                        </div>
                        <Form
                            onSubmit={this.handleLogin}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span className={`input-group-text ${styles.icon}`}>
                                        <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
                                    </span>
                                </div>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    validations={[required]}
                                    placeholder="Username or Email"
                                />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-append">
                                    <span className={`input-group-text ${styles.icon}`}>
                                        <FontAwesomeIcon icon={faKey} style={{ color: "white" }} />
                                    </span>
                                </div>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required]}
                                    placeholder="Password"
                                />
                            </div>
                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button className="btn btn-success" id={styles.button}>Log in</button> <br />
                            </div>
                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
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
                        <div className="mt-4">
                            <div className="d-flex justify-content-center links">
                                Don't have an account? 
                            </div>
                            <div className="d-flex justify-content-center links">
                                <Link to="/signup">
                                    <div className="ml-2" style={{ color: "white" }}>
                                        Sign Up
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}