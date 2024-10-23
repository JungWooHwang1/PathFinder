import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PF_Nav from "./common/PF_Nav";
import PF_Header from "./common/PF_Header";
import "../CSS/PF_Main.css";

const PF_Container = () => {
  const [recentLost, setRecentLost] = useState([]);
  const [recentFound, setRecentFound] = useState([]);
  const [recentPets, setRecentPets] = useState([]);
  const [recentWanted, setRecentWanted] = useState([]);

  const fetchRecentPosts = async () => {
    try {
      const responses = await Promise.all([
        fetch("/boards/lost-property-board/recent"), // 분실물 API
        fetch("/boards/acquire-property-board/recent"), // 습득물 API
        fetch("/boards/lost-pet-board/recent"), // 반려동물 API
        fetch("/boards/wanted-board/recent"), // 현상수배 API
      ]);

      const [lostData, foundData, petData, wantedData] = await Promise.all(
        responses.map((res) => res.json())
      );

      console.log("Lost Data:", lostData);
      console.log("Found Data:", foundData);
      console.log("Pet Data:", petData);
      console.log("Wanted Data:", wantedData);

      setRecentLost(Array.isArray(lostData) ? lostData : []);
      setRecentFound(Array.isArray(foundData) ? foundData : []);
      setRecentPets(Array.isArray(petData) ? petData : []);
      setRecentWanted(Array.isArray(wantedData) ? wantedData : []);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
    }
  };

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const getBase64Image = (imageData) => {
    return `data:image/jpeg;base64,${imageData}`; // MIME 타입에 맞게 수정
  };

  return (
    <div className="body">
      <PF_Header />
      <div className="PF_container">
        <PF_Nav />
        <div className="PF_main">
          <section className="PF_section1">
            <Link to="/PF_Lost">분실물 게시판</Link>
            <div className="img_group">
              {recentLost.slice(0, 4).map((post) => (
                <img
                  key={post.id}
                  src={getBase64Image(post.boardImage)}
                  alt={post.boardTitle}
                />
              ))}
            </div>
          </section>
          <section className="PF_section2">
            <Link to="/PF_Find">습득물 게시판</Link>
            <div className="img_group">
              {recentFound.slice(0, 4).map((post) => (
                <img
                  key={post.id}
                  src={getBase64Image(post.boardImage)}
                  alt={post.boardTitle}
                />
              ))}
            </div>
          </section>
          <section className="PF_section3">
            <Link to="/PF_Animal">실종되어 있는 반려동물</Link>
            <div className="img_group">
              {recentPets.slice(0, 4).map((post) => (
                <img
                  key={post.id}
                  src={getBase64Image(post.boardImage)}
                  alt={post.boardTitle}
                />
              ))}
            </div>
          </section>
          <section className="PF_section4">
            <Link to="/PF_Wanted">분실물 의뢰페이지</Link>
            <div className="img_group">
              {recentWanted.slice(0, 4).map((post) => (
                <img
                  key={post.id}
                  src={getBase64Image(post.boardImage)}
                  alt={post.boardTitle}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PF_Container;

