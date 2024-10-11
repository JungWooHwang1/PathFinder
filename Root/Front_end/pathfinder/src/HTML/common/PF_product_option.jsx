import React from "react";
import { useState } from "react";

const PF_PRDT_CL_NM_option = () => {
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
      <legend>분류명 입력</legend>
      <label htmlFor="fdLctCd">분류명</label>
      <select
        name="PRDT_CL_NM"
        id="PRDT_CL_NM"
        value={formData.PRDT_CL_NM}
        readOnly
        title="분류명 입력"
        onChange={handleChange}
        className="search"
        style={{ display: "inline-block" }}
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
    </fieldset>
  );
};

export default PF_PRDT_CL_NM_option;
