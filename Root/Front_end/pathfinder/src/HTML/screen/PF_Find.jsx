import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PF_Nav from "../common/PF_Nav";
import PF_Header from "../common/PF_Header";
import "react-calendar/dist/Calendar.css";
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import PF_Paging from "../common/PF_Paging";
import PF_SearchForm from "../common/PF_SearchForm";
import { useUser } from "../common/userContext";  // UserContext에서 훅 가져오기

const PF_Find = () => {
  const { user } = useUser();
  const isLoggedIn = user !== null;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsPerPage] = useState(10); // 페이지당 게시글 수
  const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 상태 추가
  const [error, setError] = useState(null); // 오류 상태 추가

  const generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6자리 랜덤 숫자 생성
  };

  const fetchLostItems = async () => {
    try {
      const response = await fetch("/boards/AcquireProperty");
      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(`Error: ${response.status} ${response.statusText} - ${errorData.message}`);
        } else {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
      }
      if (contentType && contentType.includes("application/json")) {
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
      } else {
        throw new Error("Unexpected content type");
      }
    } catch (error) {
      console.error("Error fetching lost items:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchLostItems();
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
          <PF_SearchForm></PF_SearchForm>

          {error && <p style={{ color: 'red' }}>오류 발생: {error}</p>} {/* 오류 메시지 표시 */}

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
                  <th scope="col">작성일자</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts
                  .slice()
                  .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
                  .map((post, index) => {
                    // createDate에서 날짜 부분만 추출하는 함수
                    const formatDate = (dateString) => {
                      const date = new Date(dateString);
                      return date.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식으로 변환
                    };
                    return (
                      <tr key={index} onClick={() => handlePostClick(post.id)} style={{ cursor: "pointer" }}
                        onMouseEnter={() => {
                          setPreviewImage(post.boardImage);
                        }}
                        onMouseLeave={() => {
                          setPreviewImage(null);
                        }}
                      >
                        <td>{post.managementNumber}</td>
                        <td style={{ display: "flex", alignItems: "center" }}>
                          {post.boardImage && (
                            <div className="preview-image" style={{ position: 'relative' }} >
                              <img style={{ opacity: previewImage === post.boardImage ? '0.5' : '1', transition: 'opacity 0.3s' }} />
                              {previewImage === post.boardImage && ( // 현재 게시물의 이미지일 때만 프리뷰 표시
                                <div style={{
                                  position: 'absolute',
                                  top: '0',
                                  left: '0',
                                  right: '0',
                                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                  borderRadius: '5px',
                                  padding: '5px',
                                  zIndex: '1',
                                }}>
                                  <img src={`data:image/jpeg;base64,${previewImage}`} alt="Preview" style={{ width: '100px', height: 'auto' }} />
                                </div>
                              )}
                            </div>
                          )}
                          {post.boardTitle}
                        </td>
                        <td>{post.place}</td>
                        <td>{post.date}</td>
                        <td>{formatDate(post.createDate)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <br />
            <PF_Paging currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
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