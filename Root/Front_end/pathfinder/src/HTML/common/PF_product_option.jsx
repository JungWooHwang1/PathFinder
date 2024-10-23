import React from "react";
import { useState } from "react";

const PF_PRDT_CL_NM_option = () => {
  const [formData, setFormData] = useState({
    classifiName: "",
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
        name="classifiName"
        id="classifiName"
        value={formData.PRDT_CL_NM}
        readOnly
        title="분류명 입력"
        onChange={handleChange}
        className="search"
        style={{ display: "inline-block" }}
      >
        <option value="">선택</option>
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
    </fieldset>
  );
};

export default PF_PRDT_CL_NM_option;
