import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 스타일을 import
import "../CSS/PF_Main.css";
import "../CSS/PF_Write.css";

const PF_Lost = () => {
  // 상태 관리
  const [formData, setFormData] = useState({
    PRDT_CL_NM: "",
    START_YMD: "20240721",
    END_YMD: "20240919",
    PRDT_NM: "",
    DEP_PLACE: "",
    SITE: "",
    PLACE_SE_CD: "",
    FD_LCT_CD: "",
    FD_SIGUNGU: "",
    IN_NM: "",
    ATC_ID: "",
    MDCD: "",
    SRNO: "",
    IMEI_NO: "",
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
    setShowCalendar(true);
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
    setShowCalendar(false);
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
              <a href="#">찾아주세요!(습득물)</a>
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
          <h2>습득물 검색</h2>
          {/* 검색 폼 */}
          <div className="findList">
            <div className="lost_qfind2">
              <form
                name="commandMap"
                id="commandMap"
                method="post"
                action="#none"
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="hidden"
                  name="pageIndex"
                  id="pageIndex"
                  value="1"
                />
                <div className="left-panel">
                  <fieldset className="lost_inputbox">
                    <legend>습득물 종류 입력</legend>
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
                    <input
                      type="hidden"
                      name="PRDT_CL_CD01"
                      id="prdtClCd01"
                      value=""
                    />
                    <input
                      type="hidden"
                      name="PRDT_CL_CD02"
                      id="prdtClCd02"
                      value=""
                    />
                  </fieldset>

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

                  <fieldset className="lost_inputbox">
                    <legend>보관장소 입력</legend>
                    <label htmlFor="depPlace">보관장소</label>
                    <input
                      type="text"
                      name="DEP_PLACE"
                      id="depPlace"
                      className="search_text korean"
                      value={formData.DEP_PLACE}
                      onChange={handleChange}
                    />
                  </fieldset>

                  <fieldset className="lost_inputbox">
                    <legend>접수구분 입력</legend>
                    <label htmlFor="site">접수구분</label>
                    <select
                      name="SITE"
                      id="site"
                      title="접수구분 선택"
                      value={formData.SITE}
                      onChange={handleChange}
                    >
                      <option value="">선택</option>
                      <option value="F">경찰관서</option>
                      <option value="V">경찰이외의기관(지하철,공항등)</option>
                    </select>
                  </fieldset>

                  <fieldset className="lost_inputbox">
                    <legend>습득장소 입력</legend>
                    <label htmlFor="placeSeCd">습득장소</label>
                    <select
                      name="PLACE_SE_CD"
                      id="placeSeCd"
                      title="습득장소 선택"
                      value={formData.PLACE_SE_CD}
                      onChange={handleChange}
                      style={{ display: "inline-block" }}
                    >
                      <option value="">선택</option>
                      {/* 추가 옵션들 */}
                      <option value="LL1011">우체국(통)</option>
                      <option value="LL1015">노상</option>
                      <option value="LL1005">기차</option>
                      <option value="LL1003">지하철</option>
                      <option value="LL1012">백화점/매장</option>
                      <option value="LL1002">택시</option>
                      <option value="LL1014">음식점(업소포함)</option>
                      <option value="LL1008">공공기관</option>
                      <option value="LL1001">버스</option>
                      <option value="LL1016">주택</option>
                      <option value="LL1004">공항</option>
                      <option value="LL1013">상점</option>
                      <option value="LL1020">영화관</option>
                      <option value="LL1009">놀이공원</option>
                      <option value="LL1007">스포츠시설</option>
                      <option value="LL1006">회사</option>
                      <option value="LL1017">기타</option>
                      <option value="LL1018">불상</option>
                    </select>
                  </fieldset>
                </div>

                <div className="right-panel">
                  <fieldset className="lost_inputbox">
                    <legend>습득지역 입력</legend>
                    <label htmlFor="fdLctCd">습득지역</label>
                    <select
                      name="FD_LCT_CD"
                      id="fdLctCd"
                      className="search_text1"
                      title="습득지역 선택"
                      value={formData.FD_LCT_CD}
                      onChange={handleChange}
                      style={{ display: "inline-block" }}
                    >
                      <option value="">선택</option>
                      <option value="LCA000">서울특별시</option>
                      <option value="LCH000">강원도</option>
                      <option value="LCI000">경기도</option>
                      <option value="LCJ000">경상남도</option>
                      <option value="LCK000">경상북도</option>
                      <option value="LCQ000">광주광역시</option>
                      <option value="LCR000">대구광역시</option>
                      <option value="LCS000">대전광역시</option>
                      <option value="LCT000">부산광역시</option>
                      <option value="LCU000">울산광역시</option>
                      <option value="LCV000">인천광역시</option>
                      <option value="LCL000">전라남도</option>
                      <option value="LCM000">전라북도</option>
                      <option value="LCN000">충청남도</option>
                      <option value="LCO000">충청북도</option>
                      <option value="LCP000">제주특별자치도</option>
                      <option value="LCW000">세종특별자치시</option>
                      <option value="LCF000">해외</option>
                      <option value="LCE000">기타</option>
                    </select>
                  </fieldset>

                  <fieldset
                    id="Sigungu_Div"
                    className="lost_inputbox"
                    style={{ display: "none" }}
                  >
                    <legend>습득지역 입력</legend>
                    <label htmlFor="fdSigungu">습득지역상세</label>
                    <input
                      type="text"
                      id="fdSigungu"
                      name="FD_SIGUNGU"
                      className="input w_40"
                      placeholder="예)강남구,청양군"
                      value={formData.FD_SIGUNGU}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>
                <p style={{ textAlign: "center" }}>
                  <button type="submit" className="btn_01" title="습득물 검색">
                    검색
                  </button>
                </p>
              </form>
            </div>
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
          </div>
          <nav id="sub_lnb">
            <ul>
              <li>
                <a href="" class="subMenu_select">
                  습득물 게시물 등록
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
      {showCalendar && (
        <div className="calendar-popup">
          <Calendar onChange={handleDateChange} value={date} locale="ko-KR" />
        </div>
      )}
    </div>
  );
};

export default PF_Lost;
