import "../css/pages/MyPosts.css";
import Header from "../components/Header";
import List3Menu from "../components/List3Menu";
import PostItem from "../components/PostItem";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const MyPosts = () => {
    const {loginMember} = useContext(StateContext);
    const [myPosts, setMyPosts] = useState();

    const nav = useNavigate();

    const getMyPosts = async () => { // 나의 게시글들 불러오기
        try{
            const {data} = await axios.get("/api/posts/me");
            console.log("axios - getMyPosts: ", data);

            // 각 게시글에 대해 그룹 정보를 추가
            const postsWithGroup = await Promise.all(  // Promise.all()을 사용해 모든 비동기 호출이 완료된 후 데이터를 렌더링
                data.data.map(async (post) => {
                    const group = await findGroup(post);
                    return {
                        ...post,
                        active : group ? group.active : null,
                    };
                })
            );
            setMyPosts(postsWithGroup);
        } catch(error){
            console.log("getMyPosts 에러: ",error);
        }
    }

    const findGroup = async (post) => { // 게시글id로 스터디그룹 찾기
        try{
            // 스터디그룹이 존재하는 경우
            const {data, status} = await axios.get(`/api/groups/post/${post.id}`);
            console.log("findGroup: ",data);
            return data;
        } catch(error){
            console.log("findGroup 오류발생: ",error);
            if(error.response.status === 400){ // 스터디 그룹이 존재하지 않는 경우
                console.log("findGroup : 스터디그룹이 존재하지 않습니다.");
                return null;
            }
        }
    }

    useEffect(()=>{
        getMyPosts();
    },[])

    // loginMember가 존재하는지 확인 후 렌더링
    if (!loginMember) {
        return <p>loading...</p>; // loginMember가 undefined일 경우 로딩 메시지 표시
    }

    return (
        <div className="MyPosts">
            <section className="title_section">
                <Header title={`${loginMember.loginId} 님의 게시글`} />
            </section>
            <section className="list_section">
                <List3Menu t1={"No"} t2={"제목"} t3={"그룹 진행"} />
                <div className="list_wrapper">
                    {myPosts === undefined ? 
                        <p>loading...</p> : 
                        myPosts.map((post) => 
                            <PostItem
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                isProgress={post.active}
                                onClick={()=>nav(`/applyCheck/${post.id}`)} />
                        )
                    }
                    {/* <PostItem id={1} title={"제목1"} isProgress={false} />
                    <PostItem id={2} title={"제목2"} isProgress={true} />
                    <PostItem id={3} title={"제목3"} isProgress={null} /> */}
                </div>
            </section>
            <section className="button_section">
                <Button text={"뒤로가기"} onClick={()=>nav(-1)} />
            </section>
        </div>
    )
}

export default MyPosts;