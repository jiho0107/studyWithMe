import "../css/pages/Main.css";
import Menu from "../components/Menu";
import MainHeader from "../components/MainHeader";
import List3Menu from "../components/List3Menu";
import PostItem from "../components/PostItem";
import Button from "../components/Button";

const Main = () => {
    // postItem 리스트로 렌더링해야함

    return (
        <div className="Main">
            <section className="menu_section">
                <h2>Study<br/>WithMe</h2>
                <Menu text={"공지사항"} />
                <Menu text={"일정관리"} />
                <Menu text={"MyPage"} />
                <Menu text={"로그아웃"} />
            </section>
            <section className="list_section">
                <MainHeader title={"게시글 소식"} />
                
                <List3Menu t1={"NO"} t2={"제목"} t3={"작성자"} />
                <div className="list_wrapper">
                    <PostItem id={1} title={"t1"} writer={"w1"} />
                    <PostItem id={2} title={"t2"} writer={"w2"} />
                </div>
            </section>
            <section className="button_section">
                <Button  text={"글쓰기"} type={"POSITIVE"}/>
            </section>
        </div>
    )
}

export default Main;