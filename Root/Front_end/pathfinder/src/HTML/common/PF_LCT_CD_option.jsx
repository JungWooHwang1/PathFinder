import React from "react";
import { useState } from "react";

const PF_LCT_CD_option = () => {
  const [formData, setFormData] = useState({
    PRDT_CL_NM: "",
    START_YMD: "20240721",
    END_YMD: "20240919",
    LST_PRDT_NM: "",
    LST_LCT_CD: "",
    LST_PLACE: "",
    P_ATC_ID: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <fieldset className="lost_inputbox">
      <legend>지역 입력</legend>
      <label htmlFor="fdLctCd">지역</label>
      <select
        name="FD_LCT_CD"
        id="fdLctCd"
        className="search_text1"
        title="지역 선택"
        value={formData.FD_LCT_CD}
        onChange={handleChange}
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
        <option value="LCE000">기타</option>
      </select>
    </fieldset>
  );
};

export default PF_LCT_CD_option;
