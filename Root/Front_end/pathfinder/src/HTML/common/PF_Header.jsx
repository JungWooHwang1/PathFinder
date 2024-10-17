import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const PF_Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // 로그아웃 핸들러
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("role");
        setIsLoggedIn(false);
        navigate("/");
    };

    // 컴포넌트가 마운트될 때 로그인 상태를 확인
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            // 검색어가 비어 있지 않다면 검색 결과 페이지로 이동
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
                    {isLoggedIn ? (
                        <>
                            {/* 로그인 상태일 때는 로그아웃 버튼과 회원 수정 링크를 표시 */}
                            <Link onClick={handleLogout}>로그아웃</Link>
                            <Link to="/member/edit">회원수정</Link>
                        </>
                    ) : (
                        <>
                       
                        <Link to="/PF_SigninForm">
                            로그인
                        </Link>
                        </>
                    )}
                </div>
                <>
                {/* 회원가입 링크는 항상 보이도록 수정 */}
                <Link to="/PF_SignupForm">회원가입</Link>
                </>
            </div>
        </header>
    );
};

export default PF_Header;
