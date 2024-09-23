import React from "react";
import "../CSS/PF_Main.css";
import "../CSS/PF_Write.css";

const PF_Basic_Board = () => {
  return (
    <div className="body">
      <header className="PF_header">
        <img className="main_logo" src="" alt="main_logo" />
        <div className="search_area">
          <form className="search-box">
            <input
              className="search_txt"
              type="search"
              placeholder="검색어를 입력해 주세요."
              autoComplete="off"
            />
          </form>
        </div>
      </header>
      <div className="PF_container">
        <nav className="PF_nav">
          <ul>
            <li>
              <a href="#">찾아주세요!(분실물)</a>
            </li>
            <li>
              <a href="#">찾아가세요(습득물)</a>
            </li>
            <li>
              <a href="#">사라졌어요!(반려동물)</a>
            </li>
            <li>
              <a href="#">급해요!(현상수배)</a>
            </li>
          </ul>
        </nav>
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
                title="분실장소 지도 보기"
              >
                분실장소 지도보기
              </button>
            </div>

            {/* 정보 영역 */}
            <div className="find_info">
              <ul>
                <li>
                  <p className="lost_name01">물품명 :</p>
                  <p className="lost_name02">1</p>
                </li>
                <li>
                  <p className="lost_lct_cd01">분실지역 :</p>
                  <p className="lost_lct_cd02">2</p>
                </li>
                <li>
                  <p className="lost_date01">분실일 :</p>
                  <p className="lost_date02">3</p>
                </li>
                <li>
                  <p className="lost_place01">분실장소 :</p>
                  <p className="lost_place02">4</p>
                </li>
                <li>
                  <p className="lost_class01">물품종류 :</p>
                  <p className="lost_class02">5</p>
                </li>
                <li>
                  <p className="lost_color01">물품색상 :</p>
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
            <button
              type="button"
              id="lostlist"
              name="lostlist"
              className="btn_01"
              title="분실물 목록"
            >
              목록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PF_Basic_Board;
