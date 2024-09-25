import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../CSS/PF_SignupForm.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const SignupForm = () => {

    const [username, setUsername] = useState(""); // memberId에 대응
    const [userNickname, setUserNickname] = useState(""); // memberNickName에 대응
    const [password, setPassword] = useState(""); // memberPw에 대응
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인용

    const navigate = useNavigate();

    // 비밀번호 체크
    const handleSignup = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            console.error("비밀번호가 일치하지 않습니다.");
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 사용자의 입력을 기반으로 payload를 구성
        const payload = {
            memberId: username,      // 아이디는 username으로 받음
            memberPw: password,      // 비밀번호는 password로 받음
            memberNickName: userNickname, // 닉네임은 userNickname으로 받음
        };

        console.log("회원가입 요청 보냄:", payload);

        try {
            const response = await fetch(
                "http://172.16.4.43:8085/members",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            console.log("응답 데이터:", data);  // 서버에서 반환된 데이터를 확인

            if (response.status === 200) {
                console.log("회원가입 성공! 아이디: " + data.memberId);
                alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
                navigate("/login"); // 회원가입 성공시 로그인 페이지로 이동
            } else {
                console.error("회원가입 실패, 상태 코드:", response.status);
                alert(`회원가입 실패: ${data.memberId}`);
            }
        } catch (error) {
            console.error("오류 발생:", error);  // 네트워크 오류나 서버 오류 확인
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="container">
            <div className="wrapper">
                <div className="form-box member">
                    <form className="signup-form" onSubmit={handleSignup}>
                        <h1>Register</h1>
                        <div className="input-box">
                            <input type="text" placeholder='Username' value={username}
                                onChange={(e) => setUsername(e.target.value)} required />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder='Nickname' value={userNickname}
                                onChange={(e) => setUserNickname(e.target.value)} required />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Password' value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                            <FaLock className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Confirm Password' value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <label><input type="checkbox" />I agree to the terms & conditions</label>


                        <button id="signup-button" type="submit">
                            create account
                        </button>

                        <div className="register-link">
                            <p>
                                <Link to="/PF_SigninForm"> Already have an account?</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default SignupForm;
