import "../css/pages/MyGroupNotice.css";
import MainHeader from "../components/MainHeader";
import List3Menu from "../components/List3Menu";
import PostItem from "../components/PostItem";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const MyGroupNotice = () => {
    // postItem 리스트로 렌더링해야함
    const nav = useNavigate();

    return (
        <div className="MyGroupNotice">
            <section className="title_section">
                <MainHeader title={"공지사항"} />
            </section>
            <section className="list_section">
                <List3Menu t1={"No"} t2={"그룹"} t3={"그룹 진행"} />
                <div className="list_wrapper">
                    <PostItem id={1} title={"앱1"} isProgress={true} />
                    <PostItem id={2} title={"앱2"} isProgress={false} />
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default MyGroupNotice;
