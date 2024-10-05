import "../css/pages/NewPost.css";
import Header from "../components/Header";
import RenctangleBox from "../components/RectangleBox";
import Button from "../components/Button"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewPost = () => {
    const nav = useNavigate();

    const [input, setInput] = useState({
        title:"",
        content:""
    });

    const onChangeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="NewPost">
            <section className="title_section">
                <Header title={"새 게시글 쓰기"} />
            </section>
            <section className="input_section">
                <div className="title">
                    <h2>제목</h2>
                    <RenctangleBox className="post_title" name="title" value={input.title} onChange={onChangeInput} />
                </div>
                <div className="content">
                    <h2>내용</h2>
                    <textarea name="content" value={input.content} onChange={onChangeInput} />
                </div>
            </section>
            <section className="button_section">
                <Button text={"취소하기"} onClick={()=>nav(-1)} />
                <Button text={"작성완료"} type={"POSITIVE"} />
            </section>
        </div>
    )
}

export default NewPost;