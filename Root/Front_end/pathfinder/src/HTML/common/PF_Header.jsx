import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../common/userContext'; // UserContext에서 훅 가져오기
import mainLogo from "../../img/main_logo.png";
import { HiMagnifyingGlass } from "react-icons/hi2";
import "../../CSS/PF_Header.css";

const PF_Header = () => {
    const { user, login, logout } = useUser(); // UserContext에서 사용자 정보 및 함수 가져오기
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false); // 검색창 표시 여부 상태
    const searchInputRef = useRef(null); // 검색창 input 요소에 대한 ref 생성
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

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible); // 검색창 표시 여부 토글
        if (!isSearchVisible) {
            setTimeout(() => {
                searchInputRef.current.focus(); // 검색창으로 포커스 이동
            }, 300); // 애니메이션 시간과 일치시킴
        }
    };

    return (
        <header className="PF_header">
            <Link to="/">
                <img src={mainLogo} alt="main logo" width={150} height={70} />
            </Link>
            <div className={`search_area ${isSearchVisible ? 'visible' : ''}`}>
                <form className="search-box" onSubmit={handleSearch} method="get">
                    <input
                        type="search"
                        placeholder="검색어를 입력해 주세요."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        ref={searchInputRef} // input 요소에 ref 설정
                    />
                </form>
            </div>
            <div className="header_right">
                <HiMagnifyingGlass onClick={toggleSearch} className="search-icon" />
                <div className="PF_member">
                    <div className="PF_member_ch">
                        {user ? ( // 사용자 정보가 있으면 로그인 상태로 간주
                            <>
                                <Link to="/" onClick={handleLogout}>로그아웃</Link>
                                <Link to="/member/edit">내 정보 보기</Link>
                            </>
                        ) : (
                            <Link to="/PF_SigninForm">로그인</Link>
                        )}
                    </div>
                    <Link to="/PF_SignupForm">회원가입</Link>
                </div>
            </div>
        </header>
    );
};

export default PF_Header;