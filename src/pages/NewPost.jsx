import "../css/pages/NewPost.css";
import Header from "../components/Header";
import RenctangleBox from "../components/RectangleBox";
import Button from "../components/Button"
import { useNavigate } from "react-router-dom";

const NewPost = () => {
    const nav = useNavigate();
    return (
        <div className="NewPost">
            <section className="title_section">
                <Header title={"새 게시글 쓰기"} />
            </section>
            <section className="input_section">
                <div className="title">
                    <h2>제목</h2>
                    <RenctangleBox className="post_title" />
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

export default NewPost;