import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import PF_Nav from "../common/PF_Nav";
import PF_Header from "../common/PF_Header";
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import "react-calendar/dist/Calendar.css"; // 스타일을 import
import PF_local_option from "../common/PF_local_option";
import PF_place_option from "../common/PF_place_option";
import PF_Paging from "../common/PF_Paging";

const PF_Wanted = () => {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줌
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}${mm}${dd}`; // yyyyMMdd 형식으로 반환
  };
  // 상태 관리
  const [formData, setFormData] = useState({
    PRDT_CL_NM: "",
    START_YMD: getTodayDate(),
    END_YMD: getTodayDate(),
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

  const calendarRef = useRef(null); // 달력 DOM 참조
  // 날짜 변경 핸들러
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
  // 달력 토글 핸들러 (달력 열기)
  const handleCalendarToggle = (type) => {
    setCalendarType(type);
    setShowCalendar(true);
  };
  // 화면 외부 클릭 시 달력 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false); // 외부 클릭 시 달력 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // 달력 위치 계산
  const getCalendarStyle = () => {
    if (calendarType === "START_YMD") {
      return { top: "180px", left: "600px" }; // startYMD 위에 위치 (원하는 좌표로 변경 가능)
    } else if (calendarType === "END_YMD") {
      return { top: "180px", right: "400px" }; // endYMD 위에 위치 (원하는 좌표로 변경 가능)
    }
    return {};
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
                className="lost_qfind2"
                style={{ display: "flex", position: "relative" }}
              >
                {/* 왼쪽 3개 */}
                <div className="wanted-left-section">
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

                  {/* 수배물명 */}
                  <fieldset className="lost_inputbox">
                    <legend>수배물명 입력</legend>
                    <label htmlFor="lstPrdtNm">수배물명</label>
                    <input
                      type="text"
                      id="lstPrdtNm"
                      name="LST_PRDT_NM"
                      className="input"
                      value={formData.LST_PRDT_NM}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                {/* 오른쪽 3개 */}
                <div className="right-section">
                  {/* 수배지역 */}
                  <PF_local_option />

                  {/* 수배장소 */}
                  <PF_place_option />
                  <fieldset className="lost_inputbox">
                    <legend>의뢰 비용 선택</legend>
                    <label htmlFor="placeSeMo">의뢰비용</label>
                    <select
                      name="PLACE_SE_MO"
                      id="PLACE_SE_MO"
                      title="의뢰비용 선택"
                      value={formData.PLACE_SE_CD}
                      onChange={handleChange}
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
              {/* 기간 */}
              <div className="date-section">
                <fieldset className="lost_period">
                  <legend>실종기간 입력</legend>
                  <label htmlFor="startYmdInput">기간</label>
                  <div className="date-input-group">
                    <input
                      type="text"
                      title="검색시작일"
                      name="START_YMD"
                      id="startYmdInput"
                      className="search_text_isNumber"
                      size="10"
                      value={formData.START_YMD}
                      readOnly
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
                      className="search_text_isNumber"
                      size="10"
                      value={formData.END_YMD}
                      readOnly
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
                  <div
                    className="calendar-popup"
                    ref={calendarRef}
                    style={getCalendarStyle()}
                  >
                    <Calendar onChange={handleDateChange} value={date} />
                  </div>
                )}
              </div>
              <p style={{ textAlign: "center" }}>
                <button type="submit" className="btn_01" title="수배물 검색">
                  검색
                </button>
              </p>
            </div>
          </form>

          <div className="find_listBox">
            <h2>수배물 게시판</h2>
            <table
              className="type01"
              summary="관리번호, 수배물명, 수배장소, 수배일자"
            >
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
          <a href="PF_Wanted_Board" className="board">
            게시글
          </a>
          <nav id="sub_lnb">
            <ul>
              <li>
                <a href="PF_Wanted_Upload" class="subMenu_select">
                  현상수배 게시물 등록
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

export default PF_Wanted;
