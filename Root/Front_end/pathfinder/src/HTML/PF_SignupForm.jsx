import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../CSS/PF_SignupForm.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [action, setAction] = useState('');

    const navigate = useNavigate();

    //비밀번호 체크
    const handleSignup = async (event) => {
        event.preventDefault();

        if (password != confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const payload = {
            email: email,
            password: password,
            nickname: userNickname,
            name: username,
            phone: phoneNumber,
            role: role,
        };

        try {
            const response = await fetch(
                "http://172.16.4.43:8085/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            if (response.status === 200) {
                console.log("성공! 이메일주소: " + data.email);
                navigate("/login"); // 로그인 성공시 홈으로 이동합니다.
            } else if (response.status === 400) {

                alert(`회원가입 실패: ${data.email}`);
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    }
    const registerLink = () => {
        setAction('active');
    };

    return (
        <div className="container">
            <div className={`wrapper${action}`}>
                <div className="form-box register">
                    <form className="signup-form" onSubmit={handleSignup}>
                        <h1>Register</h1>
                        <div className="input-box">
                            <input type="text" placeholder='Username' value={username}
                                onChange={(e) => setUsername(e.target.value)} required />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder='Email' value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='password' value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                            <FaLock className="icon" />
                        </div>
                        <div className="input-box">

                            <input type="password" placeholder='confirm-password' value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                            {/* <label htmlFor="confirm-password">비밀번호 확인</label> */}
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" />I agree to the terms & conditions</label>
                            <a href="#">Forgt password?</a>
                        </div>

                        <button id="signup-button" onClick={handleSignup}>
                            회원가입
                        </button>

                        <div className="register-link">
                            <p>
                                <Link to="/PF_SigninForm" onClick={registerLink}> Already have an account?</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div >
        </div>

    );
};

export default SignupForm