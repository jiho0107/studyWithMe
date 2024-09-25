import "../css/pages/ApplyCheck.css";
import Header from "../components/Header";
import RectangleBox from "../components/RectangleBox";
import Apply from "../components/Apply";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const ApplyCheck = () => {
    // 지원자 목록 list로 렌더링해야함(Apply컴포넌트)
    const nav = useNavigate();
    return (
        <div className="ApplyCheck">
            <section className="title_section">
                <Header title={"지원자 수락/거절"} />
            </section>
            <section className="content_section">
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox text={"test 캘린더 앱 개발"} readOnly={true} />
                </div>
                <div className="content">
                    <h2>내용</h2>
                    <textarea readOnly>test내용입니다</textarea>
                </div>
            </section>
            <section className="apply_section">
                <h2>지원자</h2>
                <div className="apply_wrapper">
                    <Apply r_name={"test지원자1"}/>
                    <Apply r_name={"test지원자2"}/>
                </div>
            </section>
            <section className="button_section">
                <Button text={"취소하기"} onClick={()=>nav(-1)} />
                <Button text={"완료하기"} type={"POSITIVE"} />
            </section>
        </div>
    )
}

export default ApplyCheck;