import "../css/pages/MyPage.css";
import user from "../assets/user.png";
import MainHeader from "../components/MainHeader";
import Menu from "../components/Menu";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../App";
import { useContext } from "react";

const MyPage = () => {
    const nav = useNavigate();

    const {loginMember} = useContext(StateContext);

    return (
        <div className="MyPage">
            <section className="title_section">
                <MainHeader title={"My Page"} />
            </section>
            <section className="menu_section">
                <Menu text={"내 게시글"} onClick={()=>nav("/posts")} />
                <Menu text={"스터디룸"} onClick={()=>nav("/studyRoom")} />
            </section>
            <section className="user_section">
                <img src={user} />
                <div className="greeting">
                    <h2>{loginMember.loginId} 님,<br/>안녕하세요!</h2>
                </div>
            </section>
            <section className="blank"></section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default MyPage;