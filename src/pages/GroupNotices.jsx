import "../css/pages/GroupNotices.css";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import List2Menu from "../components/List2Menu";
import NoticeItem from "../components/NoticeItem";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const GroupNotices = () => {
    // 그룹id를 이용해 그룹의 진행여부와 게시글제목 받아와야함
    // 해당 그룹의 공지사항을 list로 출력해야 함
    const nav = useNavigate();

    const params = useParams(); // 그룹id를 파라미터로 받음
    const groupId = params.id;

    const progress = true; // 임시로
    const name = "앱1" // 임시로
    return (
        <div className="GroupNotices">
            <section className="title_section">
                <Header title={"공지사항"} />
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
                    <NoticeItem id={1} title={"공지1"} />
                    <NoticeItem id={2} title={"공지2"} />
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
                <Button text={"추가하기"} type={"POSITIVE"} />
            </section>
        </div>
    )
}

export default GroupNotices;