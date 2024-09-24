import React from 'react';
import { Link } from 'react-router-dom';

const PF_Header = () => {
    return (
        <header class="PF_header">
            <Link to="/"><img src="" alt="main logo" /></Link>
            <div class="search_area">
                <form class="serch-box" action="" method="get">
                    <input class="search_txt" type="search" title="검색어를 입력해 주세요." placeholder="검색어를 입력해 주세요." maxlength="255" autocomplete="off" data-atcmp-element></input>
                </form>
            </div>
            <div className="member">
                <Link to="/PF_SigninForm">로그인</Link>
                <Link to="/PF_SignupForm">회원가입</Link>
                <Link to=""></Link>
            </div>
        </header>
    );
};

export default PF_Header;
