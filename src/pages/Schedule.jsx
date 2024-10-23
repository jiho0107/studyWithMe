import "../css/pages/Schedule.css";
import { useParams,useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RectangleBox from "../components/RectangleBox";
import Button from "../components/Button";
import { useState,useEffect } from "react";
import axios from "axios";

const Schedule = () => {
    // 파라미터로 일정id를 받아서
    // 해당하는 일정의 제목,날짜,타입,그룹을 렌더링해야함
    const nav = useNavigate();

    const scheduleId = useParams().id; // 일정id

    // const [schedule,setSchedule] = useState({
    //     id:"",
    //     title:"",
    //     date:"",
    //     memberId:"",
    //     type:"",
    //     groupId:""
    // });
    const [schedule,setSchedule] = useState();

    const findSchedule = async () => {
        try{
            const {data,status} = await axios.get(`/api/schedules/${scheduleId}`);
            if(status===200){
                console.log("findSchedule : ",data);
                let group,post;
                if(data.groupId){ //그룹일정인 경우
                    console.log("#### 그룹 일정인 경우 ####");
                    group = await findGroup(data.groupId);
                    post = await findPost(group.postId);
                }
                setSchedule({
                    ...data,
                    date: new Date(data.date).toLocaleDateString(),
                    ["groupTitle"]: data.groupId ? post.title : ""
                });
            }
        }catch(error){
            console.log("findSchedule오류: ",error);
        }
    }

    const findGroup = async (groupId) => {
        try{
            const {data,status} = await axios.get(`/api/groups/${groupId}`);
            if(status === 200){
                console.log("findGroup : ",data);
                return data;
            }
        }catch(error){
            console.log("findGroup 오류:",error);
        }
    }

    const findPost = async (postId) => {
        try{
            const {data,status} = await axios.get(`/api/posts/${postId}`);
            if(status === 200){
                console.log("findPost : ",data);
                return data;
            }
        }catch(error){
            console.log("findPost 오류:",error);
        }
    }

    useEffect(()=>{
        findSchedule();
    },[])

    if(schedule === undefined){
        return (<div>loading...</div>);
    }
    return (
        <div className="Schedule">
            <section className="title_section">
                <Header title={schedule.title} />
            </section>
            <section className="content_section">
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox className="schedule_title" 
                    text={schedule.title} readOnly={true} />
                </div>
                <div className="date">
                    <h2>날짜</h2>
                    <RectangleBox className="schedule_date" 
                    text={schedule.date} readOnly={true} />
                </div>
                <div className="type">
                    <h2>타입</h2>
                    <RectangleBox className="schedule_type" 
                    text={schedule.type==="GROUP"?"그룹":"개인"} readOnly={true} />
                </div>
                <div className="group">
                    <h2>그룹</h2>
                    <RectangleBox className="schedule_group" 
                    text={schedule.groupTitle} readOnly={true} />
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default Schedule;