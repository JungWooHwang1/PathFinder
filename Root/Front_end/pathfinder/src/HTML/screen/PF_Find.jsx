import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../common/userContext";
import Calendar from "react-calendar";
import PF_Nav from "../common/PF_Nav";
import PF_Header from "../common/PF_Header";
import "react-calendar/dist/Calendar.css";
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import PF_product_option from "../common/PF_product_option";
import PF_local_option from "../common/PF_local_option";
import PF_place_option from "../common/PF_place_option";
import PF_Paging from "../common/PF_Paging";

const PF_Find = () => {
  const { user } = useUser();
  const isLoggedIn = user !== null;
  const navigate = useNavigate();

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}${mm}${dd}`;
  };

  // 상태 관리
  const [formData, setFormData] = useState({
    LST_PRDT_NM: "",
    START_YMD: getTodayDate(),
    END_YMD: getTodayDate(),
    PLACE_SE_CD: "",
    FD_LCT_CD: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState("");
  const [date, setDate] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsPerPage] = useState(10); // 페이지당 게시글 수
  const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 상태 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6자리 랜덤 숫자 생성
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log("검색 폼 제출:", formData);

    try {
      const queryParams = new URLSearchParams({
        prdtNm: formData.LST_PRDT_NM,
        startYmd: formData.START_YMD,
        endYmd: formData.END_YMD,
        placeSeCd: formData.PLACE_SE_CD,
        fdLctCd: formData.FD_LCT_CD,
      }).toString();

      const response = await fetch(
        `/boards/acquire-property-board?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("검색 결과를 가져오는 중 오류 발생");
      }

      const data = await response.json();
      console.log("검색 API 응답 데이터:", data);

      // 관리번호를 6자리 랜덤 숫자로 설정
      const dataWithRandomNumber = data.map((item) => ({
        ...item,
        managementNumber: generateRandomNumber(),
      }));

      // createDate 기준으로 내림차순 정렬
      const sortedData = dataWithRandomNumber.sort(
        (a, b) => new Date(b.createDate) - new Date(a.createDate)
      );
      setPosts(sortedData);
      setCurrentPage(1); // 검색 후 첫 페이지로 이동
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchLostItems = async () => {
    try {
      const response = await fetch("/boards/acquire-property-board");
      if (!response.ok) {
        throw new Error("분실물 목록을 가져오는 중 오류 발생");
      }
      const data = await response.json();
      console.log("API 응답 데이터:", data);

      // 관리번호를 6자리 랜덤 숫자로 설정
      const dataWithRandomNumber = data.map((item) => ({
        ...item,
        managementNumber: generateRandomNumber(),
      }));

      // createDate 기준으로 내림차순 정렬
      const sortedData = dataWithRandomNumber.sort(
        (a, b) => new Date(b.createDate) - new Date(a.createDate)
      );
      setPosts(sortedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.toISOString().split("T")[0].replace(/-/g, "");
    setFormData((prevData) => ({
      ...prevData,
      [calendarType]: formattedDate,
    }));
    setDate(newDate);
    setShowCalendar(false);
  };

  const handleCalendarToggle = (type) => {
    setCalendarType(type);
    setShowCalendar(true);
  };

  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUploadClick = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/PF_SigninForm");
    } else {
      navigate("/PF_Find_Upload");
    }
  };
  const getCalendarStyle = () => {
    if (calendarType === "START_YMD") {
      return { top: "120px", left: "600px" }; // startYMD 위에 위치 (원하는 좌표로 변경 가능)
    } else if (calendarType === "END_YMD") {
      return { top: "120px", right: "400px" }; // endYMD 위에 위치 (원하는 좌표로 변경 가능)
    }
    return {};
  };
  // 현재 페이지에 표시할 게시글
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 수 계산
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePostClick = (postId) => {
    navigate(`/PF_Find_Board/${postId}`); // 게시물 상세 페이지로 이동
  };

  return (
    <div className="body">
      <PF_Header />
      <div className="PF_container">
        <PF_Nav />
        <div id="contents">
          <h2>습득물 검색</h2>
          <div className="findList">
            <form
              name="commandMap"
              id="commandMap"
              method="post"
              action="#none"
              onSubmit={handleSearchSubmit}
            >
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
                      title="검색 시작일 달력 열기"
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
                      title="검색 종료일 달력 열기"
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
                <col style={{ width: "160px" }} />
                <col style={{ width: "160px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">관리번호</th>
                  <th scope="col">습득물명</th>
                  <th scope="col">습득장소</th>
                  <th scope="col">습득일자</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((post, index) => (
                  <tr
                    key={index}
                    onClick={() => handlePostClick(post.id)} // 클릭 시 상세 페이지로 이동
                    style={{ cursor: "pointer" }} // 클릭 가능한 스타일 추가
                    onMouseEnter={() => {
                      setPreviewImage(post.boardImage);
                    }}
                    onMouseLeave={() => {
                      setPreviewImage(null);
                    }}
                  >
                    <td>{post.id}</td>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      {post.boardImage && (
                        <div
                          className="preview-image"
                          style={{ position: "relative" }} // 위치를 상대적으로 설정
                        >
                          <img
                            style={{
                              opacity:
                                previewImage === post.boardImage ? "0.5" : "1", // 현재 게시물 이미지에 대해서만 불투명하게 설정
                              transition: "opacity 0.3s", // 불투명도 전환 효과
                            }}
                          />
                          {previewImage === post.boardImage && ( // 현재 게시물의 이미지일 때만 프리뷰 표시
                            <div
                              style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                backgroundColor: "rgba(255, 255, 255, 0.8)", // 반투명 배경
                                borderRadius: "5px",
                                padding: "5px",
                                zIndex: "1",
                              }}
                            >
                              <img
                                src={`data:image/jpeg;base64,${previewImage}`}
                                alt="Preview"
                                style={{ width: "100px", height: "auto" }} // 프리뷰 이미지 크기
                              />
                            </div>
                          )}
                        </div>
                      )}
                      {post.boardTitle}
                    </td>
                    <td>{post.acquirePlace}</td>
                    <td>{post.acquireDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <PF_Paging
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          <p style={{ textAlign: "center" }}>
            <button onClick={handleUploadClick} className="btn_01">
              습득물 등록
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PF_Find;
