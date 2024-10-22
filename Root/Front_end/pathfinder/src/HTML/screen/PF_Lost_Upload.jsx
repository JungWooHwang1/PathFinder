import React, { useState, useEffect } from "react";
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import PF_Header from "../common/PF_Header";
import PF_Nav from "../common/PF_Nav";

const PF_Lost_Upload = () => {
  const [imagePreview, setImagePreview] = useState("");
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
    // 카카오맵 스크립트 읽어오기
    const my_script = new_script(
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c4a41bf411d48221a36238c0e2fab540"
    );

    // 스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => {
      console.log("script loaded!!!");
      const kakao = window["kakao"];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.40410395971753, 126.93064874219576), // 좌표 설정
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer, options); // 지도 생성

        // 마커 생성
        const marker = new kakao.maps.Marker({
          position: map.getCenter(), // 지도 중심 좌표에 마커 생성
        });
        marker.setMap(map);

        // 클릭 이벤트 등록
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
          // 클릭한 위도, 경도 정보를 가져옴
          const latlng = mouseEvent.latLng;

          // 마커 위치를 클릭한 위치로 옮김
          marker.setPosition(latlng);
        });
      });
    });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // 각 요소에 대해 null 체크 추가
    const lstPlaceElement = document.getElementById("LST_PLACE");
    const lstDateElement = document.getElementById("LST_DTE");
    const lstLctCdElement = document.getElementById("LST_LCT_CD");
    const lstSigunguElement = document.getElementById("LST_SIGUNGU");
    const lstNameElement = document.getElementById("LST_NAME");
    const lstClElement = document.getElementById("PRDT_CL_NM");
    const lstTiElement = document.getElementById("LST_Title");
  
    const lstPlace = lstPlaceElement ? lstPlaceElement.value : "";
    const lstDate = lstDateElement ? lstDateElement.value : "";
    const lstLctCd = lstLctCdElement ? lstLctCdElement.value : "";
    const lstSigungu = lstSigunguElement ? lstSigunguElement.value : "";
    const lstName = lstNameElement ? lstNameElement.value : "";
    const lstCl = lstClElement ? lstClElement.value : "";
    const lstTi = lstTiElement ? lstTiElement.value : "";
  
    if (
      !lstPlace ||
      !lstDate ||
      !lstLctCd ||
      !lstSigungu ||
      !lstName ||
      !lstCl ||
      !lstTi
    ) {
      alert("필수 입력 항목을 모두 채워주세요.");
      return;
    }
  
    console.log("폼 제출 성공!");
  };
  

  return (
    <div className="body">
      <PF_Header />
      <div className="PF_container">
        <PF_Nav />
        <div id="content" tabIndex="-1">
          <div className="contents_common">
            <h2>분실물 신고</h2>
            <span className="subtxt1">
              분실물 신고양식입니다. (*) 표시는 필수 입력 항목입니다.
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
              <div className="titls01">분실정보</div>
              <table className="lost_insert">
                <tbody>
                  <tr>
                    <th scope="row">
                      <em>*</em>
                      <label htmlFor="PRDT_CL_NM">분류명</label>
                    </th>
                    <td>
                      <select
                        id="PRDT_CL_NM"
                        name="PRDT_CL_NM"
                        className="choice"
                      >
                        <option value="">선택</option>
                        <option value="LCA000">가방</option>
                        <option value="LCH000">귀금속</option>
                        <option value="LCI000">도서용품</option>
                        <option value="LCJ000">서류</option>
                        <option value="LCK000">산업용품</option>
                        <option value="LCQ000">소핑백</option>
                        <option value="LCR000">스포츠용품</option>
                        <option value="LCS000">악기</option>
                        <option value="LCT000">유가증권</option>
                        <option value="LCU000">의류</option>
                        <option value="LCV000">자동차</option>
                        <option value="LCL000">전자기기</option>
                        <option value="LCM000">지갑</option>
                        <option value="LCN000">증명서</option>
                        <option value="LCO000">컴퓨터</option>
                        <option value="LCP000">카드</option>
                        <option value="LCW000">현금</option>
                        <option value="LCF000">휴대폰</option>
                        <option value="LCE000">기타</option>
                        <option value="LCE000">유류품</option>
                      </select>
                    </td>
                    <div className="App">
                      <div id="map" className="map" />
                    </div>
                  </tr>
                  <tr>
                    <th scope="row">
                      <em>*</em>
                      <label htmlFor="LST_Title">게시글 제목 입력</label>
                    </th>
                    <td>
                      <input
                        type="text"
                        id="LST_Title"
                        name="LST_Title"
                        className="input"
                      />
                    </td>
                    <th scope="row">
                      <em>*</em>
                      <label htmlFor="LST_LCT_CD">
                        분실지역 ex)경기도 안양시
                      </label>
                    </th>
                    <td colSpan="3">
                      <input
                        type="text"
                        id="LST_SIGUNGU"
                        name="LST_SIGUNGU"
                        className="input"
                        maxLength="100"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <em>*</em>
                      <label htmlFor="LST_PLACE">분실장소</label>
                    </th>
                    <td>
                      <input
                        id="LST_PLACE"
                        name="LST_PLACE"
                        type="text"
                        className="input"
                        maxLength="50"
                      />
                    </td>
                    <th scope="row">
                      <em>*</em>
                      <label htmlFor="LST_NAME">분실물명</label>
                    </th>
                    <td>
                      <input
                        type="text"
                        id="LST_NAME"
                        name="LST_NAME"
                        className="input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <em>*</em>
                      <label htmlFor="LST_DTE">분실일자</label>
                    </th>
                    <td>
                      <input
                        type="date"
                        id="LST_DTE"
                        name="LST_DTE"
                        className="input"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="Box">
              <div className="titls01">추가정보</div>
              <table className="lost_insert">
                <tbody>
                  <tr>
                    <th>
                      <label htmlFor="LST_COLOR">물품 색상</label>
                    </th>
                    <td>
                      <input
                        type="text"
                        id="LST_COLOR"
                        name="LST_COLOR"
                        className="input"
                      />
                    </td>
                    <th>
                      <label htmlFor="LST_PHONE">신고자 연락처</label>
                    </th>
                    <td>
                      <input
                        type="text"
                        id="LST_PHONE"
                        name="LST_PHONE"
                        className="input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="LST_FEATURE">물품 특징</label>
                    </th>
                    <td>
                      <input
                        type="text"
                        id="LST_FEATURE"
                        name="LST_FEATURE"
                        className="input"
                      />
                    </td>

                    <th>
                      <label htmlFor="LST_NOTE">비고</label>
                    </th>
                    <td>
                      <input
                        type="text"
                        id="LST_NOTE"
                        name="LST_NOTE"
                        className="input"
                        maxLength="100"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="Box">
              <div className="titls01">파일첨부</div>
              <table className="lost_insert">
                <tbody>
                  <tr>
                    <th>
                      <label htmlFor="LST_FILE">파일첨부</label>
                    </th>
                    <td>
                      <input
                        type="file"
                        id="LST_FILE"
                        name="LST_FILE"
                        title="파일 첨부"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {imagePreview && (
                        <div className="image-preview">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="preview-img"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* <div className="Box">
              <div className="titls01">개인정보 동의</div>
              <table className="lost_insert">
                <tbody>
                  <tr>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          id="PERSONAL_INFO"
                          name="PERSONAL_INFO"
                        />
                        <b>개인정보 수집 및 이용에 동의합니다.</b>
                      </label>
                    </th>
                    <td>
                      <a href="#" target="_blank">
                        개인정보 수집 및 이용에 관한 안내
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}

            <div className="submit_area">
              <button type="submit" className="submit_btn" onClick={handleSubmit}>
                제출
              </button>
              <button type="reset" className="reset_btn">
                초기화
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PF_Lost_Upload;
