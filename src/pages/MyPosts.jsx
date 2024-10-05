import "../css/pages/MyPosts.css";
import Header from "../components/Header";
import List3Menu from "../components/List3Menu";
import PostItem from "../components/PostItem";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../App";
import { useContext } from "react";

const MyPosts = () => {
    const {loginMember} = useContext(StateContext);

    const nav = useNavigate();

    return (
        <div className="MyPosts">
            <section className="title_section">
                <Header title={`${loginMember.loginId} 님의 게시글`} />
            </section>
            <section className="list_section">
                <List3Menu t1={"No"} t2={"제목"} t3={"그룹 진행"} />
                <div className="list_wrapper">
                    {/* <PostItem id={1} title={"제목1"} isProgress={false} />
                    <PostItem id={2} title={"제목2"} isProgress={true} />
                    <PostItem id={3} title={"제목3"} isProgress={null} /> */}
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default MyPosts;