import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import PF_Header from "../common/PF_Header";
import PF_Nav from "../common/PF_Nav";

const PF_Find_Upload = () => {
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
 // 특정 게시물 정보 가져오기
useEffect(() => {
  const fetchPost = async () => {
    if (postId) {
      try {
        const response = await fetch(`/boards/acquire-property-board/${postId}`);
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
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
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

          <form onSubmit={handleSubmit}>
            <div className="Box">
              <div className="titls01">습득정보</div>
              <table className="lost_insert">
                <tbody>
                  <tr>
                    <th scope="row">분류명</th>
                    <td>{formData.classifiName}</td>
                   
                    <td colSpan="2">
                      <div className="App">
                        <div id="map" className="map" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"> 분실 지역</th>
                    <td colSpan="3">{formData.acquireArea}</td>
                  </tr>
                  <tr>
                    <th scope="row">분실 장소</th>
                    <td>{formData.acquirePlace}</td>
                    <th scope="row">분실물명</th>
                    <td>{formData.acquirePropertyName}</td>
                  </tr>
                  {/* 추가 필드 */}
                </tbody>
              </table>
            </div>
            <div className="Box">
              <div className="titls01">추가 정보</div>
              <table className="lost_insert">
                <tbody>
                  <tr>
                    <th>물품 색상</th>
                    <td><input type="text" name="propertyColor" value={formData.propertyColor} onChange={handleChange} /></td>
                    <th>신고자 연락처</th>
                    <td><input type="text" name="reporterPhone" value={formData.reporterPhone} onChange={handleChange} /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default PF_Find_Upload;
