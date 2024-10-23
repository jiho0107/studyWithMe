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

    // loginMember가 존재하는지 확인 후 렌더링
    if (!loginMember) {
        return <p>loading...</p>; // loginMember가 undefined일 경우 로딩 메시지 표시
    }
    
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