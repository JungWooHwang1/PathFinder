import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import PF_Nav from "../common/PF_Nav";
import PF_Header from "../common/PF_Header";

import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import "react-calendar/dist/Calendar.css"; // 스타일을 import
import PF_LCT_CD_option from "../common/PF_local_option";
import PF_PRDT_CL_NM_option from "../common/PF_product_option";
import PF_placeSeCd_option from "../common/PF_place_option ";
import PF_Paging from "../common/PF_Paging";

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
  const [posts, setPosts] = useState([]); // 게시물 상태

  // 임시 데이터 (실제로는 API 호출을 통해 데이터를 가져와야 함)
  useEffect(() => {
    const tempPosts = [
      {
        id: 1,
        boardTitle: "지갑을 잃어버렸어요",
        lostPlace: "서울특별시 강남구",
        createDate: "2024-09-20",
      },
      {
        id: 2,
        boardTitle: "휴대폰을 분실했습니다",
        lostPlace: "부산광역시 해운대구",
        createDate: "2024-09-18",
      },
    ];
    setPosts(tempPosts);
  }, []);

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
                  <PF_PRDT_CL_NM_option />
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

                {/* 오른쪽  */}
                <div style={{ flex: 1, paddingLeft: "10px" }}>
                  {/* 분실지역 */}
                  <PF_LCT_CD_option />

                  {/* 분실장소 */}
                  <PF_placeSeCd_option />
                </div>
              </div>

              <p style={{ textAlign: "center" }}>
                <button type="submit" className="btn_01" title="분실물 검색">
                  검색
                </button>
              </p>
            </div>
          </form>

          {/* 게시물 목록 */}
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
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.boardTitle}</td>
                    <td>{post.lostPlace}</td>
                    <td>{post.createDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <a href="/PF_Lost_Board" className="board">
            분실물 게시물
          </a>
          <nav id="sub_lnb">
            <ul>
              <li>
                <a href="/PF_Lost_Upload" className="subMenu_select">
                  분실물 게시물 등록
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