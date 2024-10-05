import "../css/pages/NewPost.css";
import Header from "../components/Header";
import RenctangleBox from "../components/RectangleBox";
import Button from "../components/Button"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const NewPost = () => {
    const nav = useNavigate();

    const [input, setInput] = useState({
        title:"",
        content:""
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
        console.log("onSubmit진입: input - ", input);
        // save();
    }

    const save = async () => { // 게시글 저장
        try{
            const {data, status} = await axios.post("/api/posts",{
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
            // 게시글 저장 성공
            if(status === 201){
                console.log("게시글 저장 성공: ", data);
                nav("/main", {replace:true});
            }
        } catch(error){
            // 게시글 저장 실패
            console.log("게시글 저장 실패: ", error);
            if(error.request){
                console.log("error request: ", error.request);
            }
            if(error.response){
                console.log("error response: ", error.response);
            }
        }
    }

    return (
        <div className="NewPost">
            <section className="title_section">
                <Header title={"새 게시글 쓰기"} />
            </section>
            <section className="input_section">
                <div className="title">
                    <h2>제목</h2>
                    <RenctangleBox className="post_title" onChange={(e)=>onChangeInput({
                        target: {
                            name: "title",
                            value: input.content
                        }
                    })} />
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

export default NewPost;