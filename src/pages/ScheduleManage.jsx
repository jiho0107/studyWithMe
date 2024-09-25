import "../css/pages/ScheduleManage.css";
import MainHeader from "../components/MainHeader";
import List3Menu from "../components/List3Menu";
import GroupSchedule from "../components/GroupSchedule";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const ScheduleManage = () => {
    // 로그인한 회원의 id를 이용해서
    // 해당 회원의 스터디그룹들을 보여주고 
    // 개인 일정을 보여줘야 함
    // GroupSchedule 컴포넌트 리스트로 렌더링해야함
    const nav = useNavigate();

    return (
        <div className="ScheduleManage">
            <section className="title_section">
                <MainHeader title={"일정"} /> 
            </section>
            <section className="list_section">
                <List3Menu t1={"타입"} t2={"그룹명/일정명"} t3={"진행상황"} />
                <div className="list_wrapper">
                    <GroupSchedule id={1} title={"캘린더 앱 개발"} isProgress={true} />
                    <GroupSchedule id={2} title={"캘린더 앱 개발2"} isProgress={false} />
                    <GroupSchedule title={"개인일정1"} />
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
                <Button text={"추가하기"} type={"POSITIVE"} />
            </section>
        </div>
    )
}

export default ScheduleManage;