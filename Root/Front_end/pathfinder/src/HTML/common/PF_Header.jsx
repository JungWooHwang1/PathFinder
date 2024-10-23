import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../common/userContext'; // UserContext에서 훅 가져오기

const PF_Header = () => {
    const { user, login, logout } = useUser(); // UserContext에서 사용자 정보 및 함수 가져오기
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // 로그아웃 핸들러
    const handleLogout = () => {
        logout(); // UserContext의 logout 함수 호출
        navigate("/"); // 메인 페이지로 리다이렉트
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        } else {
            alert("검색어를 입력해주세요.");
        }
    };

    return (
        <header className="PF_header">
            <Link to="/">
                <img src="" alt="main logo" />
            </Link>
            <div className="search_area">
                <form className="search-box" onSubmit={handleSearch} method="get">
                    <input
                        className="search_txt"
                        type="search"
                        title="검색어를 입력해 주세요."
                        placeholder="검색어를 입력해 주세요."
                        maxLength="255"
                        autoComplete="off"
                        data-atcmp-element
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
            </div>
            <div className="PF_member">
                <div className="PF_member_ch">
                    {user ? ( // 사용자 정보가 있으면 로그인 상태로 간주
                        <>
                            <Link to="/" onClick={handleLogout}>로그아웃</Link>
                            <Link to="/member/edit">회원수정</Link>
                        </>
                    ) : (
                        <Link to="/PF_SigninForm">로그인</Link>
                    )}
                </div>
                <Link to="/PF_SignupForm">회원가입</Link>
            </div>
        </header>
    );
};

export default PF_Header;
