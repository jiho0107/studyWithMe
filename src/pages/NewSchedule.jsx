import "../css/pages/NewSchedule.css";
import Header from "../components/Header";
import RectangleBox from "../components/RectangleBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const NewSchedule = () => {
    const nav = useNavigate();

    const [input,setInput] = useState({
        title:"",
        date:"",
        type:"",
        studyGroup:""
    })
    const [groups, setGroups] = useState(); // 활동중인 그룹들

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

    const save = async () => {
        try{
            const {data,status} = await axios.post("/api/schedules",{
                title:input.title,
                date:new Date(input.date).toISOString(), // 날짜를 ISO 8601 형식으로 변환
                type:input.type,
                studyGroup:input.studyGroup
            },
            {
            headers: {
                'Content-Type': 'application/json', /* 요청,응답하는 데이터의 형식 */
                'Accept': 'application/json', /* 클라이언트에게 반환되는 데이터의 형식 */
            },
            withCredentials: true // axios요청에서 쿠키 및 http 인증정보를 포함하도록 설정하는 옵션
            })
            // 일정 저장 성공
            if(status === 201){
                console.log("일정 저장 성공: ", data);
                nav("/scheduleManage", {replace:true});
            }
        } catch(error){
            console.log("newSchedule save 오류 : ",error);
            if(input.type === "PERSONAL"){
                if(!input.title || !input.date || !input.type) window.alert("일정을 다 작성해주세요");
            }
            else if(input.type === "GROUP"){
                if(!input.title || !input.date || !input.type || !input.studyGroup) window.alert("일정을 다 작성해주세요");
            }
            else{
                window.alert("일정을 다 작성해주세요");
            }
        }
    }

    const getGroups = async () => {
        try{
            const {data,status} = await axios.get("/api/groups/me");
            console.log("getGroups: ",data);
            const activeGroups = data.data.filter((group)=>group.active === true); //활동중인 그룹만 반환
            console.log("activeGroups : ",activeGroups);
            const groupsWithTitle = await Promise.all( // Promise.all()을 사용해 모든 비동기 호출이 완료된 후 데이터를 렌더링
                activeGroups.map(async (group)=>{
                    const post = await getPosts(group.postId);
                    return {
                        ...group,
                        ["title"]: post ? post.title : null
                    }
                })
            )
            setGroups(groupsWithTitle);
        } catch(error){
            console.log("getGroups 오류 : ",error);
        }
    }
    const getPosts = async (postId) => {
        try{
            const {data, status} = await axios.get(`/api/posts/${postId}`);
            console.log("getPosts : ",data);
            return data;
        } catch(error){
            console.log("getPosts 오류 : ",error);
            if(error.response.status === 400){ // 게시글이 존재하지 않는 경우
                console.log(error.response.data);
                return null;
            }
        }
    }

    useEffect(()=>{
        getGroups();
    },[]);

    return (
        <div className="NewSchedule">
            <section className="title_section">
                <Header title={"새 일정 쓰기"} />
            </section>
            <section className="input_section">
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox className="schedule_title" name="title" text={input.title} onChangeInput={onChangeInput} />
                </div>
                <div className="date">
                    <h2>날짜</h2>
                    <RectangleBox className="schedule_date" type="date" name="date" text={input.date} onChangeInput={onChangeInput} />
                </div>
                <div className="type">
                    <h2>타입</h2>
                    <select name="type" required onChange={onChangeInput}>
                        <option value="select">타입을 선택하세요</option>
                        <option value="GROUP">그룹</option>
                        <option value="PERSONAL">개인</option>
                    </select>
                    {/* <RectangleBox className="schedule_type" name="type" text={input.type} onChangeInput={onChangeInput} /> */}
                </div>
                <div className="group">
                    <h2>그룹</h2>
                    {
                        input ? 
                        (input.type === "GROUP" ? 
                            <select name="studyGroup" onChange={onChangeInput}>
                                <option>-- 스터디 그룹을 선택하세요 --</option>
                                {groups ? groups.map((group) => <option key={group.id} value={group.id}>{group.title}</option>) :
                                <p>loading...</p>}
                            </select> :
                            <select name="studyGroup" disabled></select> ):
                        null
                    }
                    {/* <RectangleBox className="schedule_group" name="studyGroup" text={input.studyGroup} onChangeInput={onChangeInput} /> */}
                </div>
            </section>
            <section className="button_section">
                <Button text={"취소하기"} onClick={()=>nav(-1)} />
                <Button text={"작성완료"} type={"POSITIVE"} onClick={onSubmit} />
            </section>
        </div>
    )
}

export default NewSchedule;