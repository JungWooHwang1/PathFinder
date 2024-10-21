import React from "react";
import { useEffect } from "react";
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import PF_Header from "../common/PF_Header";
import PF_Nav from "../common/PF_Nav";

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
                  <p id="lost_cl01" className="show-board">
                    분류명 :
                  </p>
                  <p id="lost_cl02" className="show-board">
                    0
                  </p>
                </li>
                <li>
                  <p id="lost_name01" className="show-board">
                    반려동물명 :
                  </p>
                  <p id="lost_name02" className="show-board">
                    1
                  </p>
                </li>
                <li>
                  <p id="lost_lct_cd01" className="show-board">
                    실종지역 :
                  </p>
                  <p id="lost_lct_cd02" className="show-board">
                    2
                  </p>
                </li>
                <li>
                  <p id="lost_date01" className="show-board">
                    실종일 :
                  </p>
                  <p id="lost_date02" className="show-board">
                    3
                  </p>
                </li>
                <li>
                  <p id="lost_place01" className="show-board">
                    실종장소 :
                  </p>
                  <p id="lost_place02" className="show-board">
                    4
                  </p>
                </li>
                <li>
                  <p id="lost_class01" className="show-board">
                    반려동물 종류 :
                  </p>
                  <p id="lost_class02" className="show-board">
                    5
                  </p>
                </li>
                <li>
                  <p id="lost_color01" className="show-board">
                    반려동물 색상 :
                  </p>
                  <p id="lost_color02" className="show-board">
                    6
                  </p>
                </li>
                <li>
                  <p id="lost_ch01" className="show-board">
                    특징 :
                  </p>
                  <p id="lost_ch02" className="show-board">
                    7
                  </p>
                </li>
                <li>
                  <p id="call01" className="show-board">
                    연락처 :
                  </p>
                  <p id="call02" className="show-board">
                    8
                  </p>
                </li>
                <li>
                  <p id="lost_note01" className="show-board">
                    비고 :
                  </p>
                  <p id="lost_note02" className="show-board">
                    9
                  </p>
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
