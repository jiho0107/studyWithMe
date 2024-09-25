import "../css/pages/Schedule.css";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import RectangleBox from "../components/RectangleBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
    // 파라미터로 일정id를 받아서
    // 해당하는 일정의 제목,날짜,타입,그룹을 렌더링해야함
    const nav = useNavigate();

    const params = useParams(); // 일정id를 파라미터로 받음
    const scheduleId = params.id; // 일정id

    const s_title = "일정1"; // 임시로(일정 제목)
    const s_date = "2024-09-01"; // 임시로(일정 날짜)
    const s_type = "group"; // 임시로(일정 타입)
    const s_group = "앱1"; // 임시로(일정이 속하는 그룹명)
    // 일정 타입이 개인인 경우에는 일정 그룹이 빈문자열이 들어감

    return (
        <div className="Schedule">
            <section className="title_section">
                <Header title={s_title} />
            </section>
            <section className="content_section">
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox className="schedule_title" 
                    text={s_title} readOnly={true} />
                </div>
                <div className="date">
                    <h2>날짜</h2>
                    <RectangleBox className="schedule_date" 
                    text={s_date} readOnly={true} />
                </div>
                <div className="type">
                    <h2>타입</h2>
                    <RectangleBox className="schedule_type" 
                    text={s_type==="group"?"그룹":"개인"} readOnly={true} />
                </div>
                <div className="group">
                    <h2>그룹</h2>
                    <RectangleBox className="schedule_group" 
                    text={s_group} readOnly={true} />
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default Schedule;