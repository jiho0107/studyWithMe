import "../css/pages/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const nav = useNavigate();
    
    return (
        <div className="Home">
            <h1 className="title">Study <br/>With Me</h1>
            <div className="buttons">
                <button onClick={()=>nav("/login")}>로그인</button>
                <button onClick={()=>nav("/join")}>회원가입</button>
            </div>
        </div>
    )
}

export default Home;