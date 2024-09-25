import "../css/pages/Join.css";
import Button from "../components/Button";
import RoundBox from "../components/RoundBox";
import { useNavigate } from "react-router-dom";

const Join = () => {
    const nav = useNavigate();
    return (
        <div className="Join">
            <section className="logo_section">회원가입</section>
            <section className="input_section">
                <div className="id">
                    <h2>아이디</h2>
                    <RoundBox text={"아이디 입력(5~20글자)"} />
                </div>
                <div className="pwd">
                    <h2>비밀번호</h2>
                    <RoundBox text={"비밀번호 입력(5~20글자)"} />
                </div>
                <div className="name">
                    <h2>이름</h2>
                    <RoundBox text={"이름을 입력하세요"} />
                </div>
            </section>
            <section className="button_section">
                <Button text={"가입하기"} type={"POSITIVE"} />
                <Button text={"취소하기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default Join;