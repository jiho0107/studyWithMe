import "../css/pages/Post.css";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import RectangleBox from "../components/RectangleBox";
import { useNavigate } from "react-router-dom";

const Post = () => {
    const nav = useNavigate();

    const postId = useParams().id;
    // 전체 포스트 중에서 postId와 일치하는 포스트를 find 함수 이용해 찾아야 함
    // 지원하기 버튼은 작성자가 아닌 경우에만 보여줘야 함
    return (
        <div className="Post">
            <section className="title_section">
                <Header title={"test 캘린더 앱 개발"} />
            </section>
            <section className="content_section">
                <div className="writer">
                    <h2>작성자</h2>
                    <RectangleBox text={"test 하하"} readOnly={true} />
                </div>
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox text={"test 캘린더 앱 개발"} readOnly={true} />
                </div>
                <div className="content">
                    <h2>내용</h2>
                    <textarea readOnly>test내용입니다</textarea>
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
                <Button text={"지원하기"} type={"POSITIVE"} />
            </section>
        </div>
    )
}

export default Post;