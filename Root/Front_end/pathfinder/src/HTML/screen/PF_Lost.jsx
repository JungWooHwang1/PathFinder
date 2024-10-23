import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../common/userContext";
import Calendar from "react-calendar";
import PF_Nav from "../common/PF_Nav";
import PF_Header from "../common/PF_Header";
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import "react-calendar/dist/Calendar.css";
import PF_local_option from "../common/PF_local_option";
import PF_place_option from "../common/PF_place_option";
import PF_Paging from "../common/PF_Paging";
import PF_product_option from "../common/PF_product_option";
import "../../CSS/PF_Lost.css";

const PF_Lost = () => {
  const [formData, setFormData] = useState({
    PRDT_CL_NM: "",
    START_YMD: "20240721",
    END_YMD: "20240919",
    LST_PRDT_NM: "",
    LST_LCT_CD: "",
    LST_PLACE: "",
    P_ATC_ID: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState("");
  const [date, setDate] = useState(new Date());
  const [boardData, setBoardData] = useState([]);
  const { user } = useUser(); // user가져오기
  const isLoggedIn = user !== null; // 로그인 여부 확인
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 10; // 페이지당 게시글 수
  const totalPages = Math.ceil(boardData.length / postsPerPage); // 전체 페이지 수

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUploadClick = (event) => {
    event.preventDefault();
    console.log("isLoggedIn 상태:", isLoggedIn);
    console.log("user 상태:", user);
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/PF_SigninForm"); // 로그인 페이지로 이동
    } else {
      navigate("/PF_Lost_Upload"); // 게시물 등록 페이지로 이동
    }
  };

  useEffect(() => {
    fetch("/boards/lost-property-board")
      .then((response) => {
        if (!response.ok) {
          throw new Error("게시글을 불러오는 중 오류 발생");
        }
        return response.json();
      })
      .then((data) => {
        console.log("게시글 데이터:", data); // 추가된 디버그 로그
        setBoardData(data); // API에서 받은 데이터를 상태로 저장
      })
      .catch((error) => {
        console.error("Error:", error); // 오류 메시지 출력
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("검색 폼 제출:", formData);
  };

  const handleCalendarToggle = (type) => {
    setCalendarType(type);
    setShowCalendar((prev) => !prev);
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

  // 현재 페이지에 해당하는 게시글 계산
  const currentPosts = boardData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="body">
      <PF_Header />
      <div className="PF_container">
        <PF_Nav />
        <div id="contents">
          <h2>분실물 검색</h2>
          <form onSubmit={handleSearchSubmit}>
            <div className="findList">
              <div className="lost_qfind2">
                <div className="left-section">
                  <PF_product_option />

                  <fieldset className="lost_inputbox">
                    <legend>분실물명 입력</legend>
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
                  <legend>분실기간 입력</legend>
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
              <p className="search-button">
                <button type="submit" className="btn_01" title="분실물 검색">
                  검색
                </button>
              </p>
            </div>
          </form>

          <div className="find_listBox">
            <h2>분실물 게시판</h2>
            <table
              className="type01"
              summary="관리번호, 분실물명, 분실장소, 분실일자"
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
                  <th scope="col">제목</th>
                  <th scope="col">분실장소</th>
                  <th scope="col">분실일자</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((board) => (
                  <tr key={board.id}>
                    <td>{board.id}</td>
                    <td>{board.boardTitle}</td>
                    <td>{board.lostPlace}</td>
                    <td>{board.createDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PF_Paging
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="upload_button">
          <a onClick={handleUploadClick}>습득물 등록</a>
        </div>
      </div>
    </div>
  );
};

export default PF_Lost;
