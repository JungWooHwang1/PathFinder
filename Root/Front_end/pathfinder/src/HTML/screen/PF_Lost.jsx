import React, { useState, useEffect, useRef } from "react";
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
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줌
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}${mm}${dd}`; // yyyyMMdd 형식으로 반환
  };
  const [formData, setFormData] = useState({
    LST_PRDT_NM: "",
    START_YMD: "",
    END_YMD: "",
    LST_LCT_CD: "",
    LST_PLACE: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState("");
  const [date, setDate] = useState(new Date());
  const [boardData, setBoardData] = useState([]);
  const { user } = useUser();
  const isLoggedIn = user !== null;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUploadClick = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/PF_SigninForm");
    } else {
      navigate("/PF_Lost_Upload");
    }
  };

  useEffect(() => {
    fetch("/boards/lost-property-board")
      .then((response) => {
        if (!response.ok) throw new Error("게시글을 불러오는 중 오류 발생");
        return response.json();
      })
      .then((data) => {
        setBoardData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
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
    // 검색 로직 추가 필요
    console.log("검색 폼 제출:", formData);
  };

  const calendarRef = useRef(null); // 달력 DOM 참조
  // 날짜 변경 핸들러
  const handleDateChange = (newDate) => {
    const formattedDate = newDate.toISOString().split("T")[0].replace(/-/g, "");
    if (calendarType === "START_YMD") {
      setFormData((prevData) => ({ ...prevData, START_YMD: formattedDate }));
    } else if (calendarType === "END_YMD") {
      setFormData((prevData) => ({ ...prevData, END_YMD: formattedDate }));
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
  const getCalendarStyle = () => {
    if (calendarType === "START_YMD") {
      return { top: "120px", left: "600px" }; // startYMD 위에 위치 (원하는 좌표로 변경 가능)
    } else if (calendarType === "END_YMD") {
      return { top: "120px", right: "400px" }; // endYMD 위에 위치 (원하는 좌표로 변경 가능)
    }
    return {};
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
                  <div
                    className="calendar-popup"
                    ref={calendarRef}
                    style={getCalendarStyle()}
                  >
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
                  <th scope="col" className="first">관리번호</th>
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
            totalPages={Math.ceil(boardData.length / postsPerPage)}
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
