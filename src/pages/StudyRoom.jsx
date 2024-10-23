import "../css/pages/StudyRoom.css";
import MainHeader from "../components/MainHeader";
import List3Menu from "../components/List3Menu";
import PostItem from "../components/PostItem";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { StateContext } from "../App";
import axios from "axios";

const StudyRoom = () => {
    const nav = useNavigate();
    const {loginMember} = useContext(StateContext);
    const [groups, setGroups] = useState();

    const getMyGroups = async () => {
        try{
            const {data} = await axios.get("/api/groups/me");
            console.log("getMyGroups : ",data);

            // 각 그룹에 대해 게시글 제목을 추가
            const groupWithPost = await Promise.all(  // Promise.all()을 사용해 모든 비동기 호출이 완료된 후 데이터를 렌더링
                data.data.map(async (group) => {
                    const post = await findPost(group.postId);
                    return {
                        ...group,
                        title : post ? post.title : null,
                    };
                })
            );
            setGroups(groupWithPost);
        } catch(error){
            console.log("getMyGroups 오류: ",error);
        }
    }

    const findPost = async (postId) => {
        try{
            const {data} = await axios.get(`/api/posts/${postId}`);
            console.log("findPost : ", data);
            return data;
        } catch(error){
            console.log("findPostTitle 오류 : ",error);
            if(error.response.status === 400){ // 게시글이 존재하지 않는 경우
                console.log("findPost : 게시글이 존재하지 않습니다.");
                return null;
            }
        }
    }

    useEffect(()=>{
        getMyGroups();
    },[])

    // loginMember가 존재하는지 확인 후 렌더링
    if (!loginMember) {
        return <p>loading...</p>; // loginMember가 undefined일 경우 로딩 메시지 표시
    }

    return (
        <div className="StudyRoom">
            <section className="title_section">
                <MainHeader title={"Study Room"} />
            </section>
            <section className="list_section">
                <List3Menu t1={"No"} t2={"그룹"} t3={"그룹 진행"} />
                <div className="list_wrapper">
                    {groups === undefined ? 
                        <p>loading...</p> : 
                        groups.map((group) => 
                            <PostItem
                                key={group.id}
                                id={group.id}
                                title={group.title}
                                isProgress={group.active}
                                onClick={()=>nav(`/studyEnd/${group.id}`)} />
                        )
                    }
                    {/* <PostItem id={1} title={"앱1"} isProgress={true} />
                    <PostItem id={2} title={"앱2"} isProgress={false} />
                    <PostItem id={3} title={"앱3"} isProgress={null} /> */}
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default StudyRoom;