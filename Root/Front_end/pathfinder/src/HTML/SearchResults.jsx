import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
    const query = new URLSearchParams(useLocation().search);
    const searchTerm = query.get("query"); // URL의 'query' 파라미터에서 검색어 가져오기

    return (
        <div>
            <h1>검색 결과</h1>
            {searchTerm ? (
                <p>"{searchTerm}"에 대한 검색 결과를 보여줍니다.</p>
            ) : (
                <p>검색어가 없습니다.</p>
            )}
            {/* 여기에 실제 검색 결과 로직을 추가하면 됩니다 */}
        </div>
    );
};

export default SearchResults;
