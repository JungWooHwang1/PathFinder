import React, { useState, useEffect } from "react";
import "../CSS/PF_Main.css";
import "../CSS/PF_Write.css";

const PF_Find_Upload = () => {
  const [showMap, setShowMap] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c4a41bf411d48221a36238c0e2fab540`;
      script.async = true;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667),
              level: 3,
            };
            new window.kakao.maps.Map(container, options);
          });
        } else {
          console.error("Kakao Maps API가 로드되지 않았습니다.");
        }
      };

      document.head.appendChild(script);
    };

    if (showMap) {
      if (!window.kakao) {
        loadKakaoMap();
      } else {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      }
    }

    return () => {
      const existingScript = document.querySelector(
        `script[src*="dapi.kakao.com"]`
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [showMap]);

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

    if (!lstPlace || !lstDate || !lstLctCd || !lstSigungu || !lstName) {
      alert("필수 입력 항목을 모두 채워주세요.");
      return;
    }

    console.log("폼 제출 성공!");
  };

  return (
    <div className="body">
      <header className="PF_header">
        <img className="main_logo" src="" alt="main_logo" />
        <div className="search_area">
          <form className="search-box">
            <input
              className="search_txt"
              type="search"
              placeholder="검색어를 입력해 주세요."
              autoComplete="off"
            />
          </form>
        </div>
      </header>
      <div className="PF_container">
        <nav className="PF_nav">
          <ul>
            <li>
              <a href="#">찾아주세요!(분실물)</a>
            </li>
            <li>
              <a href="#">찾아가세요(습득물)</a>
            </li>
            <li>
              <a href="#">사라졌어요!(반려동물)</a>
            </li>
            <li>
              <a href="#">급해요!(현상수배)</a>
            </li>
          </ul>
        </nav>
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
                    <th scope="row">
                      <em>*</em>
                      <label htmlFor="LST_LCT_CD">습득지역</label>
                    </th>
                    <td colSpan="3">
                      <button
                        id="MAP"
                        name="MAP"
                        type="button"
                        className="btn_map"
                        onClick={() => setShowMap(!showMap)}
                      >
                        지도입력
                      </button>

                      {showMap && <div id="map" className="map"></div>}

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
                        <option value="LCF000">해외</option>
                        <option value="LCE000">기타</option>
                      </select>
                      <input
                        type="text"
                        id="LST_SIGUNGU"
                        name="LST_SIGUNGU"
                        className="input"
                        maxLength="10"
                      />
                      <span className="f_red">
                        <b>시군구 ex) 서대문구, 상주시, 철원군</b>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <em>*</em>
                      <label htmlFor="LST_PLACE">습득장소</label>
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
                      <label htmlFor="LST_PLACE_SE_CD">습득장소 분류</label>
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
                        <option value="LL1018">불상</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <em>*</em>
                      <label htmlFor="LST_DTE">습득일자</label>
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
                      <label htmlFor="LST_NAME">습득물 명</label>
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
                      <label htmlFor="LST_BREED">종류</label>
                    </th>
                    <td>
                      <input
                        type="text"
                        id="LST_BREED"
                        name="LST_BREED"
                        className="input"
                      />
                    </td>
                    <th>
                      <label htmlFor="LST_COLOR">색상</label>
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
                      <label htmlFor="LST_FEATURE">특징</label>
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
                      <label htmlFor="LST_PHONE">연락처</label>
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

export default PF_Find_Upload;
