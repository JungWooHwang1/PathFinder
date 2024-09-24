import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const PF_Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logoutMessage, setLogoutMessage] = useState(""); // 로그아웃 메시지 상태
    const navigate = useNavigate();

    // 로그아웃 핸들러
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("role");
        setIsLoggedIn(false);
        navigate("/");
        // setLogoutMessage("로그아웃 되었습니다."); // 로그아웃 메시지 설정
        // // setTimeout(() => {
        // //     setLogoutMessage(""); // 일정 시간 후 메시지 제거
        // //     navigate("/"); // 메인 페이지로 리다이렉션
        // // }, 1000); // 2초 후에 메인 페이지로 이동
    };

    // 컴포넌트가 마운트될 때 로그인 상태를 확인
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <header className="PF_header">
            <Link to="/">
                <img src="" alt="main logo" />
            </Link>
            <div className="search_area">
                <form className="serch-box" action="" method="get">
                    <input
                        className="search_txt"
                        type="search"
                        title="검색어를 입력해 주세요."
                        placeholder="검색어를 입력해 주세요."
                        maxLength="255"
                        autoComplete="off"
                        data-atcmp-element
                    />
                </form>
            </div>
            <div className="member">
                <div>
                    {isLoggedIn ? (
                        // 로그인 상태일 때는 로그아웃 버튼을 표시
                        <button onClick={handleLogout}>로그아웃</button>
                    ) : (
                        // 로그인 상태가 아닐 때는 로그인 버튼을 표시
                        <Link to="/PF_SigninForm">
                            <button>로그인</button>
                        </Link>
                    )}
                </div>
                <Link to="/PF_SignupForm">회원가입</Link>
            </div>
            {/* {logoutMessage && <div className="logout-message">{logoutMessage}</div>} 로그아웃 메시지 표시 */}
        </header>
    );
};

export default PF_Header;
