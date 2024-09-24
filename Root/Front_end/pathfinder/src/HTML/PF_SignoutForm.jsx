import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
    const handleLogout = () => {
        // 로그아웃 처리 로직을 구현합니다.

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("storeid");
        // 페이지 이동
        navigate("/");
    };

    return (
        <div className="user-profile">
            <div className="user-logout-btn-container">
                <button className="user-logout-btn" onClick={handleLogout}>
                    로그아웃
                    <div className="move-page-icon">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default UserProfile;