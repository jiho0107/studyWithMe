import "../css/pages/GroupNotices.css";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import List2Menu from "../components/List2Menu";
import NoticeItem from "../components/NoticeItem";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";

const GroupNotices = () => {
    const nav = useNavigate();
    const params = useParams(); // 그룹id를 파라미터로 받음
    const groupId = params.id;

    const [group, setGroup] = useState();
    const [notices, setNotices] = useState();
    const [post, setPost] = useState();

    const getGroup = async () => {
        try{
            const {data,status} = await axios.get(`/api/groups/${groupId}`);
            if(status === 200){
                console.log("getGroup : ", data);
                setGroup(data);
                getPost(data.postId);
                return data;
            }
        } catch(error){
            console.log("getGroup오류: ",error);
            return null;
        }
    }

    const getNotice = async () => {
        try{
            const group = await getGroup();
            const {data,status} = await axios.get(`/api/notices/group/${group.id}`);
            console.log("getNotice : ", data);
            setNotices(data.data);
        } catch(error){
            console.log("getNotice오류: ",error);
        }
    }

    const getPost = async (postId) => {
        try{
            const {data, status} = await axios.get(`/api/posts/${postId}`);
            console.log("getPost : ", data);
            setPost(data);
        }catch(error){
            console.log("getPost오류: ",error);
        }
    }

    const isGroupActive = () => {
        if(group.active){ // 그룹이 활동중인 경우
            nav(`/newNotice/${group.id}`);
        }
        else{ // 그룹이 활동 종료된 경우
            window.alert("스터디 그룹 활동이 종료되어 공지사항을 추가할 수 없습니다!");
        }
    }

    useEffect(()=>{
        getNotice();
    },[]);

    return (
        <div className="GroupNotices">
            <section className="title_section">
                <Header title={"공지사항"} />
            </section>
            <section className="info_section">
                {
                    group ?
                    <>
                        <div className={`progress progress_${group.active}`} >
                        {group.active === true ? "진행 중" : group.active === false ? "완료" : ""}
                        </div>
                        <div className="group_name">
                            {post ? post.title : null}
                        </div> 
                    </> :
                    (
                        <div>Loading...</div> // group 데이터가 로딩 중일 때 표시
                    )
                }
            </section>
            <section className="list_section">
                <List2Menu t1={"No"} t2={"제목"} />
                <div className="list_wrapper">
                    {
                        notices ?
                        notices.map((notice)=> 
                        <NoticeItem 
                        key={notice.id} 
                        id={notice.id} 
                        title={notice.title} 
                        onClick={()=>nav(`/notice/${notice.id}`)} />) :
                        <div>loading...</div>
                    }
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
                <Button text={"추가하기"} type={"POSITIVE"} onClick={isGroupActive} />
            </section>
        </div>
    )
}

export default GroupNotices;