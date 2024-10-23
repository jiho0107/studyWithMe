import "../css/pages/newNotice.css";
import Header from "../components/Header";
import RectangleBox from "../components/RectangleBox";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext} from "react";
import { StateContext } from "../App";
import axios from "axios";

const NewNotice = () => {
    const nav = useNavigate();
    const {loginMember} = useContext(StateContext);
    const groupId = useParams().id;

    const [input, setInput] = useState({
        title:"",
        content:"",
        memberId:loginMember
    });

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setInput({
            ...input,
            [name]: value
        })
    }

    const onSubmit = () => {
        save();
    }

    const save = async () => { // 공지사항 저장
        try{
            const {data, status} = await axios.post(`/api/notices/${groupId}`,{
                title: input.title,
                content: input.content
            },
            {
            headers: {
                'Content-Type': 'application/json', /* 요청,응답하는 데이터의 형식 */
                'Accept': 'application/json', /* 클라이언트에게 반환되는 데이터의 형식 */
            },
            withCredentials: true // axios요청에서 쿠키 및 http 인증정보를 포함하도록 설정하는 옵션
            })
            // 공지사항 저장 성공
            if(status === 201){
                console.log("공지사항 저장 성공: ", data);
                nav(-1,{replace:true});
            }
        } catch(error){
            // 공지사항 저장 실패
            console.log("공지사항 저장 실패: ", error);
            window.alert(error.response.data);
        }
    }

    return (
        <div className="NewNotice">
            <section className="title_section">
                <Header title={"새 공지사항 쓰기"} /> 
            </section>
            <section className="input_section">
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox className="notice_title" name="title" text={input.title} onChangeInput={onChangeInput} />
                </div>
                <div className="content">
                    <h2>내용</h2>
                    <textarea name="content" value={input.content} onChange={onChangeInput} />
                </div>
            </section>
            <section className="button_section">
                <Button text={"취소하기"} onClick={()=>nav(-1)} />
                <Button text={"작성완료"} type={"POSITIVE"} onClick={onSubmit} />
            </section>
        </div>
    )
}

export default NewNotice;