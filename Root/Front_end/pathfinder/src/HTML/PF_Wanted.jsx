import React, { useState } from "react";
import Calendar from "react-calendar";
import PF_Nav from "./common/PF_Nav";
import PF_Header from "./common/PF_Header";
import "../CSS/PF_Main.css";
import "../CSS/PF_Write.css";
import "react-calendar/dist/Calendar.css"; // 스타일을 import

const PF_Wanted = () => {
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
      <PF_Header />
      <div className="PF_container">
        <PF_Nav />
        <div id="contents">
          <h2>수배물 검색</h2>
          {/* 검색 폼 */}
          <form onSubmit={handleSearchSubmit}>
            <div className="findList">
              <div
                className="Wanted_qfind2"
                style={{ display: "flex", position: "relative" }}
              >
                {/* 왼쪽 3개 */}
                <div style={{ flex: 1, paddingRight: "10px" }}>
                  {/* 분류명 */}
                  <fieldset className="lost_inputbox">
                    <legend>분류명 입력</legend>
                    <label htmlFor="fdLctCd">분류명</label>
                    <select
                      name="PRDT_CL_NM"
                      id="PRDT_CL_NM"
                      value={formData.PRDT_CL_NM}
                      readOnly
                      title="분류명 입력"
                      onChange={handleChange}
                      className="search"
                      style={{ display: "inline-block" }}
                    >
                      <option value="">선택</option>
                      <option value="LCA000">가방</option>
                      <option value="LCH000">귀금속</option>
                      <option value="LCI000">도서용품</option>
                      <option value="LCJ000">서류</option>
                      <option value="LCK000">산업용품</option>
                      <option value="LCQ000">소핑백</option>
                      <option value="LCR000">스포츠용품</option>
                      <option value="LCS000">악기</option>
                      <option value="LCT000">유가증권</option>
                      <option value="LCU000">의류</option>
                      <option value="LCV000">자동차</option>
                      <option value="LCL000">전자기기</option>
                      <option value="LCM000">지갑</option>
                      <option value="LCN000">증명서</option>
                      <option value="LCO000">컴퓨터</option>
                      <option value="LCP000">카드</option>
                      <option value="LCW000">현금</option>
                      <option value="LCF000">휴대폰</option>
                      <option value="LCE000">기타</option>
                      <option value="LCE000">유류품</option>
                      <option value="DOG000">개</option>
                      <option value="CAT000">고양이</option>
                      <option value="BIRD000">새</option>
                      <option value="REPTILE000">파충류</option>
                      <option value="SPE000">특수동물</option>
                    </select>
                  </fieldset>
                  {/* 기간 */}
                  <fieldset className="Wanted_period">
                    <legend>수배기간 입력</legend>
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
                  {/* 수배물명 */}
                  <fieldset className="Wanted_inputbox">
                    <legend>수배물명 입력</legend>
                    <label htmlFor="lstPrdtNm">수배물명</label>
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
                  {/* 수배지역 */}
                  <fieldset className="Wanted_inputbox">
                    <legend>수배지역 입력</legend>
                    <label htmlFor="lstLctCd">수배지역</label>
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

                  {/* 수배장소 */}
                  <fieldset className="Wanted_inputbox">
                    <legend>수배장소 입력</legend>
                    <label htmlFor="LST_PLACE">수배장소</label>
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
                    <legend>의뢰 비용 선택</legend>
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
                <button type="submit" className="btn_01" title="수배물 검색">
                  검색
                </button>
              </p>
            </div>
          </form>

          <div className="find_listBox">
            <table
              className="type01"
              summary="관리번호, 수배물명, 수배장소, 수배일자"
            >
              <caption>수배물 목록 조회 결과 테이블</caption>
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
                  <th scope="col">수배물명</th>
                  <th scope="col">수배장소</th>
                  <th scope="col">수배일자</th>
                  <th scope="col">의뢰비용</th>
                </tr>
              </thead>
              <tbody>{/* 검색 결과를 여기에 표시 */}</tbody>
            </table>
          </div>
          <nav id="sub_lnb">
            <ul>
              <li>
                <a href="" class="subMenu_select">
                  현상수배 게시물 등록
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

export default PF_Wanted;
