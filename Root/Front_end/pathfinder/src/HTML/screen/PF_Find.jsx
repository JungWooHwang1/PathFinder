import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 사용
import Calendar from "react-calendar";
import PF_Nav from "../common/PF_Nav";
import PF_Header from "../common/PF_Header";
import "react-calendar/dist/Calendar.css"; // 스타일을 import
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import PF_product_option from "../common/PF_product_option";
import PF_local_option from "../common/PF_local_option";
import PF_place_option from "../common/PF_place_option";
import PF_Paging from "../common/PF_Paging";
import { useUser } from "../common/userContext"; // UserContext 사용

const PF_Find = () => {
  const { user } = useUser(); // user, login, logout 가져오기
  const isLoggedIn = user !== null; // 로그인 여부 확인
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  useEffect(() => {
    console.log("user 상태:", user); // user 상태 출력
    console.log("isLoggedIn 상태:", isLoggedIn); // 로그인 여부 출력
  }, [user]); // user 상태가 변경될 때마다 로그 출력

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

  // 로그인 상태에 따른 접근 제어
  const handleUploadClick = () => {
    console.log("isLoggedIn 상태:", isLoggedIn); // 로그인 상태 확인용 콘솔
    console.log("user 상태:", user); // 현재 user 상태 확인
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/PF_SigninForm"); // 로그인 페이지로 이동
    } else {
      navigate("/PF_Find_Upload"); // 게시물 등록 페이지로 이동
    }
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
                <div className="left-section">
                  <PF_product_option />

                  <fieldset className="lost_inputbox">
                    <legend>습득물명 입력</legend>
                    <label htmlFor="lstPrdtNm">제목</label>
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

                <div className="right-section">
                  <PF_local_option />
                  <PF_place_option />
                </div>
              </div>
              <div className="date-section">
                <fieldset className="lost_period">
                  <legend>습득기간 입력</legend>
                  <label htmlFor="startYmdInput">기간</label>
                  <div className="date-input-group">
                    <input
                      type="text"
                      title="검색시작일"
                      name="START_YMD"
                      id="startYmdInput"
                      className="search_text_isNumber"
                      size="20"
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
                  <span className="datecom"> ~ </span>
                  <div className="date-input-group">
                    <input
                      type="text"
                      title="검색종료일"
                      name="END_YMD"
                      id="endYmdInput"
                      className="search_text_isNumber"
                      size="20"
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
                {showCalendar && (
                  <div className="calendar-popup">
                    <Calendar onChange={handleDateChange} value={date} />
                  </div>
                )}
              </div>
              <p style={{ textAlign: "center" }}>
                <button type="submit" className="btn_01" title="검색">
                  검색
                </button>
              </p>
            </form>
          </div>

          <div className="find_listBox">
            <h2>습득물 게시판</h2>
            <table
              className="type01"
              summary="관리번호, 습득물명, 습득장소, 습득일자"
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
                  <th scope="col">습득물명</th>
                  <th scope="col">습득장소</th>
                  <th scope="col">습득일자</th>
                </tr>
              </thead>
              <tbody>{/* 검색 결과를 여기에 표시 */}</tbody>
            </table>
            <a
              href="#"
              className="subMenu_select"
              onClick={handleUploadClick}
            >
              습득물 게시물 등록
            </a>
          </div>
          <nav id="sub_lnb">
            <ul>
              <li>
                <a
                  href="#"
                  className="subMenu_select"
                  onClick={handleUploadClick}
                >
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

export default PF_Find;
