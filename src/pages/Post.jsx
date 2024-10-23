import "../css/pages/Post.css";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import RectangleBox from "../components/RectangleBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {StateContext} from "../App";
import getWriter from "../util/getLoginIdById";

const Post = () => {
    const nav = useNavigate();

    const {loginMember} = useContext(StateContext); // 로그인한 회원

    const postId = useParams().id;

    const [post, setPost] = useState({
        id: "",
        title: "",
        content: "",
        memberId:""
    })

    const findPost = async () => {
        try{
            const {data,status} = await axios.get(`/api/posts/${postId}`);
            if(status === 200){
                console.log("axios - findPost호출 : ", data);
                const writer = await getWriter(data.memberId);
                setPost({
                    ...data,
                    ["writer"]:writer?writer.loginId:null
                });
            }
        } catch(error){
            if(error.response.status === 400){
                console.log("해당 게시글이 존재하지 않습니다.");
            }
        }
    }

    useEffect(()=>{
        findPost();
    },[])

    const onClickApply = () => {
        apply();
    }

    const apply = async () => { // 지원하기
        try{
            const {data, status} = await axios.post(`/api/registers/${postId}`,
                {
                    headers: {
                        'Content-Type': 'application/json', /* 요청,응답하는 데이터의 형식 */
                        'Accept': 'application/json', /* 클라이언트에게 반환되는 데이터의 형식 */
                    },
                    withCredentials: true // axios요청에서 쿠키 및 http 인증정보를 포함하도록 설정하는 옵션
                })

            // 지원하기 성공 시
            if(status === 201) {
                console.log("apply 성공!!");
                window.alert("지원 완료되었습니다!");
                nav("/main", {replace:true});
            }
        } catch(error){ // 지원하기 실패 시
            console.log("apply 실패: ",error.response);
            if(error.response.status === 400){
                if(String(error.response.data) === "이미 해당 게시글에 스터디 신청을 했습니다."){
                    window.alert("이미 신청했습니다.");
                }
                else if((String(error.response.data) === "해당 게시글은 존재하지 않습니다.")){
                    window.alert("해당 게시글은 존재하지 않습니다.");
                }
                else if((String(error.response.data) === "게시글 작성자는 지원할 수 없습니다.")){
                    window.alert("작성자는 지원할 수 없습니다.");
                }
                else if((String(error.response.data) === "이미 스터디그룹이 형성되었습니다.")){
                    window.alert("이미 스터디그룹이 형성되어 지원할 수 없습니다.");
                }
            }
            else{ // 기타오류
                console.log("스터디 지원하기 중 기타오류 발생: ",error);
            }
        }
    }

    return (
        <div className="Post">
            <section className="title_section">
                <Header title={post.title} />
            </section>
            <section className="content_section">
                <div className="writer">
                    <h2>작성자</h2>
                    <RectangleBox text={post.writer} readOnly={true} />
                </div>
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox text={post.title} readOnly={true} />
                </div>
                <div className="content">
                    <h2>내용</h2>
                    <textarea readOnly value={post.content}></textarea>
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
                <Button text={"지원하기"} type={"POSITIVE"} onClick={onClickApply} />
            </section>
        </div>
    )
}

export default Post;