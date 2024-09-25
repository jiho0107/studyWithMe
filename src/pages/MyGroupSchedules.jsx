import "../css/pages/MyGroupSchedules.css";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import List2Menu from "../components/List2Menu";
import ScheduleItem from "../components/ScheduleItem";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const MyGroupSchedules = () => {
    // 파라미터로 받은 그룹id를 이용해서
    // 해당그룹의 진행여부,제목을 알아내야하고
    // 해당 그룹의 일정들(ScheduleItem) 리스트로 렌더링해야함
    // 그룹id를 이용해 일정의 id,제목 알아야 함
    const nav = useNavigate();

    const params = useParams(); // 그룹id가 파라미터로 넘어옴
    const groupId = params.id; // 그룹id

    const progress = true; // 임시로
    const name = "앱1" // 임시로

    const s_id = 1; // 임시로(일정id)
    const s_title = "일정1" // 임시로(일정 제목)
    return (
        <div className="MyGroupSchedules">
            <section className="title_section">
                <Header title={"일정"} />
            </section>
            <section className="info_section">
                <div className={`progress progress_${progress}`}>
                    {progress === true ? "진행 중" : progress === false ? "완료" : ""}
                </div>
                <div className="group_name">
                    {name}
                </div>
            </section>
            <section className="list_section">
                <List2Menu t1={"No"} t2={"제목"} />
                <div className="list_wrapper">
                    <ScheduleItem id={s_id} title={s_title} />
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default MyGroupSchedules;