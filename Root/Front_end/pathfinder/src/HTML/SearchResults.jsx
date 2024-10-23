import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../CSS/SearchResult.css";

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
    <div className="find_listBox">
      <h2>검색 결과</h2>
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
            <tr>
              <th scope="col">제목</th>
              <th scope="col">내용</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index}>
                <td>{result.boardTitle}</td>
                <td>{result.boardContent}</td>
                <td>{result.createDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResults;
