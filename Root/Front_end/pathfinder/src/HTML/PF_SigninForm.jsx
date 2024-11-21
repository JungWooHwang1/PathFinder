import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useUser } from "./common/userContext"; // useUser import
import "../CSS/PF_SigninForm.css";

const LoginForm = () => {
  const { login } = useUser(); // UserContext에서 login 함수 가져오기
  const [username, setUsername] = useState(""); // 사용자 이름 (ID)
  const [password, setPassword] = useState(""); // 비밀번호
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 실패 체크
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true); // 로딩 시작

    try {
      const response = await fetch("/members/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: username,
          memberPw: password,
        }),
      });

      // 서버에서 JSON 응답 받기
      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("username", result.memberId);

        console.log("로그인 성공, 아이디:", result.memberId);
        setLoginCheck(false);
        login(result); // UserContext에 로그인 정보 설정
        navigate("/"); // 홈으로 리다이렉트
      } else {
        setLoginCheck(true); // 로그인 실패 시 메시지 표시
        console.error("로그인 실패:", result.message || "서버 오류");
        alert(result.message || "로그인에 실패했습니다."); // 서버 메시지를 alert로 표시
      }
    } catch (error) {
      console.error("네트워크 또는 서버 오류:", error.message);
      alert(`오류가 발생했습니다. 다시 시도해주세요: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="form-box member">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                name="username"
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
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="icon" />
              {loginCheck && (
                <label style={{ color: "red" }}>
                  아이디 혹은 비밀번호가 틀렸습니다.
                </label>
              )}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="register-link">
              <p>
                <Link to="/PF_SignupForm">아직 회원이 아니신가요?</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;