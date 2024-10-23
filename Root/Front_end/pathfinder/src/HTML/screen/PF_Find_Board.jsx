import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import PF_Header from "../common/PF_Header";
import PF_Nav from "../common/PF_Nav";

const PF_Find_Upload = () => {
  //스크립트 파일 읽어오기
  const new_script = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", () => {
        resolve();
      });
      script.addEventListener("error", (e) => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    //카카오맵 스크립트 읽어오기
    const my_script = new_script(
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c4a41bf411d48221a36238c0e2fab540"
    );

    //스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => {
      console.log("script loaded!!!");
      const kakao = window["kakao"];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.56000302825312, 126.97540593203321), //좌표설정
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer, options); //맵생성
        //마커설정
        const markerPosition = new kakao.maps.LatLng(
          37.56000302825312,
          126.97540593203321
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    });
  }, []);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    boardTitle: "",
    acquirePropertyName: "",
    acquireArea: "",
    acquirePlace: "",
    acquirePlace_classifi: "",
    boardContent: "",
    propertyColor: "",
    propertyType: "",
    reporterPhone: "",
    etc: "",
    acquirePlace_adress1: "",
    acquirePlace_adress2: "",
    acquirePlace_adress3: "",
    acquirePlace_adress4: "",
    acquirePlace_adress5: "",
    memberNickName: "1111", // 로그인된 사용자의 닉네임으로 수정 필요
    classifiName: "", // 초기 상태에 classifiName 추가
  });

  // 특정 게시물 정보 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await fetch(
            `/boards/acquire-property-board/${postId}`
          );
          if (!response.ok) {
            throw new Error("게시물 정보를 가져오는 중 오류 발생");
          }
          const data = await response.json();
  
          // 서버로부터 가져온 데이터를 콘솔에 출력
          console.log("API로부터 가져온 데이터:", data);
  
          setPost(data);
          setFormData({
            ...formData,
            boardTitle: data.boardTitle,
            acquirePropertyName: data.acquirePropertyName,
            acquireArea: data.acquireArea,
            acquirePlace: data.acquirePlace,
            boardContent: data.boardContent,
            propertyColor: data.propertyColor,
            propertyType: data.propertyType,
            reporterPhone: data.reporterPhone,
            etc: data.etc,
            classifiName: data.classifiName, // classifiName 업데이트
          });
          
          // 이미지 미리보기 설정 (서버 이미지 경로로 설정)
          if (data.boardImage) {
            setImagePreview(`data:image/png;base64,${data.boardImage}`); // Base64 형식으로 설정
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    fetchPost();
  }, [postId]);
  

  // 이미지 파일 처리
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Base64 데이터로 설정
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 변환
    }
  };


  // 입력 필드 값 변경 핸들러
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 게시글 제출
  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      member: {
        memberNickName: formData.memberNickName, // 사용자 닉네임 가져오기
      },
      boardTitle: formData.boardTitle,
      classifiName: formData.classifiName,
      acquirePropertyName: formData.acquirePropertyName,
      acquireArea: formData.acquireArea,
      acquirePlace: formData.acquirePlace,
      acquirePlace_classifi: formData.acquirePlace_classifi,
      acquireDate: new Date().toISOString().slice(0, 10),
      boardContent: formData.boardContent,
      boardImage: imagePreview,
      propertyColor: formData.propertyColor,
      propertyType: formData.propertyType,
      reporterPhone: formData.reporterPhone,
      etc: formData.etc,
      acquirePlace_adress1: formData.acquirePlace_adress1,
      acquirePlace_adress2: formData.acquirePlace_adress2,
      acquirePlace_adress3: formData.acquirePlace_adress3,
      acquirePlace_adress4: formData.acquirePlace_adress4,
      acquirePlace_adress5: formData.acquirePlace_adress5,
    };

    console.log("Sending data:", postData);

    fetch(`/boards/acquire-property-board`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("게시글 작성 성공");
        console.log("게시글 ID:", data.postId);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("게시글 작성 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="body">
      <PF_Header />
      <div className="PF_container">
        <PF_Nav />
        <div id="content" tabIndex="-1">
          <div className="contents_common">
            <h2>{formData.boardTitle}</h2>
          </div>

          <form className="board-info" onSubmit={handleSubmit}>
            <div className="Box">
              <div className="titls01">습득정보</div>
              <table className="lost_insert">
                <tbody>
                  <tr>
                    <th scope="row">분류명</th>
                    <td>{formData.classifiName}</td>

                    <td colSpan="2"></td>
                  </tr>
                  <tr>
                    <th scope="row"> 분실 지역</th>
                    <td colSpan="3">{formData.acquireArea}</td>
                  </tr>
                  <tr>
                    <th scope="row">분실 장소</th>
                    <td>{formData.acquirePlace}</td>
                  </tr>
                  <tr>
                    <th scope="row">분실물명</th>
                    <td>{formData.acquirePropertyName}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* 추가 필드 */}
            <div className="Box">
              <div className="titls01">추가 정보</div>
              <table className="lost_insert">
                <tbody>
                  <tr>
                    <th>물품 색상</th>
                    <td>{formData.propertyColor}</td>
                  </tr>
                  <tr>
                    <th>신고자 연락처</th>
                    <td>{formData.reporterPhone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="img-box">
              <div className="img-name">물품 사진</div>
              {handleFileChange ? (
                <img
                  src={imagePreview} 
                  alt="물품 사진" 
                  style={{ maxWidth: "150px", height: "150px" }}
                />

              ) : (
                <p>이미지가 없습니다.</p>
              )}
            </div>
          </form>
          <div className="board-App">
            <div id="map" className="board-map" />
          </div>
        </div>
        <hr className="bottom_line" />

        <div className="append_lost">
          <p className="comment">예시 댓글 1</p>
          <p className="comment">예시 댓글 2</p>
          <p className="comment">예시 댓글 3</p>
          <div className="com">
            <input type="text" className="input-comment"></input>
            <br />
            <button className="find_comment">댓글 작성</button>
          </div>
        </div>
        <hr className="bottom_line" />
        <div className="find_info_btn2">
          <a
            href="/PF_Find"
            type="button"
            id="lostlist"
            name="lostlist"
            className="lostlist"
            title="습득물 목록"
          >
            목록
          </a>
        </div>
      </div>
    </div>
  );
};

export default PF_Find_Upload;
