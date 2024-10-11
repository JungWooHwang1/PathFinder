import React, { useState, useEffect } from "react";
import "../../CSS/PF_Main.css";
import "../../CSS/PF_Write.css";
import PF_Header from "../common/PF_Header";
import PF_Nav from "../common/PF_Nav";

const PF_Lost_Upload = () => {
  const [imagePreview, setImagePreview] = useState(null);
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

    const lstPlace = document.getElementById("LST_PLACE").value;
    const lstDate = document.getElementById("LST_DTE").value;
    const lstLctCd = document.getElementById("LST_LCT_CD").value;
    const lstSigungu = document.getElementById("LST_SIGUNGU").value;
    const lstName = document.getElementById("LST_NAME").value;
    const lstCl = document.getElementById("PRDT_CL_NM").value;
    const lstTi = document.getElementById("LST_Title").value;

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
  }; //필수 입력 항목을 입력하지 않으면 페이지이동을 제어하는 핸들

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

                    <th scope="row">
                      <em>*</em>
                      <label htmlFor="LST_LCT_CD">분실지역</label>
                    </th>
                    <td colSpan="3">
                      <select
                        name="LST_LCT_CD"
                        id="LST_LCT_CD"
                        className="choice"
                      >
                        <option value="">선택</option>
                        <option value="LCA000">서울특별시</option>
                        <option value="LCH000">강원도</option>
                        <option value="LCI000">경기도</option>
                        <option value="LCJ000">경상남도</option>
                        <option value="LCK000">경상북도</option>
                        <option value="LCQ000">광주광역시</option>
                        <option value="LCR000">대구광역시</option>
                        <option value="LCS000">대전광역시</option>
                        <option value="LCT000">부산광역시</option>
                        <option value="LCU000">울산광역시</option>
                        <option value="LCV000">인천광역시</option>
                        <option value="LCL000">전라남도</option>
                        <option value="LCM000">전라북도</option>
                        <option value="LCN000">충청남도</option>
                        <option value="LCO000">충청북도</option>
                        <option value="LCP000">제주특별자치도</option>
                        <option value="LCW000">세종특별자치시</option>
                        <option value="LCE000">기타</option>
                      </select>
                      <input
                        type="text"
                        id="LST_SIGUNGU"
                        name="LST_SIGUNGU"
                        className="input"
                        maxLength="10"
                      />
                    </td>
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
                      <label htmlFor="LST_PLACE_SE_CD">분실장소 분류</label>
                    </th>
                    <td>
                      <select
                        id="LST_PLACE_SE_CD"
                        name="LST_PLACE_SE_CD"
                        className="choice"
                      >
                        <option value="">선택</option>
                        <option value="LL1011">우체국(통)</option>
                        <option value="LL1015">노상</option>
                        <option value="LL1005">기차</option>
                        <option value="LL1003">지하철</option>
                        <option value="LL1012">백화점/매장</option>
                        <option value="LL1002">택시</option>
                        <option value="LL1014">음식점(업소포함)</option>
                        <option value="LL1008">공공기관</option>
                        <option value="LL1001">버스</option>
                        <option value="LL1016">주택</option>
                        <option value="LL1004">공항</option>
                        <option value="LL1013">상점</option>
                        <option value="LL1020">영화관</option>
                        <option value="LL1009">놀이공원</option>
                        <option value="LL1010">유원지</option>
                        <option value="LL1007">학교</option>
                        <option value="LL1006">회사</option>
                        <option value="LL1017">기타</option>
                        <option value="LL1018">알 수 없음</option>
                      </select>
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
                  <tr>
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
                    <th>
                      <label htmlFor="LST_NOTE">비고</label>
                    </th>
                    <td>
                      <input
                        type="text"
                        id="LST_NOTE"
                        name="LST_NOTE"
                        className="input"
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
              <button type="submit" className="submit_btn">
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
