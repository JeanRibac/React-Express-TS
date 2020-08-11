import React from 'react';
import Login from '../../components/Login/Login.component';
import Register from '../../components/Register/Register.component';
import './Authentication.page.styles.scss';

const AuthentincationPage = () =>(
    <div className="sign-in-and-sign-up">
        <Login/>
        <Register/>
    </div>
)
export default AuthentincationPage;