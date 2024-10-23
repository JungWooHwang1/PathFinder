import React, { useState, useEffect } from "react";
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import PF_Header from "../common/PF_Header";
import PF_Nav from "../common/PF_Nav";
import { useUser } from "../common/userContext";

const PF_Find_Upload = () => {
  const { user } = useUser(); // 현재 로그인한 사용자 정보 가져오기
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
    memberNickName: user?.memberNickName || "", 
    classifiName: "",
  });

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
    const my_script = new_script(
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c4a41bf411d48221a36238c0e2fab540"
    );

    my_script.then(() => {
      const kakao = window["kakao"];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.40410395971753, 126.93064874219576),
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer, options);

        const marker = new kakao.maps.Marker({
          position: map.getCenter(),
        });
        marker.setMap(map);

        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
          const latlng = mouseEvent.latLng;
          marker.setPosition(latlng);
        });
      });
    });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Base64 문자열로 변환
        const base64String = e.target.result.split(',')[1]; // 'data:image/jpeg;base64,...'에서 'base64...' 부분만 추출
        setFormData((prevData) => ({
          ...prevData,
          boardImage: base64String, // Base64 문자열을 formData에 추가
        }));
        // 이미지 미리보기 설정
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file); // 데이터를 URL 형식으로 읽음
    }
  };
  
  
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,  
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      member: {
        memberNickName: "1111", // 사용자가 입력한 값
      },
      boardTitle: formData.boardTitle,
      classifiName: formData.classifiName, 
      acquirePropertyName: formData.acquirePropertyName,
      acquireArea: formData.acquireArea,
      acquirePlace: formData.acquirePlace,
      acquirePlace_classifi: formData.acquirePlace_classifi,
      acquireDate: new Date().toISOString().slice(0, 10),
      boardContent: formData.boardContent,
      boardImage: formData.boardImage, // Base64 문자열
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
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        if (data.message) {
          alert(data.message);
          console.log("게시글 ID:", data.postId);
        } else {
          alert("게시글 작성 성공");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("분실물 게시글 작성 중 오류가 발생했습니다.");
      });
  };


  return (
    <div className="body">
      <PF_Header />
      <div className="PF_container">
        <PF_Nav />
        <div id="content" tabIndex="-1">
          <div className="contents_common">
            <h2>습득물 신고</h2>
            <span className="subtxt1">
              습득물 신고양식입니다. (*) 표시는 필수 입력 항목입니다.
            </span>
          </div>
  
          <form
            name="commandMap"
            id="commandMap"
            method="post"
            encType="multipart/form-data"
            action="#none"
            onSubmit={handleSubmit}
          >
            <input type="hidden" id="ORG_ID" name="ORG_ID" />
            <input type="hidden" id="COORD_X" name="COORD_X" />
            <input type="hidden" id="COORD_Y" name="COORD_Y" />
            <input type="hidden" id="LST_SIDO" name="LST_SIDO" />
            <input type="hidden" id="objectSeq" name="objectSeq" value="1" />
            <input type="hidden" id="CHRGR_ID" name="CHRGR_ID" />
            <input type="hidden" id="CHRGR_NM" name="CHRGR_NM" />
            <input type="hidden" id="ORG_ID2" name="ORG_ID2" />
  
            <div className="Box">
              <div className="titls01">습득정보</div>
              <table className="lost_insert">
                <tbody>
                  <tr>
                    <th scope="row"><em>*</em><label htmlFor="PRDT_CL_NM">분류명</label></th>
                    <td>
                      <select id="PRDT_CL_NM" name="classifiName" className="choice" onChange={handleChange}>
                        <option value="선택">선택</option>
                        <option value="가방">가방</option>
                        <option value="귀금속">귀금속</option>
                        <option value="도서용품">도서용품</option>
                        <option value="서류">서류</option>
                        <option value="산업용품">산업용품</option>
                        <option value="소핑백">소핑백</option>
                        <option value="스포츠용품">스포츠용품</option>
                        <option value="악기">악기</option>
                        <option value="유가증권">유가증권</option>
                        <option value="의류">의류</option>
                        <option value="자동차">자동차</option>
                        <option value="전자기기">전자기기</option>
                        <option value="지갑">지갑</option>
                        <option value="증명서">증명서</option>
                        <option value="컴퓨터">컴퓨터</option>
                        <option value="카드">카드</option>
                        <option value="현금">현금</option>
                        <option value="휴대폰">휴대폰</option>
                        <option value="기타">기타</option>
                        <option value="유류품">유류품</option>
                      </select>
                    </td>
                    <td colSpan="2">
                      <div className="App">
                        <div id="map" className="map" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><em>*</em><label htmlFor="LST_Title">게시글 제목 입력</label></th>
                    <td><input type="text" id="LST_Title" name="boardTitle" className="input" onChange={handleChange} /></td>

                    <th scope="row"><em>*</em><label htmlFor="LST_LCT_CD">분실지역 ex)경기도 안양시</label></th>
                    <td colSpan="3"><input type="text" id="LST_SIGUNGU" name="acquireArea" className="input" maxLength="100" onChange={handleChange} /></td>
                  </tr>
                  <tr>
                    <th scope="row"><em>*</em><label htmlFor="LST_PLACE">분실장소</label></th>
                    <td><input id="LST_PLACE" name="acquirePlace" type="text" className="input" maxLength="50" onChange={handleChange} /></td>

                    <th scope="row"><em>*</em><label htmlFor="LST_NAME">분실물명</label></th>
                    <td><input type="text" id="LST_NAME" name="acquirePropertyName" className="input" onChange={handleChange} /></td>
                  </tr>
                  <tr>
                    <th scope="row"><em>*</em><label htmlFor="LST_DTE">분실일자</label></th>
                    <td><input type="date" id="LST_DTE" name="acquireDate" className="input" onChange={handleChange} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div className="Box">
              <div className="titls01">추가정보</div>
              <table className="lost_insert">
                <tbody>
                  <tr>
                    <th><label htmlFor="LST_COLOR">물품 색상</label></th>
                    <td><input type="text" id="LST_COLOR" name="propertyColor" className="input" onChange={handleChange} /></td>

                    <th><label htmlFor="LST_PHONE">신고자 연락처</label></th>
                    <td><input type="text" id="LST_PHONE" name="reporterPhone" className="input" onChange={handleChange} /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="LST_FEATURE">물품 특징</label></th>
                    <td><input type="text" id="LST_FEATURE" name="propertyType" className="input" onChange={handleChange} /></td>

                    <th><label htmlFor="LST_NOTE">게시글 내용</label></th>
                    <td><textarea type="text" id="LST_NOTE" name="boardContent" className="input" maxLength="100" onChange={handleChange} placeholder="상세 제원을 입력해주세요"/></td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div className="Box">
              <div className="titls01">파일첨부</div>
              <table className="lost_insert" summary="파일첨부 입력">
                <tbody>
                  <tr>
                    <th><label htmlFor="LST_FILE">파일첨부</label></th>
                    <td>
                      <input type="file" id="LST_FILE" name="boardImage" title="파일 첨부" accept="image/*" onChange={handleFileChange} />
                      <span className="f_red"><b>이미지 파일만 업로드 가능(파일형식: JPG, JPEG, PNG)</b></span>
                      {imagePreview && (
                        <div style={{ marginTop: "10px" }}>
                          <img src={imagePreview} alt="Preview" style={{ width: "200px", height: "auto", border: "1px solid #ccc" }} />
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div className="submit_area">
              <button type="submit" className="submit_btn">제출</button>
              <button type="reset" className="reset_btn">초기화</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default PF_Find_Upload;
