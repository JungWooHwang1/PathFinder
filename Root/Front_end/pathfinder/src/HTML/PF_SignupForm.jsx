import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/PF_SignupForm.css";
import { FaUser, FaLock } from "react-icons/fa";

const SignupForm = () => {
    // const [email, setEmail] = useState("");
    const [username, setUsername] = useState(""); // memberId에 대응
    const [userNickname, setUserNickname] = useState(""); // memberNickName에 대응
    const [password, setPassword] = useState(""); // memberPw에 대응
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인용

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();

        console.log("Signup form submitted."); // 폼 제출이 트리거되었는지 확인

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            console.log("비밀번호 불일치:", password, confirmPassword); // 비밀번호 불일치 로그
            return;
        }

        const payload = {
            memberId: username,
            memberPw: password,
            memberNickName: userNickname,
        };

        console.log("Payload:", payload); // payload가 올바르게 생성되었는지 확인

        // API 요청 전 로그 추가
        console.log("Sending request to the API...");

        try {
            const response = await fetch("https://c1ed-14-35-63-77.ngrok-free.app/members", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // API 응답 후 로그 추가
            console.log("API response received.");
            console.log("응답:", response);
            console.log("Response status:", response.status); // 서버로부터 받은 응답 상태 코드 확인

            // 응답을 받지 못한 경우
            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error response:", errorData); // 오류 응답 로그
                alert(`회원가입 실패: ${errorData.message || "서버 오류"}`);
                return;
            }

            const data = await response.json();
            console.log("회원가입 성공! 응답 데이터:", data); // 성공한 경우의 데이터 로그
            alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
            navigate("/");
            
        } catch (error) {
            console.error("네트워크 또는 서버 오류 발생:", error);
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="container">
            <div className="wrapper">
                <div className="form-box register">
                    <form className="signup-form" onSubmit={handleSignup}>
                        <h1>Register</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Nickname"
                                value={userNickname}
                                onChange={(e) => setUserNickname(e.target.value)}
                                required
                            />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FaLock className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />I agree to the terms & conditions
                            </label>
                            <a href="#">Forgot password?</a>
                        </div>

                        <button id="signup-button" type="submit">
                            회원가입
                        </button>

                        <div className="register-link">
                            <p>
                                <Link to="/PF_SigninForm"> Already have an account?</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
