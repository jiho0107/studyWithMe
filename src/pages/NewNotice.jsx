import "../css/pages/newNotice.css";
import Header from "../components/Header";
import RectangleBox from "../components/RectangleBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const NewNotice = () => {
    const nav = useNavigate();
    return (
        <div className="NewNotice">
            <section className="title_section">
                <Header title={"새 공지사항 쓰기"} /> 
            </section>
            <section className="input_section">
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox className="notice_title" />
                </div>
                <div className="content">
                    <h2>내용</h2>
                    <textarea />
                </div>
            </section>
            <section className="button_section">
                <Button text={"취소하기"} onClick={()=>nav(-1)} />
                <Button text={"작성완료"} type={"POSITIVE"} />
            </section>
        </div>
    )
}

export default NewNotice;