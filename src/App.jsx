import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState, createContext } from 'react';
import Home from "./pages/Home";
import Notfound from './pages/Notfound';
import Login from './pages/Login';
import Join from './pages/Join';
import Main from './pages/Main';
import MyPage from "./pages/MyPage";
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import MyPosts from "./pages/MyPosts";
import ApplyCheck from "./pages/ApplyCheck";
import StudyRoom from "./pages/StudyRoom";
import StudyEnd from "./pages/StudyEnd";
import MyGroupNotice from './pages/MyGroupNotice';
import GroupNotices from "./pages/GroupNotices";
import NewNotice from './pages/NewNotice';
import Notice from './pages/Notice';
import ScheduleManage from './pages/ScheduleManage';
import MyGroupSchedules from './pages/MyGroupSchedules';
import NewSchedule from './pages/NewSchedule';
import Schedule from './pages/Schedule';


export const StateContext = createContext();
export const DispatchContext = createContext();

function App() {
  const [loginMember, setLoginMember] = useState();

  console.log("App컴포넌트 진입");

  useEffect(()=>{
    console.log("App컴포넌트 useEffect 진입");
    function getLoginMember(){
      if(sessionStorage.getItem("loginMember")){
        setLoginMember(JSON.parse(sessionStorage.getItem("loginMember")));
        console.log("로그인한 회원: ",JSON.parse(sessionStorage.getItem("loginMember")));
      }
      else{
        setLoginMember(null);
        console.log("아직 로그인한 회원 없음",loginMember);
      }
    }
    getLoginMember();
  },[])

  // if(loginMember === undefined){
  //   console.log("App컴포넌트 loginMember === undefined");
  //   return (<div>로딩 중</div>);
  // }

  return (
    <>
      {console.log("App컴포넌트 return문 진입")}
      <StateContext.Provider value={{loginMember}} >
        <DispatchContext.Provider value={{setLoginMember}} >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/main' element={<Main />} />
            <Route path='/join' element={<Join />} />
            <Route path='/login' element={<Login />} />
            <Route path='/myPage' element={<MyPage />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/newPost' element={<NewPost />} />
            <Route path='/posts' element={<MyPosts />} />
            <Route path='/applyCheck/:id' element={<ApplyCheck />} />
            <Route path='/studyRoom' element={<StudyRoom />} />
            <Route path='/studyEnd/:id' element={<StudyEnd />} />
            <Route path='/newNotice/:id' element={<NewNotice />} />
            <Route path='/notices' element={<MyGroupNotice />} />
            <Route path='/notices/:id' element={<GroupNotices />} />
            <Route path='/notice/:id' element={<Notice />} />
            <Route path='/scheduleManage' element={<ScheduleManage />} />
            <Route path='/schedules/:id' element={<MyGroupSchedules />} />
            <Route path='/newSchedule' element={<NewSchedule />} />
            <Route path='/schedule/:id' element={<Schedule />} />
            <Route path='*' element={<Notfound />} />  
          </Routes>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  )
}

export default App
