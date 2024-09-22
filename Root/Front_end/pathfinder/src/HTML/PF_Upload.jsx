import React, { useState } from "react";
import Calendar from "react-calendar";
import "../CSS/PF_Main.css";
import "../CSS/PF_Write.css";
import "react-calendar/dist/Calendar.css"; // 스타일을 import

const PF_Upload = () => {
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
          >
            <input type="hidden" id="ORG_ID" name="ORG_ID" />
            <input type="hidden" id="COORD_X" name="COORD_X" />
            <input type="hidden" id="COORD_Y" name="COORD_Y" />
            <input type="hidden" id="LST_SIDO" name="LST_SIDO" />
            <input type="hidden" id="objectSeq" name="objectSeq" value="1" />
            <input type="hidden" id="CHRGR_ID" name="CHRGR_ID" />
            <input type="hidden" id="CHRGR_NM" name="CHRGR_NM" />
            <input type="hidden" id="ORG_ID2" name="ORG_ID2" />

            {/* 분실정보 */}
            <div className="Box" style={{ zIndex: 100 }}>
              <div className="titls01">분실정보</div>
              <table
                className="lost_insert"
                summary="분실지역, 분실장소, 분실장소 분류, 분실일자 입력"
              >
                <caption>분실정보 입력표</caption>
                <colgroup>
                  <col width="16%" />
                  <col width="41%" />
                  <col width="16%" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      <em>*</em>
                      <label htmlFor="LST_LCT_CD">
                        분실지역
                        <span className="blind">
                          ※ 지도입력으로 시군구, 읍면동까지 자동 입력 됩니다.
                        </span>
                      </label>
                    </th>
                    <td colSpan="3">
                      <button
                        id="MAP"
                        name="MAP"
                        type="button"
                        className="btn_map"
                        title="지도입력 새창"
                      >
                        지도입력
                      </button>
                      <select
                        name="LST_LCT_CD"
                        id="LST_LCT_CD"
                        className="choice"
                        title="시도 입력"
                        style={{ display: "inline-block" }}
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
                      <label htmlFor="LST_SIGUNGU" className="blind">
                        상세지역입력
                      </label>
                      <input
                        type="text"
                        id="LST_SIGUNGU"
                        name="LST_SIGUNGU"
                        className="input"
                        title="시,군,구 입력"
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
                      <label htmlFor="LST_PLACE">분실장소</label>
                    </th>
                    <td>
                      <input
                        id="LST_PLACE"
                        name="LST_PLACE"
                        type="text"
                        size="35"
                        className="input valign-m"
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
                        style={{ display: "inline-block" }}
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

            {/* 추가정보 */}
            <div className="Box">
              <div className="titls01">추가정보</div>
              <table className="lost_insert" summary="추가정보 입력">
                <caption>추가정보 입력표</caption>
                <colgroup>
                  <col width="16%" />
                  <col width="41%" />
                  <col width="16%" />
                  <col width="*" />
                </colgroup>
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
                        title="종류 입력"
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
                        title="색상 입력"
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
                        title="특징 입력"
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
                        title="연락처 입력"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 파일첨부 */}
            <div className="Box">
              <div className="titls01">파일첨부</div>
              <table className="lost_insert" summary="파일첨부 입력">
                <caption>파일첨부 입력표</caption>
                <colgroup>
                  <col width="16%" />
                  <col width="*" />
                </colgroup>
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
                      />
                      <span className="f_red">
                        <b>
                          이미지 파일만 업로드 가능(파일형식: JPG, JPEG, PNG)
                        </b>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 개인정보 동의 */}
            <div className="Box">
              <div className="titls01">개인정보 동의</div>
              <table className="lost_insert" summary="개인정보 동의">
                <caption>개인정보 동의 입력표</caption>
                <colgroup>
                  <col width="16%" />
                  <col width="*" />
                </colgroup>
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
            </div>

            {/* 제출 버튼 */}
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

export default PF_Upload;
