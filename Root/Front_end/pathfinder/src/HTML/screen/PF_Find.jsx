import React, { useState } from "react";
import Calendar from "react-calendar";
import PF_Nav from "../common/PF_Nav";
import PF_Header from "../common/PF_Header";
import "react-calendar/dist/Calendar.css"; // 스타일을 import
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import PF_product_option from "../common/PF_product_option";
import PF_local_option from "../common/PF_local_option";
import PF_place_option from "../common/PF_place_option ";
import PF_Paging from "../common/PF_Paging";

const PF_Lost = () => {
  // 상태 관리
  const [formData, setFormData] = useState({
    PRDT_CL_NM: "",
    START_YMD: "20240721",
    END_YMD: "20240919",
    PRDT_NM: "",
    PLACE_SE_CD: "",
    FD_LCT_CD: "",
  });

  const [showCalendar, setShowCalendar] = useState(false); // 달력 표시 여부
  const [calendarType, setCalendarType] = useState(""); // 달력 타입 (시작일/종료일)
  const [date, setDate] = useState(new Date()); // 선택된 날짜

  // 핸들러 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // 검색 요청 처리
    console.log("검색 폼 제출:", formData);
  };

  const handleCalendarToggle = (type) => {
    setCalendarType(type);
    setShowCalendar((prev) => !prev); // 토글을 위해 prev로 설정
  };

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.toISOString().split("T")[0].replace(/-/g, "");
    if (calendarType === "START_YMD") {
      setFormData((prevData) => ({
        ...prevData,
        START_YMD: formattedDate,
      }));
    } else if (calendarType === "END_YMD") {
      setFormData((prevData) => ({
        ...prevData,
        END_YMD: formattedDate,
      }));
    }
    setDate(newDate);
    setShowCalendar(false); // 달력 선택 후 닫기
  };

  return (
    <div className="body">
      <PF_Header />
      <div className="PF_container">
        <PF_Nav />
        <div id="contents">
          <h2>습득물 검색</h2>
          {/* 검색 폼 */}
          <div className="findList">
            <form
              name="commandMap"
              id="commandMap"
              method="post"
              action="#none"
              onSubmit={handleSearchSubmit}
            >
              <input type="hidden" name="pageIndex" id="pageIndex" value="1" />
              <div
                className="lost_qfind2"
                style={{ display: "flex", position: "relative" }}
              >
                <div style={{ flex: 1, paddingRight: "10px" }}>
                  <PF_product_option />

                  <fieldset className="lost_period">
                    <legend>습득기간 입력</legend>
                    <label htmlFor="startYmdInput">기간</label>
                    <div className="date-input-group">
                      <input
                        type="text"
                        title="검색시작일"
                        name="START_YMD"
                        id="startYmdInput"
                        className="search_text isNumber"
                        size="10"
                        value={formData.START_YMD}
                        readOnly
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="cal_btn"
                        onClick={() => handleCalendarToggle("START_YMD")}
                        title="검색 시작일 달력 레이어 새창"
                      >
                        달력 열기
                      </button>
                    </div>
                    <span>~</span>
                    <div className="date-input-group">
                      <input
                        type="text"
                        title="검색종료일"
                        name="END_YMD"
                        id="endYmdInput"
                        className="search_text isNumber"
                        size="10"
                        value={formData.END_YMD}
                        readOnly
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="cal_btn"
                        onClick={() => handleCalendarToggle("END_YMD")}
                        title="검색 종료일 달력 레이어 새창"
                      >
                        달력 열기
                      </button>
                    </div>
                  </fieldset>
                  {/* 달력 렌더링 */}
                  {showCalendar && (
                    <div className="calendar-popup">
                      <Calendar onChange={handleDateChange} value={date} />
                    </div>
                  )}
                  <fieldset className="lost_inputbox">
                    <legend>습득물명 입력</legend>
                    <label htmlFor="prdtNm">습득물명</label>
                    <input
                      type="text"
                      name="PRDT_NM"
                      id="prdtNm"
                      className="search_text korean"
                      value={formData.PRDT_NM}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                <div style={{ flex: 1, paddingLeft: "10px" }}>
                  <PF_place_option />

                  <PF_local_option />
                </div>
              </div>
              <p style={{ textAlign: "center" }}>
                <button type="submit" className="btn_01" title="검색">
                  검색
                </button>
              </p>
            </form>
          </div>

          <div className="find_listBox">
            <table
              className="type01"
              summary="관리번호, 습득물명, 습득장소, 습득일자"
            >
              <caption>습득물 목록 조회 결과 테이블</caption>
              <colgroup>
                <col style={{ width: "160px" }} />
                <col style={{ width: "auto" }} />
                <col style={{ width: "200px" }} />
                <col style={{ width: "110px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="first">
                    관리번호
                  </th>
                  <th scope="col">습득물명</th>
                  <th scope="col">습득장소</th>
                  <th scope="col">습득일자</th>
                </tr>
              </thead>
              <tbody>{/* 검색 결과를 여기에 표시 */}</tbody>
            </table>
            <a href="PF_Find_Board" class="board">
              습득물 게시물
            </a>
          </div>
          <nav id="sub_lnb">
            <ul>
              <li>
                <a href="PF_Find_Upload" class="subMenu_select">
                  습득물 게시물 등록
                </a>
              </li>
            </ul>
          </nav>
          <PF_Paging />
        </div>
      </div>
    </div>
  );
};

export default PF_Lost;
