import "../css/pages/StudyEnd.css";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const StudyEnd = () => {
    // params에서 post의 id를 이용해 post의 제목을 Header에 출력해야
    // postId 이용해 그룹 진행여부 알아야함
    // 해당 사용자의 id를 이용해 이 그룹에서의 직급을 알아야함
    // 해당 그룹의 id 알아내 그룹의 리더,멤버 알아야 함
    const nav = useNavigate();

    const params = useParams(); // params에 post Id 있음
    
    const progress = true; // 임시로
    const position = "leader"; // 임시로 (leader / member)
    return (
        <div className="StudyEnd">
            <section className="title_section">
                <Header title={`${params.id} 번 게시글`} />
            </section>
            <section className="info_section">
                <div className={`progress progress_${progress}`}>
                    {progress === true ? "진행 중" : progress === false ? "완료" : ""}
                </div>
                <div className="position">
                    나의 직급 : {position === "leader" ? "조장" : "팀원"}
                </div>
            </section>
            <section className="img_section">
                <div className="members_section">
                    <p>조장 : </p>
                    <p>팀원 : </p>
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
                <Button text={"스터디 마감"} type={"POSITIVE"} />
            </section>
        </div>
    )
}

export default StudyEnd;