import "../css/pages/Notice.css";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RectangleBox from "../components/RectangleBox";
import Button from "../components/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import getWriter from "../util/getLoginIdById";

const Notice = () => {
    const nav = useNavigate();
    const noticeId = useParams().id; // 공지사항id

    const [notice,setNotice] = useState({
        id:"",
        title:"",
        content:"",
        groupId:"",
        memberId:""
    });

    const findNotice = async () => {
        try{
            const {data, status} = await axios.get(`/api/notices/${noticeId}`);
            if(status === 200){
                console.log("findNotice : ",data);
                const writer = await getWriter(data.memberId);
                const group = await findGroup(data.groupId);
                const post = await findPost(group.postId);
                setNotice({
                    ...data,
                    ["writer"]:writer?writer.loginId:null,
                    ["groupName"]:post?post.title:null
                });
            }
        }catch(error){
            console.log("findNotice오류 : ",error);
        }
    }

    const findGroup = async (groupId) => {
        try{
            const {data,status} = await axios.get(`/api/groups/${groupId}`);
            if(status===200){
                console.log("findGroup:",data);
                return data;
            }
        }catch(error){
            console.log("findGroup오류: ",error);
        }
    }

    const findPost = async (postId) => {
        try{
            const {data,status} = await axios.get(`/api/posts/${postId}`);
            if(status ===200){
                console.log("findPost:",data);
                return data;
            }
        }catch(error){
            console.log("findPost오류: ",error);
        }
    }

    useEffect(()=>{
        findNotice();
    },[])

    if(!notice) {
        return (<div>loading...</div>)
    }

    return (
        <div className="Notice">
            <section className="title_section">
                <Header title={notice.title} />
            </section>
            <section className="content_section">
                <div className="group">
                    <h2>그룹</h2>
                    <RectangleBox text={notice.groupName} readOnly={true} />
                </div>
                <div className="writer">
                    <h2>작성자</h2>
                    <RectangleBox text={notice.writer} readOnly={true} />
                </div>
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox text={notice.title} readOnly={true} />
                </div>
                <div className="content">
                    <h2>내용</h2>
                    <textarea readOnly value={notice.content}></textarea>
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default Notice;