import React from "react";
import "../CSS/PF_Main.css";
import "../CSS/PF_Write.css";
import PF_Header from "../HTML/common/PF_Header";
import PF_Nav from "../HTML/common/PF_Nav";

const PF_Wanted_Board = () => {
  return (
    <div className="body">
      <PF_Header />
      <div className="PF_container">
        <PF_Nav />
        <div className="findDetail">
          <hr className="top_line" />

          <div className="findDetail_wrap">
            <div className="img_area">
              <p className="lost_img">
                <img src="" alt="이미지 준비중입니다." />
              </p>
            </div>

            {/* 지도보기 버튼을 포함하는 div 추가 */}
            <div className="find_info_btn">
              <button
                type="button"
                className="lost_map"
                title="수배장소 지도 보기"
              >
                수배장소 지도보기
              </button>
            </div>

            {/* 정보 영역 */}
            <div className="find_info">
              <ul>
                <li>
                  <p className="lost_cl01">분류명 :</p>
                  <p className="lost_cl02">0</p>
                </li>
                <li>
                  <p className="lost_name01">물품명 :</p>
                  <p className="lost_name02">1</p>
                </li>
                <li>
                  <p className="lost_lct_cd01">수배지역 :</p>
                  <p className="lost_lct_cd02">2</p>
                </li>
                <li>
                  <p className="lost_date01">수배일 :</p>
                  <p className="lost_date02">3</p>
                </li>
                <li>
                  <p className="lost_place01">수배장소 :</p>
                  <p className="lost_place02">4</p>
                </li>
                <li>
                  <p className="lost_class01">물품종류 :</p>
                  <p className="lost_class02">5</p>
                </li>
                <li>
                  <p className="lost_color01">물품 색상 :</p>
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
              <button className="find_order">찾기</button>
            </div>
          </div>

          <hr className="bottom_line" />

          <div className="append_lost">
            <p className="find_comment">댓글</p>
            <p className="comment"></p>
          </div>

          <div className="find_info_txt"></div>

          <div className="find_info_btn2">
            <button
              type="button"
              id="lostlist"
              name="lostlist"
              className="btn_01"
              title="수배물 목록"
            >
              목록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PF_Wanted_Board;
