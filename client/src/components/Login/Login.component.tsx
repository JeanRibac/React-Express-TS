import React, { Component } from 'react';
import './Login.styles.scss';


interface MyProps {

};
interface MyState {
    email?: string,
    password?: string
};

class Login extends Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }
    handleSubmit = async (event: any) => {
        event.preventDefault();

    }
    handleChange = (event: { target: { value: any; name: any; }; }) => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }
    render() {
        const { email, password }: MyState = this.state
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>

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
                        <div className="buttons">
                            <button type="submit">Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Login;