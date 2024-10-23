import React from "react";

const PF_Paging = ({ totalPages, currentPage, onPageChange }) => {
  const createPageLinks = () => {
    const pageLinks = [];
    for (let i = 1; i <= totalPages; i++) {
      pageLinks.push(
        <a
          key={i}
          href="#none"
          className={currentPage === i ? "on" : ""}
          onClick={(e) => {
            e.preventDefault(); // 기본 링크 동작 방지
            onPageChange(i);
          }}
        >
          {i}
        </a>
      );
    }
    return pageLinks;
  };

  return (
    <div id="paging" className="paging">
      <a href="#none" className="first" onClick={() => onPageChange(1)}>
        처음
      </a>
      <a
        href="#none"
        className="prev"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        이전
      </a>
      {createPageLinks()}
      <a
        href="#none"
        className="next"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        다음
      </a>
      <a href="#none" className="last" onClick={() => onPageChange(totalPages)}>
        마지막
      </a>
    </div>
  );
};

export default PF_Paging;
