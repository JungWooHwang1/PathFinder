import React from "react";
import { useState } from "react";

const PF_placeSeCd_option = () => {
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
      <legend>분실장소 입력</legend>
      <label htmlFor="placeSeCd">분실장소</label>
      <select
        name="PLACE_SE_CD"
        id="placeSeCd"
        title="분실장소 선택"
        value={formData.PLACE_SE_CD}
        onChange={handleChange}
        style={{ display: "inline-block" }}
      >
        <option value="">선택</option>
        {/* 추가 옵션들 */}
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
        <option value="LL1007">스포츠시설</option>
        <option value="LL1006">회사</option>
        <option value="LL1017">기타</option>
        <option value="LL1018">불상</option>
      </select>
    </fieldset>
  );
};

export default PF_placeSeCd_option;
