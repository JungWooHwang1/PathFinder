import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/PF_SigninForm.css";
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false);


  const navigate = useNavigate();

  const handleLogin = async (event) => {

    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));

    const response = await fetch(
      "http://172.16.4.43:8085/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const result = await response.json();

    if (response.status === 200) {
      setLoginCheck(false);
      // Store token in local storage
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("email", result.email);
      sessionStorage.setItem("role", result.role);
      sessionStorage.setItem("storeid", result.storeId);
      console.log("로그인성공, 이메일주소:" + result.email);
      navigate("/");
    } else {
      setLoginCheck(true);
    }
  };


  return (
    <div className="container">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <label style={{ color: "red" }}>이메일 혹은 비밀번호가 틀렸습니다.</label>
            )}
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button onClick={handleLogin}>login</button>

          <div className="register-link">
            <p>
              <Link to="/PF_SignupForm">아직 회원이 아니신가요?</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
