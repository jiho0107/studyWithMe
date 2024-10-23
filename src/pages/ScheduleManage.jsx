import "../css/pages/ScheduleManage.css";
import MainHeader from "../components/MainHeader";
import List2Menu from "../components/List3Menu";
import GroupSchedule from "../components/GroupSchedule";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ScheduleManage = () => {
    const nav = useNavigate();

    const [groups, setGroups] = useState(); // 사용자가 속한 스터디 그룹들
    const [groupSchedules, setGroupSchedules] = useState(); // 스터디 그룹들 스케줄들
    const [personalSchedules, setPersonalSchedules] = useState(); //개인 스케줄들

    const findGroup = async () => {
        try{
            const {data,status} = await axios.get("/api/groups/me");
            if(status === 200){
                console.log("findGroup : ",data);
                // 사용자가 속한 그룹들의 일정들 가져오기
                const schedules = await Promise.all(
                    data.data.map(async (group)=>{
                        const schedulesOfGroup = await findGroupSchedules(group.id);
                        return schedulesOfGroup;
                    })
                );
                console.log("group schedules : ",schedules);
                setGroupSchedules(schedules);

                // // 그룹마다 관련 포스트 가져오기
                // const groupsWithPosts = await Promise.all(
                //     data.data.map(async (group) => {
                //         const post = await findPost(group.postId); // postId로 게시물 검색
                //         return {
                //             ...group,           
                //             title: post ? post.title : null
                //         };
                //     })
                // );
                // setGroups(groupsWithPosts);
            }
        }catch(error){
            console.log("findGroup오류 : ",error);
        }
    }
    const findGroupSchedules = async (groupId) => { // 해당 그룹 일정 찾기
        try{
            const {data,status} = await axios.get(`/api/schedules/group/${groupId}`);
            console.log("findGroupSchedules: ",data);
            return data.data;
        }catch(error){
            console.log("findSchedules 오류 : ",error);
        }
    }
    // const findPost = async (postId) => {
    //     try{
    //         const {data,status} = await axios.get(`/api/posts/${postId}`);
    //         if(status === 200){
    //             console.log("findPost : ",data);
    //             return data;
    //         }
    //     }catch(error){
    //         console.log("findPost오류 : ",error);
    //         return null;
    //     }
    // }

    const findPersonalSchedule = async () => { // 개인일정조회
        try{
            const {data,status} = await axios.get("api/schedules/personal");
            if(status === 200){
                console.log("findPersonalSchedule : ",data);
                setPersonalSchedules(data.data);
            }
        }catch(error){
            console.log("findPersonalSchedule오류 : ",error);
        }
    }

    useEffect(()=>{
        findGroup();
        findPersonalSchedule();
    },[])

    return (
        <div className="ScheduleManage">
            <section className="title_section">
                <MainHeader title={"일정"} /> 
            </section>
            <section className="list_section">
                <List2Menu t1={"타입"} t2={"일정명"}/>
                <div className="list_wrapper">
                    {
                        //그룹일정
                        groupSchedules==undefined?
                        <p>loading...</p> : 
                        groupSchedules.map((schedules)=>{
                            return schedules.length !== 0 ? (
                            schedules.map((schedule)=>{
                            return (
                            <GroupSchedule 
                            key={schedule.id} 
                            type={schedule.type==="GROUP" ? "그룹":""} 
                            title={schedule.title} 
                            onClick={()=>nav(`/schedule/${schedule.id}`)} />)}))
                            :
                            null
                        })

                    }
                    {
                        //개인일정
                        personalSchedules===undefined ?
                        <p>loading...</p> :
                        personalSchedules.map((schedule)=>
                        <GroupSchedule 
                        key={schedule.id} 
                        type={schedule.type==="PERSONAL" ? "개인":""} 
                        title={schedule.title} 
                        onClick={()=>nav(`/schedule/${schedule.id}`)} />)
                    }
                    {/* <GroupSchedule id={1} title={"캘린더 앱 개발"} isProgress={true} />
                    <GroupSchedule id={2} title={"캘린더 앱 개발2"} isProgress={false} />
                    <GroupSchedule title={"개인일정1"} /> */}
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
                <Button text={"추가하기"} type={"POSITIVE"} onClick={()=>nav("/newSchedule")} />
            </section>
        </div>
    )
}

export default ScheduleManage;