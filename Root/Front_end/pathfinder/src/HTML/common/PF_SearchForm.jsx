import { useState, useRef } from "react";

const SearchForm = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarType, setCalendarType] = useState("");   
    const [date, setDate] = useState(new Date());
    const [formData, setFormData] = useState({
        acquirePropertyName: "",
        START_YMD: "",
        END_YMD: "",
    });
    const calendarRef = useRef(null);
    
    // 폼 입력값 변경시 호출되는 함수 
    const handleDateChange = (newDate) => {
        const formattedDate = newDate.toISOString().split("T")[0].replace(/-/g, "");
        onInputChange({ target: { name: calendarType, value: formattedDate } });
        setDate(newDate);
        setShowCalendar(false); 
    };
    
    const handleCalendarToggle = (type) => {
        setCalendarType(type);
        setShowCalendar(true);
    };

    const getCalendarStyle = () => {
        return calendarType === "START_YMD" ? { top: "120px", left: "600px" } : { top: "120px", right: "400px" };
    };
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const Calendar = () => {
        return (
            <div>
                {/* 달력 컴포넌트 */}
            </div>
        );
    };

    // 검색 요청 API 호출
    const onSearchSubmit = (e) => {
        //여러번 클릭을 막는 것
        e.preventDefault();
        // 검색 요청 API 호출
        const searchParams = {
            acquirePropertyName: formData.acquirePropertyName,
            START_YMD: formData.START_YMD,
            END_YMD: formData.END_YMD,
        };
        fetch('/search', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchParams),
        })
        .then(response => response.json())
        .then(data => {
            // 검색 결과 처리
            console.log('Search results:', data);
        })
        .catch(error => {
            console.error('Error during search:', error);
        });
    };
    // 초기화 번튼 클릭시 호출되는 함수
    const onResetSearch = () => {
        setFormData({
            acquirePropertyName: "",
            START_YMD: "",
            END_YMD: "",
        });
    }

    return (
        <form onSubmit={onSearchSubmit}>
            <div className="left-section">
                <label>습득물명</label>
                <input type="text" name="acquirePropertyName" value={formData.acquirePropertyName} onChange={onInputChange} />

                {/* 추가적인 폼 필드들 */}
            </div>
            <div className="right-section">
                {/* 추가적인 폼 필드들 */}
            </div>

            <div className="date-section">
                <label>기간</label>
                <input type="text" name="START_YMD" readOnly onClick={() => handleCalendarToggle("START_YMD")} />
                <span>~</span>
                <input type="text" name="END_YMD" readOnly onClick={() => handleCalendarToggle("END_YMD")} />

                {showCalendar && (
                    <div ref={calendarRef} style={getCalendarStyle()}>
                        <Calendar onChange={handleDateChange} value={date} />
                    </div>
                )}
            </div>

            <button type="submit">검색</button>
            <button type="button" onClick={onResetSearch}>초기화</button>
        </form>
    );
};

export default SearchForm;
