import React from "react";
import PF_Nav from "./common/PF_Nav"
import PF_Header from "./common/PF_Header"
import "../CSS/PF_Main.css"

const PF_Container = () => {

    return (


        <div className="body">
            <PF_Header />
            <div class="PF_container">
                <PF_Nav />
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
    )
}

export default PF_Container;