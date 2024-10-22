import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/PF_SignupForm.css";
import { FaUser, FaLock } from "react-icons/fa";

const SignupForm = () => {
  
  const [username, setUsername] = useState("");               // memberId에 대응
  const [userNickname, setUserNickname] = useState("");       // memberNickName에 대응
  const [password, setPassword] = useState("");               // memberPw에 대응
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인용

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    const payload = {
      "memberId": username,
      "memberPw": password,
      "memberNickName": userNickname,
    };
  
    console.log("전송할 데이터:", payload); // 전송할 데이터 확인
  
    try {
      // URL 수정: fetch 요청 시 프로토콜이 포함된 절대 경로로 수정
      const response = await fetch("/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    
      const responseBody = await response.text(); // 응답을 텍스트로 가져옴
    
      if (response.ok) {
        const data = JSON.parse(responseBody); // JSON으로 변환
        console.log("회원가입 성공! 아이디: " + data.memberId);
        alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
        navigate("/");
      } else {
        console.error("회원가입 실패:", responseBody);
        alert("회원가입 실패: 서버 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("요청 전송 후 응답 없음:", error);
      alert("응답을 받지 못했습니다. 네트워크를 확인해 주세요.");
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
                placeholder="Nickname"
                value={userNickname}
                onChange={(e) => setUserNickname(e.target.value)}
                required
              />
              <FaUser className="icon" />
            </div>
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
