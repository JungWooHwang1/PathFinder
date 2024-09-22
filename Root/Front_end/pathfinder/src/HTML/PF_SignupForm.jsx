import React, { useState } from "react";
import '../CSS/PF_SignupForm.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const SignupForm = () => {

    const [action, setAction] = useState('');

    const registerLink = () => {
        setAction('active');
    };

    return (
        <div className={`wrapper${action}`}>
            <div className="form-box register">
                <form action="">
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder='Email' required />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='password' required />
                        <FaLock className="icon" />
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" />I agree to the terms & conditions</label>
                        <a href="#">Forgt password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={registerLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm