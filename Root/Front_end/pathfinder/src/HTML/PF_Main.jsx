import React from "react";
import { Link } from 'react-router-dom';
import PF_Nav from "./common/PF_Nav"
import PF_Header from "./common/PF_Header"
import "../CSS/PF_Main.css"


const PF_Container = () => {
    return (
        <div className="body">
            <PF_Header />
            <div className="PF_container">
                <PF_Nav />
                <div className="PF_main">
                    <section className="PF_section1">
                    <Link to="/PF_Lost">분실물 게시판</Link>
                        <div className="img_group">
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                        </div>
                    </section>
                    <section className="PF_section2">
                    <Link to="/PF_Find">습득물 게시판</Link>
                        <div className="img_group">
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                        </div>
                    </section>
                    <section className="PF_section3">
                    <Link to="/PF_Animal">실종되어 있는 반려동물</Link>
                        <div className="img_group">
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                        </div>
                    </section>
                    <section className="PF_section4">
                    <Link to="/PF_Wanted">분실물 의뢰페이지</Link>
                        <div className="img_group">
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                            <img src="" alt="unknown" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default PF_Container;