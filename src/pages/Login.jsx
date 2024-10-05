import "../css/pages/Login.css";
import RoundBox from "../components/RoundBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { StateContext, DispatchContext } from "../App";

const Login = () => {
    const nav = useNavigate();

    const [loginId, setloginId] = useState(''); // 로그인id
    const [password, setPassword] = useState(''); // 비밀번호

    const [errorMessage, setErrorMessage] = useState(''); // api에러

    const [isEmpty, setIsEmpty] = useState(false); // 로그인id 또는 비밀번호가 비었는지
    const [emptyError, setEmptyError] = useState('');

    const [isMatch, setIsMatch] = useState(true); // id와 비밀번호가 일치하는지
    const [matchError, setMatchError] = useState('');

    const {loginMember} = useContext(StateContext);
    const {setLoginMember} = useContext(DispatchContext);

    const onChangeId = (e) => {
        setloginId(e.target.value);
    }
    const onChangePwd = (e) => {
        setPassword(e.target.value);
    }

    const loginCheck = () => {
        console.log("loginCheck시작");

        // 아이디나 비번을 입력 안한 경우  
        if(!loginId || !password){
            setIsEmpty(true);
            setEmptyError("아이디 또는 비밀번호를 입력해주세요!");
            console.log("아이디 또는 비밀번호를 입력해주세요 - id:%s, pwd:%s",loginId,password);
            return;
        } else{ // 아이디나 비번을 입력한 경우
            setIsEmpty(false);
            setEmptyError("");
            console.log("입력 - id:%s, pwd:%s",loginId,password);

            login();
        }
    }

     // 아이디 또는 비번을 매칭한 후 메인 페이지로 이동
     const login = async () => {
        try{
            const {data, status} = await axios.post("/login",{
                loginId: loginId,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json', /* 요청,응답하는 데이터의 형식 */
                    'Accept': 'application/json', /* 클라이언트에게 반환되는 데이터의 형식 */
                },
                withCredentials: true // axios요청에서 쿠키 및 http 인증정보를 포함하도록 설정하는 옵션
            })
            // console.log("data: ",data);

            //로그인 성공시
            if (status === 200) {
                setIsMatch(true);
                setMatchError("");
                console.log("로그인 성공: {}", data);
                setLoginMember(data);
                // 로그인한 회원을 web storage에 저장
                sessionStorage.setItem("loginMember",JSON.stringify(data));

                nav('/main');  // 메인 페이지로 이동
            } 
        } catch(error){ 
            // 로그인 실패 시
            if (error.response && error.response.status === 400) {
                // 백엔드에서 반환한 에러 메시지를 상태에 저장
                setIsMatch(false);
                console.log("로그인 실패:{}",error);
                setMatchError("아이디 또는 비밀번호가 일치하지 않습니다.");
            } else {
                // 기타 오류
                setIsMatch(false);
                console.error("로그인 중 오류 발생:", error);
                setMatchError('서버 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    }

    return (
        <div className="Login">
            <div className="logo_section">LOGIN</div>
            <div className="input_section">
                <input className="loginId" size={20} name="loginId" value={loginId} placeholder="아이디" onChange={onChangeId} />
                <input className="password" size={20} name="password" value={password} type="password" placeholder="비밀번호" onChange={onChangePwd} />
                <Button text={"로그인"} type={"POSITIVE"} onClick={loginCheck} />
                {isEmpty && (
                    <div style={{ color: 'red', marginTop: '5px' }}>
                        {emptyError} 
                    </div>
                )}
                {!isEmpty && !isMatch && (
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