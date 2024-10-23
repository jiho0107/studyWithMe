import "../css/pages/MyGroupNotice.css";
import MainHeader from "../components/MainHeader";
import List3Menu from "../components/List3Menu";
import PostItem from "../components/PostItem";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { StateContext } from "../App";
import axios from "axios";

const MyGroupNotice = () => {
    const nav = useNavigate();
    const {loginMember} = useContext(StateContext);

    const [myGroups, setMyGroups] = useState();

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

    const getMyGroups = async () => {
        try{
            const {data, status} = await axios.get("/api/groups/me");
            console.log("getMyGroups : ",data);
            const groupsWithTitle = await Promise.all( // Promise.all()을 사용해 모든 비동기 호출이 완료된 후 데이터를 렌더링
                data.data.map(async (group)=>{
                    const post = await getPosts(group.postId);
                    return {
                        ...group,
                        ["title"]: post ? post.title : null
                    }
                })
            )
            setMyGroups(groupsWithTitle);
        } catch(error){
            console.log("getMyGroups 오류 : ",error);
        }
    }

    useEffect(()=>{
        getMyGroups();
    },[]);

    // loginMember가 존재하는지 확인 후 렌더링
    if (!loginMember) {
        return <p>loading...</p>; // loginMember가 undefined일 경우 로딩 메시지 표시
    }

    return (
        <div className="MyGroupNotice">
            <section className="title_section">
                <MainHeader title={"공지사항"} />
            </section>
            <section className="list_section">
                <List3Menu t1={"No"} t2={"그룹"} t3={"그룹 진행"} />
                <div className="list_wrapper">
                    {
                        myGroups === undefined ?
                        <p>loading...</p> :
                        myGroups.map((group)=> 
                        <PostItem 
                        key={group.id} 
                        id={group.id}
                        title={group.title}
                        isProgress={group.active}
                        onClick={()=>nav(`/notices/${group.id}`)} />)
                    }
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default MyGroupNotice;
