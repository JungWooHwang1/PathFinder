import React from "react";
import "../CSS/PF_Main.css"

const PF_Container = () => {
    return (
        <div class = "body">
            <header class="PF_header">
                <img class ="main_logo"src="" alt="main_logo" />
                <div class="search_area">
                    <form class="serch-box" action="" method="get">
                        <input class="search_txt" type="search" title="검색어를 입력해 주세요." placeholder="검색어를 입력해 주세요." maxlength="255" autocomplete="off" data-atcmp-element></input>
                    </form>
                </div>
            </header>
            <div class="PF_container">
                <div>
                    <nav class="PF_nav">
                        <ul>
                            <li><a href="">찾아주세요!(분실물)</a></li>
                            <li><a href="">찾아가세요(습득물)</a></li>
                            <li><a href="">사라졌어요!(반려동물)</a></li>
                            <li><a href="">급해요!(현상수배)</a></li>                        </ul>
                    </nav>
                    <div class="PF_main">
                        <section class="PF_section1">
                            <a href="">습득물 게시판</a>
                            <div class="img_group">
                                <img src="" alt="unknown" />
                                <img src="" alt="unknown" />
                                <img src="" alt="unknown" />
                                <img src="" alt="unknown" />
                            </div>
                        </section>
                        <section class="PF_section2">
                            <a href="">분실물 게시판</a>

                        </section>
                        <section class="PF_section3">
                            <a href="">실종되어 있는 반려동물</a>
                        </section>
                        <section class="PF_section4">
                            <a href="">분실물 의뢰페이지</a>
                        </section>
                    </div>
                </div>
            </div>
        </div>


    )
}

<script>

</script>

export default PF_Container;
