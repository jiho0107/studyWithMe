import "../css/pages/Main.css";
import Menu from "../components/Menu";
import MainHeader from "../components/MainHeader";
import List3Menu from "../components/List3Menu";
import PostItem from "../components/PostItem";
import Button from "../components/Button";
import { useContext, useEffect, useState } from "react";
import {StateContext} from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Main = () => {
    // const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState(); // 모든 게시글들
    const nav = useNavigate();

    const {loginMember} = useContext(StateContext);
    console.log("Main페이지 - loginMember: ",loginMember);

    const onClickLogout = async () => { // 로그아웃 처리
        if(window.confirm("로그아웃 하시겠습니까?")){
            try{
                const {data, status} = await axios.post("/logout");
                // 로그아웃 성공 시
                if(status === 200){
                    console.log("로그아웃 성공!");
                    sessionStorage.removeItem("loginMember");
                    nav("/",{replace:true});
                }
            } catch(error){
                // 로그아웃 실패 시
                console.log("로그아웃 실패");
            } 
        } else{ // 로그아웃 취소
            console.log("로그아웃 취소");
        }
    }


    const getAllPosts = async () => { // 모든 게시글들 불러오기
        try{
            const {data} = await axios.get("/api/posts");
            console.log("axios - getAllPosts: ", data);
            setPosts(data);
            // setIsLoading(false);
        } catch(error){
            console.log("getAllPosts 에러: ",error);
        }
    }

    useEffect(()=>{
        getAllPosts();
    },[])
    
    return(
        <div className="Main">
            <section className="menu_section">
                <h2>Study<br/>WithMe</h2>
                <Menu text={"공지사항"} onClick={()=>nav("/notices")} />
                <Menu text={"일정관리"} onClick={()=>nav("/scheduleManage")} />
                <Menu text={"MyPage"} onClick={()=>nav("/myPage")} />
                <Menu text={"로그아웃"} onClick={onClickLogout} />
            </section>
            <section className="list_section">
                <MainHeader title={"게시글 소식"} />
                
                <List3Menu t1={"NO"} t2={"제목"} t3={"작성자"} />
                <div className="list_wrapper">
                    {/* {posts === undefined ? ( 
                        <p>게시글을 불러오는 중입니다...</p>
                    ) : (posts.length > 0 ? ( 
                        posts.map((post) => (
                            <PostItem key={post.id} {...post} />
                        ))
                    ) : (
                        <p>게시글이 없습니다.</p> 
                    ))} */}

                    {/* <PostItem id={1} title={"test1"} writer={"w1"} />
                    <PostItem id={2} title={"test2"} writer={"w2"} /> */}
                </div>
            </section>
            <section className="button_section">
                <Button  text={"글쓰기"} type={"POSITIVE"} onClick={()=>nav("/newPost")} />
            </section>
        </div>
    )
}

export default Main;