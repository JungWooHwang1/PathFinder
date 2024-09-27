import React from "react";
import { Link } from "react-router-dom";

const PF_Paging = () => {
  return (
    <div id="paging" className="paging">
      {/* 페이징 영역 */}
      <a href="#none" className="first">
        처음
      </a>
      <a href="#none" className="prev">
        이전
      </a>
      <a href="#none" className="on">
        <strong>1</strong>
      </a>
      <a href="#none" className="next">
        다음
      </a>
      <a href="#none" className="last">
        마지막
      </a>
    </div>
  );
};

export default PF_Paging;
