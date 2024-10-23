import "../css/pages/ApplyCheck.css";
import Header from "../components/Header";
import RectangleBox from "../components/RectangleBox";
import Apply from "../components/Apply";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";
import getWriter from "../util/getLoginIdById";

const ApplyCheck = () => {
    const nav = useNavigate();
    const postId = useParams().id;
    
    const [post, setPost] = useState({ // 게시글
        id:"",
        title:"",
        content:"",
        memberId:""
    })
    const [applicants, setApplicants] = useState([]); // 지원자들
    const [group, setGroup] = useState(); // 스터디그룹
    const [initialApplicants, setInitialApplicants] = useState([]); // 초기 지원자 상태 저장
    const [isForm, setIsForm] = useState(); // 스터디그룹 형성 여부

    const findPost = async () => { // 해당 게시글 찾기
        try{
            const {data} = await axios.get(`/api/posts/${postId}`);
            console.log("axios - findPost호출 : ", data);
            setPost(data);
        } catch(error){
            if(error.response.status === 400){
                console.log("해당 게시글이 존재하지 않습니다.");
            }
        }
    }
    const findGroup = async () => {
        try{
            const {data, status} = await axios.get(`/api/groups/post/${postId}`);
            console.log("findGroup호출-group: ",data);
            setGroup(data);
        } catch(error){
            console.log("findGroup 오류 : ",error);
            if(error.response.status === 400){
                console.log("해당 스터디 그룹은 존재하지 않습니다.");
            }
        }
        
    }
    const findApplicants = async () => { // 지원자들 목록 찾기
        try{
            const {data, status} = await axios.get(`/api/registers/${postId}`);
            console.log("findApplicant 호출 : ",data);
            const applicantsWithWriter = await Promise.all(
                data.data.map(async (register)=>{
                    const writer = await getWriter(register.memberId);
                    return {
                        ...register,
                        ["writer"]:writer?writer.loginId:null
                    }
                })
            )
            setInitialApplicants(applicantsWithWriter); // 초기 상태 저장
            setApplicants(applicantsWithWriter);
        } catch(error){
            console.log("findApplicant 오류 : ",error);
            if(error.response.status === 400){
                console.log("게시글이 존재하지 않음");
            }
            else if(error.response.status === 403){
                console.log("글 작성자만이 신청 목록을 볼 수 있음");
            }
        }
    }

    useEffect(()=>{
        findPost();
        findGroup();
        findApplicants();
    },[])

    const onClickComplete = () => { // 완료하기 버튼 클릭 시
        console.log("onClickComplete 호출");
        if(group !== undefined){ // 그룹이 이미 존재하는 경우
            if(group.active === false){ // 그룹 활동이 종료된 경우
                window.alert("이미 스터디 그룹이 종료되었습니다.");
                setApplicants([...initialApplicants]); // 지원자들의 상태를 초기 상태로 복구
            } 
            else if(group.active === true){ // 그룹 활동 중인 경우
                window.alert("이미 스터디 그룹이 진행 중입니다.");
                setApplicants([...initialApplicants]); // 지원자들의 상태를 초기 상태로 복구
            }
        }
        else{ // 그룹이 없는 경우
            if(applicants.find((applicant)=>applicant.accept === null)){ // 수락 또는 거절을 누르지 않은 경우
                window.alert("!! 수락 또는 거절을 모두 완료해 주세요 !!");
            }
            else{ // 수락 또는 거절을 모두 누른 경우
                if(window.confirm("지원자 수락/거절을 정말 완료하시겠습니까?")){
                    applicants.map(async (applicant)=>{
                        if(applicant.accept === true){ // 수락인 경우
                            try{
                                const {data,status} = await axios.post(`/api/registers/${postId}/${applicant.memberId}/accept`);
                                if(status === 200){
                                    console.log("지원자 수락 완료! : ", data);
                                }
                            }catch(error){
                                console.log("지원자 수락 오류 : ",error);
                                console.log(error.response.data);
                                window.alert(error.response.data);
                            }
                        }
                        else{ // 거절인 경우
                            try{
                                const {data,status} = await axios.post(`/api/registers/${postId}/${applicant.memberId}/reject`);
                                if(status === 200){
                                    console.log("지원자 거절 완료! : ", data);
                                }
                            }catch(error){
                                console.log("지원자 거절 오류 : ",error);
                                console.log(error.response.data);
                                window.alert(error.response.data);
                            }
                        }
                    })
                    //그룹형성
                    const formGroup = async () => {
                        try{
                            const {data,status} = await axios.post(`/api/groups/${postId}`);
                            if(status === 201){
                                console.log("그룹 형성 성공!! : ",data);
                                window.alert("스터디 그룹이 형성되었습니다!");
                                nav()
                                setIsForm(true);
                            }
                        } catch(error){
                            console.log("그룹 형성 오류 : ",error);
                            console.log(error.response.data);
                            window.alert(error.response.data);
                            setIsForm(false);
                        }
                    }
                    formGroup();
                }
            }
        }
    }

    return (
        <div className="ApplyCheck">
            <section className="title_section">
                <Header title={"지원자 수락/거절"} />
            </section>
            <section className="content_section">
                <div className="title">
                    <h2>제목</h2>
                    <RectangleBox text={post.title} readOnly={true} />
                </div>
                <div className="content">
                    <h2>내용</h2>
                    <textarea readOnly value={post.content} />
                </div>
            </section>
            <section className="apply_section">
                <h2>지원자</h2>
                <div className="apply_wrapper">
                    {
                        applicants.length !==0 ? 
                        applicants.map((applicant)=>
                            <Apply r_name={applicant.writer} key={applicant.id} apply={applicant} />) :
                        <p>지원자가 없습니다.</p>
                    }
                </div>
                {/* {isForm ? null : (isForm === false ? <div className="caution">[그룹형성 실패!] 수락/거절을 완료하고 1명 이상 수락해 주세요</div> : null)} */}
            </section>
            <section className="button_section">
                <Button text={"취소하기"} onClick={()=>nav(-1)} />
                <Button text={"완료하기"} type={"POSITIVE"} onClick={onClickComplete} />
            </section>
        </div>
    )
}

export default ApplyCheck;