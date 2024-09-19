import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"; // 변경된 경로
import "../CSS/PF_Main.css";
import "../CSS/Write.css";

class Write extends Component {
    state = {
        selectedImage: null, // 선택된 이미지를 저장할 상태
        imagePreviewUrl: null, // 이미지 미리보기 URL을 저장할 상태
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // 작성 완료 버튼을 클릭했을 때 실행할 로직
        console.log("작성 완료!");
    };

    handleCancel = () => {
        // 취소 버튼 클릭 시 실행할 로직
        console.log("취소되었습니다.");
    };

    handleImageChange = (e) => {
        const file = e.target.files[0]; // 선택된 파일 가져오기
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    selectedImage: file,
                    imagePreviewUrl: reader.result, // 파일을 읽은 결과 (이미지 URL)
                });
            };
            reader.readAsDataURL(file); // 파일을 읽어 Data URL로 변환
        }
    };

    handleImageCancel = () => {
        // 이미지 선택을 취소할 때 호출되는 함수
        this.setState({
            selectedImage: null,
            imagePreviewUrl: null,
        });
    };

    render() {
        const { imagePreviewUrl } = this.state; // 상태에서 이미지 미리보기 URL 가져오기

        return (
            <div className="PF_container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="up-title" controlId="Input-title">
                        <Form.Label>제목</Form.Label>
                        <Form.Control type="text" placeholder="제목을 입력하세요" />
                    </Form.Group>

                    <Form.Group className="up-content" controlId="input-content">
                        <Form.Label>내용</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="내용을 입력하세요" />
                    </Form.Group>

                    <Form.Group className="up-img" controlId="formFile">
                        <Form.Label>이미지 업로드</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={this.handleImageChange} />
                    </Form.Group>

                    {/* 이미지 미리보기 */}
                    {imagePreviewUrl && (
                        <div>
                            <img
                                src={imagePreviewUrl}
                                alt="이미지 미리보기"
                                style={{ width: "300px", height: "auto" }}
                            />
                            <Button variant="danger" onClick={this.handleImageCancel} style={{ marginTop: "10px" }}>
                                이미지 선택 취소
                            </Button>
                        </div>
                    )}

                    <Button variant="info" type="submit">
                        작성완료
                    </Button>
                    <Button variant="secondary" onClick={this.handleCancel}>
                        취소
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Write;
