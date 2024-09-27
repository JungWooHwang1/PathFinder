import React from "react";
import { useEffect } from "react";
import "../CSS/PF_Main.css";
import "../CSS/PF_Write.css";
import PF_Header from "./common/PF_Header";
import PF_Nav from "./common/PF_Nav";

const PF_Animal_Board = () => {
  //스크립트 파일 읽어오기
  const new_script = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", () => {
        resolve();
      });
      script.addEventListener("error", (e) => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    //카카오맵 스크립트 읽어오기
    const my_script = new_script(
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c4a41bf411d48221a36238c0e2fab540"
    );

    //스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => {
      console.log("script loaded!!!");
      const kakao = window["kakao"];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.56000302825312, 126.97540593203321), //좌표설정
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer, options); //맵생성
        //마커설정
        const markerPosition = new kakao.maps.LatLng(
          37.56000302825312,
          126.97540593203321
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    });
  }, []);
  return (
    <div className="body">
      <PF_Header />
      <div className="PF_container">
        <PF_Nav />
        <div className="findDetail">
          <p className="LST_Title">게시글 제목</p>
          <hr className="top_line" />

          <div className="findDetail_wrap">
            <div className="img_area">
              <p className="lost_img">
                <img src="" alt="이미지 준비중입니다." />
              </p>
            </div>

            {/* 지도보기 버튼을 포함하는 div 추가 */}
            <div className="find_info_btn">
              <div className="App">
                <div id="map" className="map" />
              </div>
            </div>

            {/* 정보 영역 */}
            <div className="find_info">
              <ul>
                <li>
                  <p className="lost_cl01">분류명 :</p>
                  <p className="lost_cl02">0</p>
                </li>
                <li>
                  <p className="lost_name01">반려동물명 :</p>
                  <p className="lost_name02">1</p>
                </li>
                <li>
                  <p className="lost_lct_cd01">실종지역 :</p>
                  <p className="lost_lct_cd02">2</p>
                </li>
                <li>
                  <p className="lost_date01">실종일 :</p>
                  <p className="lost_date02">3</p>
                </li>
                <li>
                  <p className="lost_place01">실종장소 :</p>
                  <p className="lost_place02">4</p>
                </li>
                <li>
                  <p className="lost_class01">반려동물 종류 :</p>
                  <p className="lost_class02">5</p>
                </li>
                <li>
                  <p className="lost_color01">반려동물 색상 :</p>
                  <p className="lost_color02">6</p>
                </li>
                <li>
                  <p className="lost_ch01">특징 :</p>
                  <p className="lost_ch02">7</p>
                </li>
                <li>
                  <p className="call01">연락처 :</p>
                  <p className="call02">8</p>
                </li>
                <li>
                  <p className="lost_note01">비고 :</p>
                  <p className="lost_note02">9</p>
                </li>
              </ul>
            </div>
          </div>

          <hr className="bottom_line" />

          <div className="append_lost">
            <p className="find_comment">댓글</p>
            <p className="comment"></p>
          </div>

          <div className="find_info_txt"></div>

          <div className="find_info_btn2">
            <a
              href="/PF_Animal"
              type="button"
              id="lostlist"
              name="lostlist"
              className="lostlist"
              title="실종 반려동물 목록"
            >
              목록
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PF_Animal_Board;
