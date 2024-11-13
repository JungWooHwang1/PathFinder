import React, { useState, useEffect } from 'react';
import '../../CSS/PF_Section.css';
import { HiMagnifyingGlass } from "react-icons/hi2";
import { LuPackageSearch } from "react-icons/lu";
import { FaDog } from "react-icons/fa6";
import { GiWantedReward } from "react-icons/gi";

import lost_img from "../../img/분실물.jpg";
import lost_img2 from "../../img/분실물2.jpg";
import lost_img3 from "../../img/분실물3.jpg";
import lost_img4 from "../../img/분실물4.jpg";

import animal_img from "../../img/반려동물.jpg";
import animal_img2 from "../../img/반려동물2.jpg";
import animal_img3 from "../../img/반려동물3.jpg";
import animal_img4 from "../../img/반려동물4.jpg";
import { Link } from 'react-router-dom';

const PF_Section = () => {
    const lostImages = [lost_img, lost_img2, lost_img3, lost_img4];
    const animalImages = [animal_img, animal_img2, animal_img3, animal_img4];

    const [lostIndex, setLostIndex] = useState(0);
    const [animalIndex, setAnimalIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            
            setIsSliding(true);
            setTimeout(() => {
                setLostIndex((prevIndex) => {
                    const newIndex = (prevIndex + 1) % lostImages.length;
                   
                    return newIndex;
                });
                setAnimalIndex((prevIndex) => {
                    const newIndex = (prevIndex + 1) % animalImages.length;
                   
                    return newIndex;
                });
                setIsSliding(false);
                
            }, 500); // 슬라이드 애니메이션 시간과 일치시킴
        }, 10000); // 3초마다 이미지 변경

        return () => clearInterval(interval);
    }, [lostImages.length, animalImages.length]);

    return (
        <div className="PF_section">
            
            <Link to="/PF_Lost" className="section1">
                <div className={`background ${isSliding ? 'slide-out' : 'slide-in'}`} style={{ backgroundImage: `url(${lostImages[lostIndex]})` }}></div>
                {/* <div className={`background ${isSliding ? 'slide-in' : 'slide-out'}`} style={{ backgroundImage: `url(${lostImages[(lostIndex + 1) % lostImages.length]})` }}></div> */}
                <p> 분실물 </p>
                <HiMagnifyingGlass className="large-icon" />
            </Link>
            <Link to="/PF_Find" className="section1">
                <div className={`background ${isSliding ? 'slide-out' : 'slide-in'}`} style={{ backgroundImage: `url(${lostImages[lostIndex]})` }}></div>
                {/* <div className={`background ${isSliding ? 'slide-in' : 'slide-out'}`} style={{ backgroundImage: `url(${lostImages[(lostIndex + 1) % lostImages.length]})` }}></div> */}
                <p> 습득물 </p>
                <LuPackageSearch className="large-icon" />
            </Link>
            <Link to="/PF_Animal" className="section1">
                <div className={`background ${isSliding ? 'slide-out' : 'slide-in'}`} style={{ backgroundImage: `url(${animalImages[animalIndex]})` }}></div>
                {/* <div className={`background ${isSliding ? 'slide-in' : 'slide-out'}`} style={{ backgroundImage: `url(${animalImages[(animalIndex + 1) % animalImages.length]})` }}></div> */}
                <p> 반려동물 </p>
                <FaDog className="large-icon" />
            </Link>
            <Link to="/PF_Wanted" className="section1">
                <div className={`background ${isSliding ? 'slide-out' : 'slide-in'}`} style={{ backgroundImage: `url(${animalImages[animalIndex]})` }}></div>
                {/* <div className={`background ${isSliding ? 'slide-in' : 'slide-out'}`} style={{ backgroundImage: `url(${animalImages[(animalIndex + 1) % animalImages.length]})` }}></div> */}
                <p> 물건의뢰 </p>
                <GiWantedReward className="large-icon" />
            </Link>
        </div>
    );
};

export default PF_Section;