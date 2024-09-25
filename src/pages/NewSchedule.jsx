import "../css/pages/NewSchedule.css";
import Header from "../components/Header";
import RectangleBox from "../components/RectangleBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const NewSchedule = () => {
    const nav = useNavigate();
    return (
        <div className="NewSchedule">
            <section className="title_section">
                <Header title={"새 일정 쓰기"} />
            </section>
            <section className="input_section">
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox className="schedule_title" />
                </div>
                <div className="date">
                    <h2>날짜</h2>
                    <RectangleBox className="schedule_date" />
                </div>
                <div className="type">
                    <h2>타입</h2>
                    <RectangleBox className="schedule_type" />
                </div>
                <div className="group">
                    <h2>그룹</h2>
                    <RectangleBox className="schedule_group" />
                </div>
            </section>
            <section className="button_section">
                <Button text={"취소하기"} onClick={()=>nav(-1)} />
                <Button text={"작성완료"} type={"POSITIVE"} />
            </section>
        </div>
    )
}

export default NewSchedule;