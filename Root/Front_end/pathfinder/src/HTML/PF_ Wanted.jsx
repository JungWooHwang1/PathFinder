import React, { useState } from "react";
import Calendar from "react-calendar";
import "../CSS/PF_Main.css";
import "../CSS/PF_Write.css";
import "react-calendar/dist/Calendar.css"; // 스타일을 import

const PF_Lost = () => {
  // 상태 관리
  const [formData, setFormData] = useState({
    PRDT_CL_NM: "",
    START_YMD: "20240721",
    END_YMD: "20240919",
    LST_PRDT_NM: "",
    LST_LCT_CD: "",
    LST_PLACE: "",
    P_ATC_ID: "",
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

        <div id="contents">
          <h2>분실물 검색</h2>
          {/* 검색 폼 */}
          <form onSubmit={handleSearchSubmit}>
            <div className="findList">
              <div
                className="lost_qfind2"
                style={{ display: "flex", position: "relative" }}
              >
                {/* 왼쪽 3개 */}
                <div style={{ flex: 1, paddingRight: "10px" }}>
                  {/* 분류명 */}
                  <fieldset className="lost_inputbox">
                    <legend>분실물 종류 입력</legend>
                    <label htmlFor="PRDT_CL_NM">분류명</label>
                    <input
                      type="text"
                      name="PRDT_CL_NM"
                      id="PRDT_CL_NM"
                      value={formData.PRDT_CL_NM}
                      readOnly
                      title="분류명 입력"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn_02"
                      title="분류명 선택"
                      onClick={() =>
                        alert("분류명 선택 레이어 새창을 여는 기능입니다.")
                      }
                    >
                      찾기
                    </button>
                  </fieldset>

                  {/* 기간 */}
                  <fieldset className="lost_period">
                    <legend>분실기간 입력</legend>
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

                  {/* 분실물명 */}
                  <fieldset className="lost_inputbox">
                    <legend>분실물명 입력</legend>
                    <label htmlFor="lstPrdtNm">분실물명</label>
                    <input
                      type="text"
                      id="lstPrdtNm"
                      name="LST_PRDT_NM"
                      className="search_text korean"
                      value={formData.LST_PRDT_NM}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                {/* 오른쪽 3개 */}
                <div style={{ flex: 1, paddingLeft: "10px" }}>
                  {/* 분실지역 */}
                  <fieldset className="lost_inputbox">
                    <legend>분실지역 입력</legend>
                    <label htmlFor="lstLctCd">분실지역</label>
                    <select
                      name="LST_LCT_CD"
                      id="lstLctCd"
                      value={formData.LST_LCT_CD}
                      onChange={handleChange}
                    >
                      <option value="">선택</option>
                      {/* 지역 목록을 여기에 추가 */}
                    </select>
                  </fieldset>

                  {/* 분실장소 */}
                  <fieldset className="lost_inputbox">
                    <legend>분실장소 입력</legend>
                    <label htmlFor="LST_PLACE">분실장소</label>
                    <input
                      type="text"
                      id="LST_PLACE"
                      name="LST_PLACE"
                      className="search_text korean"
                      value={formData.LST_PLACE}
                      onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset className="retainer">
                    <legend>의뢰 보상</legend>
                    <label htmlFor="placeSeCd">의뢰비용</label>
                    <select
                      name="PLACE_SE_CD"
                      id="placeSeCd"
                      title="의뢰비용 선택"
                      value={formData.PLACE_SE_CD}
                      onChange={handleChange}
                      style={{ display: "inline-block" }}
                    >
                      <option value="">선택</option>
                      {/* 추가 옵션들 */}
                      <option value="LL1011">1~5000</option>
                      <option value="LL1015">5000~10000</option>
                      <option value="LL1005">10000~50000</option>
                      <option value="LL1003">50000이상</option>
                    </select>
                  </fieldset>
                </div>
              </div>

              <p style={{ textAlign: "center" }}>
                <button type="submit" className="btn_01" title="분실물 검색">
                  검색
                </button>
              </p>
            </div>
          </form>

          <div className="find_listBox">
            <table
              className="type01"
              summary="관리번호, 분실물명, 분실장소, 분실일자"
            >
              <caption>분실물 목록 조회 결과 테이블</caption>
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
                  <th scope="col">분실물명</th>
                  <th scope="col">분실장소</th>
                  <th scope="col">분실일자</th>
                </tr>
              </thead>
              <tbody>{/* 검색 결과를 여기에 표시 */}</tbody>
            </table>
          </div>
          <nav id="sub_lnb">
            <ul>
              <li>
                <a href="" class="subMenu_select">
                  분실물 게시물 등록
                </a>
              </li>
            </ul>
          </nav>
          {/* 페이징 가로 정렬 */}
          <div
            id="paging"
            className="paging"
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            {/* 페이징 영역 */}
            <a href="#none" className="first">
              처음
            </a>
            <a href="#none" className="prev">
              이전
            </a>
            <a href="#none" className="on">
              <strong>1</strong>
            </a>
            <a href="#none" className="next">
              다음
            </a>
            <a href="#none" className="last">
              마지막
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PF_Lost;
