import React, { Component } from 'react';

import './Register.styles.scss';

interface MyState {
    email?: string,
    password?: string,
    confirmPassword?: string,
};

class Register extends Component<MyState> {
    state = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    handleSubmit = async (event: any) => {
        event.preventDefault();
    }
    handleChange = (event: { target: { value: any; name: any; } }) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    render() {
        const { email, password, confirmPassword }: MyState = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <div className="group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            required
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={this.handleChange}
                            required
                        />
                        <div className="buttons">
                            <button type="submit">Sign up</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Register;