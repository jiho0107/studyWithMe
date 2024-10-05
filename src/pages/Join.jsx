import "../css/pages/Join.css";
import Button from "../components/Button";
import RoundBox from "../components/RoundBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


const Join = () => {
    const nav = useNavigate();

    const [input, setInput] = useState({ // 회원가입 정보
        loginId: "",
        password: "",
        name: ""
    })

    const [isEmpty, setIsEmpty] = useState(false); // 로그인id 또는 비밀번호 또는 이름이 비었는지
    const [emptyError, setEmptyError] = useState('');

    const [isExist, setIsExist] = useState(false); // 회원id가 존재하는지
    const [existError, setExistError] = useState(""); 

    const onChangeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const joinCheck = () => {
        console.log("joinCheck시작");
        // 아이디나 비번이나 이름을 입력 안 한 경우
        if(!input.loginId || !input.password || !input.name){
            setIsEmpty(true);
            setEmptyError("아이디,비밀번호,이름을 모두 입력해주세요!");
            setIsExist(true);
            console.log("다 입력X :: id:%s, pwd:%s, name:%s",input.loginId,input.password,input.name);
            return;
        } 
        // 아이디,비번,이름을 모두 입력한 경우
        setIsEmpty(false);
        setEmptyError("");
        console.log("다 입력 :: id:%s, pwd:%s, name:%s",input.loginId,input.password,input.name);

        join();
    }

    const join = async () => {
        try{
            const {data, status} = await axios.post("/members",{
                loginId: input.loginId,
                password: input.password,
                name: input.name
            },
        {
            headers: {
                'Content-Type': 'application/json', /* 요청,응답하는 데이터의 형식 */
                    'Accept': 'application/json', /* 클라이언트에게 반환되는 데이터의 형식 */
            },
            withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
        })
            console.log("data: {}",data);

            // 회원가입이 성공한 경우
            if(status === 201) {
                console.log("회원가입 성공: {}",data);
                setIsExist(false);
                setExistError("");
                const success = window.alert("회원가입 되었습니다!");
                nav("/",{replace: true});
            }
        } catch(error){
            // 회원가입 실패시
            if(error.status === 409){
                console.log("회원가입 실패! {}",error);
                setIsExist(true);
                setExistError("이미 존재하는 아이디입니다.");
            }else{
                // 기타오류
                console.log("회원가입 중 기타오류 발생: {}",error);
                setIsExist(true);
                setExistError("서버 오류가 발생했습니다. 다시 시도해주세요");
            }
        }
    }

    return (
        <div className="Join">
            <section className="logo_section">회원가입</section>
            <section className="input_section">
                <div className="id">
                    <h2>아이디</h2>
                    <input className="loginId" size={20} name="loginId" value={input.loginId} placeholder="아이디 입력(5~20글자)" onChange={onChangeInput} />
                    {/* <RoundBox text={"아이디 입력(5~20글자)"} /> */}
                </div>
                <div className="pwd">
                    <h2>비밀번호</h2>
                    <input className="password" size={20} name="password" value={input.password} type="password" placeholder="비밀번호 입력(5~20글자)" onChange={onChangeInput} />
                    {/* <RoundBox text={"비밀번호 입력(5~20글자)"} /> */}
                </div>
                <div className="name">
                    <h2>이름</h2>
                    <input className="name" name="name" size={20} value={input.name} placeholder="이름을 입력하세요" onChange={onChangeInput} />
                    {/* <RoundBox text={"이름을 입력하세요"} /> */}
                </div>
                {isEmpty && (
                    <div style={{ color: 'red', marginTop: '5px' }}>
                        {emptyError} 
                    </div>
                )}
                {!isEmpty && isExist && (
                    <div style={{ color: 'red', marginTop: '5px' }}>
                        {existError} 
                    </div>
                )}
            </section>
            <section className="button_section">
                <Button text={"가입하기"} type={"POSITIVE"} onClick={joinCheck} />
                <Button text={"취소하기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default Join;