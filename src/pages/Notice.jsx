import "../css/pages/Notice.css";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import RectangleBox from "../components/RectangleBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Notice = () => {
    // 공지사항id를 이용해 그룹,작성자,제목,내용을 받아와야 함
    const nav = useNavigate();

    const params = useParams(); // 공지사항id를 파라미터로 받음
    const NoticeId = params.id; // 공지사항id

    const group = "g1"; // 임시
    const writer = "w1"; // 임시
    const title = "test 캘린더 앱 개발"; // 임시
    const content = "내용입니다"; // 임시

    return (
        <div className="Notice">
            <section className="title_section">
                <Header title={title} />
            </section>
            <section className="content_section">
                <div className="group">
                    <h2>그룹</h2>
                    <RectangleBox text={group} readOnly={true} />
                </div>
                <div className="writer">
                    <h2>작성자</h2>
                    <RectangleBox text={writer} readOnly={true} />
                </div>
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox text={title} readOnly={true} />
                </div>
                <div className="content">
                    <h2>내용</h2>
                    <textarea readOnly>{content}</textarea>
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default Notice;