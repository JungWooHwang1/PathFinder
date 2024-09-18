import { Component } from "react";
import Axios from "axios"; // Axios를 사용해 서버로부터 데이터를 가져옵니다.
import Table from "react-bootstrap/Table"; // React-Bootstrap의 Table 컴포넌트 사용
import Button from "react-bootstrap/Button"; // React-Bootstrap의 Button 컴포넌트 사용
import React from "react";
import "../CSS/PF_Main.css";
import "../CSS/Write.css";

// 게시판 항목(Board)을 렌더링하는 함수형 컴포넌트
const Board = ({
    id,
    title,
    registerId,
    registerDate,
}: {
    id: number; // 게시물 번호
    title: string; // 게시물 제목
    registerId: string; // 작성자 ID
    registerDate: string; // 작성 날짜
}) => {
    return (
        <tr>
            <td>{id}</td> {/* 게시물 번호 출력 */}
            <td>{title}</td> {/* 게시물 제목 출력 */}
            <td>{registerId}</td> {/* 작성자 ID 출력 */}
            <td>{registerDate}</td> {/* 작성 날짜 출력 */}
        </tr>
    );
};

/**
 * PF_Lost 클래스
 * 이 클래스는 게시판 데이터를 서버로부터 가져와 목록을 보여주는 기능을 합니다.
 */
class PF_Lost extends Component {
    state = {
        boardList: [], // 게시판 목록을 저장할 상태값
    };

    // 서버로부터 게시판 목록을 가져오는 함수
    getList = () => {
        Axios.get("http://localhost:8000/list", {}) // 서버에서 게시판 목록을 가져옴
            .then((res) => {
                const { data } = res; // 응답에서 데이터 추출
                this.setState({
                    boardList: data, // 데이터를 state에 저장
                });
            })
            .catch((e) => {
                console.error(e); // 오류 발생 시 콘솔에 출력
            });
    };

    /**
     * 컴포넌트가 처음 마운트되었을 때 호출되는 라이프사이클 메서드
     * 이 메서드에서 게시판 목록을 불러옴
     */
    componentDidMount() {
        this.getList(); // 컴포넌트가 마운트될 때 목록을 가져오는 함수 호출
    }

    render() {
        const { boardList }: { boardList: any } = this.state; // state에서 게시판 목록을 가져옴

        return (
            <>
                <header className="PF_header">
                    <img className="main_logo" src="" alt="main_logo" />
                    <div className="search_area">
                        {/* 검색 영역 */}
                        <form className="serch-box" action="" method="get">
                            <input
                                className="search_txt"
                                type="search"
                                title="검색어를 입력해 주세요."
                                placeholder="검색어를 입력해 주세요."
                                autoComplete="off"
                                data-atcmp-element
                            ></input>
                        </form>
                    </div>
                </header>
                <div className="PF_container">
                    <div>
                        <nav className="PF_nav">
                            <ul>
                                {/* 네비게이션 메뉴 */}
                                <li>
                                    <a href="">찾아주세요!(분실물)</a>
                                </li>
                                <li>
                                    <a href="">찾아가세요(습득물)</a>
                                </li>
                                <li>
                                    <a href="">사라졌어요!(반려동물)</a>
                                </li>
                                <li>
                                    <a href="">급해요!(현상수배)</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <Table striped bordered hover>
                            {/* 테이블 헤더 */}
                            <thead>
                                <tr className="borad-information">
                                    <th id="borad-num">번호</th>
                                    <th id="borad-title">제목</th>
                                    <th id="borad-writer">작성자</th>
                                    <th id="borad-date">작성일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* 게시판 목록을 출력하는 부분 */}
                                {boardList.map((v: any) => {
                                    return (
                                        <Board
                                            id={v.BOARD_ID} // 서버에서 가져온 게시물 ID
                                            title={v.BOARD_TITLE} // 서버에서 가져온 게시물 제목
                                            registerId={v.REGISTER_ID} // 작성자 ID
                                            registerDate={v.REGISTER_DATE} // 작성일
                                        />
                                    );
                                })}
                            </tbody>
                        </Table>
                        {/* 버튼들 */}
                        <Button variant="info">글쓰기</Button> {/* 글쓰기 버튼 */}
                        <Button variant="secondary">수정하기</Button> {/* 수정하기 버튼 */}
                        <Button variant="danger">삭제하기</Button> {/* 삭제하기 버튼 */}
                    </div>
                </div>
            </>
        );
    }
}

export default PF_Lost;
