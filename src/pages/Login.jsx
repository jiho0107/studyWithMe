import "../css/pages/Login.css";
import RoundBox from "../components/RoundBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
    const nav = useNavigate();

    const [userId, setUserId] = useState(''); // 로그인id
    const [password, setPassword] = useState(''); // 비밀번호

    const [errorMessage, setErrorMessage] = useState(''); // api에러

    const [isEmpty, setIsEmpty] = useState(false); // 로그인id 또는 비밀번호가 비었는지
    const [emptyError, setEmptyError] = useState('');

    const [isMatch, setIsMatch] = useState(true); // id와 비밀번호가 일치하는지
    const [matchError, setMatchError] = useState('');

    const onChangeId = (e) => {
        setUserId(e.target.value);
    }
    const onChangePwd = (e) => {
        setPassword(e.target.value);
    }

    const loginCheck = () => {
        // 아이디나 비번을 입력 안한 경우  
        if(!userId || !password){
            setIsEmpty(true);
            setEmptyError("아이디 또는 비밀번호를 입력해주세요!");
            console.log("id:%s, pwd:%s",userId,password);
            return;
        } else{ // 아이디나 비번을 입력한 경우
            setIsEmpty(false);
            setEmptyError("");
            console.log("id:%s, pwd:%s",userId,password);

            // 아이디 또는 비번을 매칭한 후 메인 페이지로 이동
            const loginMember = async () => {
                try{
                    const {data} = await axios.post("/login",{
                        loginId: userId,
                        password: password
                    },
                {
                    headers: {
                        'Content-Type': 'application/json', /* 요청,응답하는 데이터의 형식 */
                        'Accept': 'application/json', /* 클라이언트에게 반환되는 데이터의 형식 */
                    },
                    withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
                })
                console.log(data);

                //로그인 성공시
                if (data.status === 200) {
                    console.log("로그인 성공 ", data.data);
                    // 성공 시 회원 정보를 받아와서 세션 저장 또는 원하는 페이지로 이동

                    console.log("로그인 성공");
                    setMatchError("");
                    nav('/main');  // 메인 페이지로 이동
                }
                } catch(error){ 
                    // 로그인 실패 시
                    if (error.response && error.response.status === 400) {
                        // 백엔드에서 반환한 에러 메시지를 상태에 저장
                        console.log("400에러 {}",error);
                        console.log("로그인 실패");
                        setMatchError("아이디 또는 비밀번호가 일치하지 않습니다.");
                    } else {
                        // 기타 오류
                        console.error("로그인 중 오류 발생:", error);
                        setMatchError('서버 오류가 발생했습니다. 다시 시도해주세요.');
                    }
                }
            }
        }
    }

    return (
        <div className="Login">
            <div className="logo_section">LOGIN</div>
            <div className="input_section">
                <input className="userId" name="userId" value={userId} placeholder="아이디" onChange={onChangeId} />
                <input className="password" name="password" value={password} type="password" placeholder="비밀번호" onChange={onChangePwd} />
                <Button text={"로그인"} type={"POSITIVE"} onClick={loginCheck} />
                {isEmpty && (
                    <div style={{ color: 'red', marginTop: '5px' }}>
                        {emptyError} 
                    </div>
                )}
                {!isMatch && (
                    <div style={{ color: 'red', marginTop: '5px' }}>
                        {matchError} 
                    </div>
                )}
            </div>
            <div className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </div>
        </div>
    )
}

export default Login;