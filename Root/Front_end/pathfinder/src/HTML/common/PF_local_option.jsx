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
      <label>지역</label>

      <input
        type="text"
        id="LST_SIGUNGU"
        name="LST_SIGUNGU"
        className="input"
        maxLength="100"
      />
    </fieldset>
  );
};

export default PF_LCT_CD_option;
