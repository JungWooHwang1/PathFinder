import React from 'react';
import { Link } from 'react-router-dom';

const PF_Header = () => {
    return (
        <header class="PF_header">
            <Link to= "/"><img src="" alt="main logo" /></Link>
            <div class="search_area">
                <form class="serch-box" action="" method="get">
                    <input class="search_txt" type="search" title="검색어를 입력해 주세요." placeholder="검색어를 입력해 주세요." maxlength="255" autocomplete="off" data-atcmp-element></input>
                </form>
            </div>
        </header>
    );
};

export default PF_Header;
