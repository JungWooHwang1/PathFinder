import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../CSS/SearchResult.css";
import PF_Nav from "./common/PF_Nav";
import PF_Header from "./common/PF_Header";

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get("query");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      fetch(`/boards/search-all?title=${encodeURIComponent(searchTerm)}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data))
        .catch((error) => console.error(error));
    }
  }, [searchTerm]);

  return (
    <div className="body">
      <PF_Header />
      <div className="PF_container">
        <PF_Nav />
        <div className="find_listBox">
          <h2 className="search-result-text">검색 결과</h2>
          {searchTerm && (
            <p className="search-description">
              "{searchTerm}"에 대한 검색 결과를 보여줍니다.
            </p>
          )}
          {searchResults.length > 0 ? (
            <table className="type01" summary="제목, 내용, 작성일자">
              <colgroup>
                <col style={{ width: "auto" }} />
                <col style={{ width: "200px" }} />
                <col style={{ width: "110px" }} />
              </colgroup>
              <thead>
                <tr className="result-board">
                  <th scope="col" className="title">
                    제목
                  </th>
                  <th scope="col" className="content">
                    내용
                  </th>
                  <th scope="col" className="uplode-date">
                    작성일
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result, index) => (
                  <tr className="result-board" key={index}>
                    <td className="boardtitle">{result.boardTitle}</td>
                    <td className="boardcontent">{result.boardContent}</td>
                    <td className="boarddate">{result.createDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="non-result">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
