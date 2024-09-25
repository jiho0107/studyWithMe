import "../css/pages/MyPosts.css";
import Header from "../components/Header";
import List3Menu from "../components/List3Menu";
import PostItem from "../components/PostItem";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
    // 작성자의 id 이용해서 user 가져와야 함
    // postItem 리스트로 렌더링해야함
    let user = "test 하하"

    const nav = useNavigate();

    return (
        <div className="MyPosts">
            <section className="title_section">
                <Header title={`${user} 님의 게시글`} />
            </section>
            <section className="list_section">
                <List3Menu t1={"No"} t2={"제목"} t3={"그룹 진행"} />
                <div className="list_wrapper">
                    <PostItem id={1} title={"제목1"} isProgress={false} />
                    <PostItem id={2} title={"제목2"} isProgress={true} />
                    <PostItem id={3} title={"제목3"} isProgress={null} />
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default MyPosts;