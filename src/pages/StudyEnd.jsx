import "../css/pages/StudyEnd.css";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { StateContext } from "../App";
import axios from "axios";
import getWriter from "../util/getLoginIdById";

const StudyEnd = () => {
    const nav = useNavigate();

    const {loginMember} = useContext(StateContext);
    const [group, setGroup] = useState();
    const [participants, setParticipants] = useState();
    const [position, setPosition] = useState();
    const [isActive, setIsActive] = useState();
    const groupId = useParams().id; 

    const findGroup = async () => {
        try{
            const {data} = await axios.get(`/api/groups/${groupId}`); // 스터디그룹
            console.log("findGroup : ",data);
            setIsActive(data.active);
            // 그룹에 해당하는 게시글 찾기
            const post = await findPost(data);
            const groupWithPost = {
                ...data,
                title : post ? post.title : null
            }
            setGroup(groupWithPost);

            const participantsData = await getParticipants(data); // 참가자들 목록 불러오기
            const participantsWithWriter = await Promise.all(
                participantsData.map(async (participant)=>{
                    const writer = await getWriter(participant.memberId);
                        return {
                            ...participant,
                            ["writer"]:writer?writer.loginId:null
                        }
                })
            )
            setParticipants(participantsWithWriter);
        } catch(error){
            console.log("findGroup 오류 : ",error);
        }
    }

    const findPost = async (group) => {
        try{
            const {data} = await axios.get(`/api/posts/${group.postId}`); // 게시글
            console.log("findPost : ", data);
            return data;
        } catch(error){
            console.log("findPost 오류 : ",error);
            return null;
        }
    }

    const getParticipants = async (group) => {
        try{
            const {data} = await axios.get(`/api/participants/${group.id}`); // 참가자들 목록
            console.log("getParticipants : ", data);
            return data.data;
        } catch(error){
            console.log("getParticipants 오류 : ",error);
            return null;
        }
    }

    const getMyPosition = () => {
        if (participants && loginMember) {
            const myPosition = participants.find((participant) => participant.memberId === loginMember.id );
            if(myPosition){
                setPosition(myPosition.position);
            }
        }
    }

    useEffect(()=>{
        findGroup();
    },[])

    useEffect(()=>{
        if(participants){
            getMyPosition();
        }
    },[participants, loginMember])

    // loginMember가 존재하는지 확인 후 렌더링
    if (!loginMember || !group) {
        return <p>loading...</p>; // loginMember가 undefined일 경우 로딩 메시지 표시
    }

    // 조장 필터링
    const leader = participants ? participants.find((participant) => participant.position === "LEADER") : null;
    // 팀원 필터링
    const members = participants ? participants.filter((participant) => participant.position !== "LEADER") : null;

    const onClickEnd = async () => {
        console.log("스터디마감버튼클릭");
        try{
            if(window.confirm("스터디 그룹을 정말 종료할까요?")){
                const {data, status} =  await axios.post(`/api/groups/${groupId}/end`,
                    {
                        headers: {
                            'Content-Type': 'application/json', /* 요청,응답하는 데이터의 형식 */
                            'Accept': 'application/json', /* 클라이언트에게 반환되는 데이터의 형식 */
                        },
                        withCredentials: true // axios요청에서 쿠키 및 http 인증정보를 포함하도록 설정하는 옵션
                    }
                )
                if(status === 200){ // 스터디그룹 종료 성공 시
                    console.log("스터디 그룹 종료 성공!");
                    setIsActive(false);
                    window.alert("스터디 그룹이 종료되었습니다!");
                }
            }
            
        } catch(error){
            console.log("onClickEnd 오류 : ",error);
            if(error.response.status === 403){ // 조장이 아닌 경우
                console.log("조장만이 스터디그룹을 종료할 수 있음");
                window.alert("조장만이 스터디그룹을 종료할 수 있습니다.");
            }
            else if(error.response.status === 400){
                if(error.response.data === String("이미 스터디 그룹 활동이 종료되었습니다.")){
                    console.log("이미 스터디 그룹 활동이 종료됨");
                    window.alert("이미 스터디 그룹 활동이 종료되었습니다.");
                }
                else if(error.response.data === String("해당 스터디 그룹은 존재하지 않습니다.")){
                    console.log("해당 스터디 그룹은 존재하지 않음");
                    window.alert("해당 스터디 그룹은 존재하지 않습니다.");
                }
            }
            else{
                console.log("스터디 그룹 종료 기타 오류 : ",error.response);
            }
        }
    }

    return (
        <div className="StudyEnd">
            <section className="title_section">
                <Header title={group.title} />
            </section>
            <section className="info_section">
                <div className={`progress progress_${isActive}`}>
                    {isActive === true ? "진행 중" : isActive === false ? "완료" : ""}
                </div>
                <div className="position">
                    나의 직급 : {String(position) === "LEADER" ? "조장" : "팀원"}
                </div>
            </section>
            <section className="img_section">
                <div className="members_section">
                    <p>👑조장 : {leader ? leader.writer : null}</p>
                    <p>👥팀원 : </p>
                    <ul>
                        {members ? members.map((member) => (
                            <li key={member.memberId}>{member.writer}</li> // 팀원 출력
                        )) : null}
                    </ul>
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
                <Button text={"스터디 마감"} type={"POSITIVE"} onClick={onClickEnd} />
            </section>
        </div>
    )
}

export default StudyEnd;