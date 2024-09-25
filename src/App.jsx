import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
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

import axios from 'axios';

function App() {
  //데이터를 context에 담아야할듯

  return (
  
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/main' element={<Main />} />
      <Route path='/join' element={<Join />} />
      <Route path='/login' element={<Login />} />
      <Route path='/myPage' element={<MyPage />} />
      <Route path='/post/:id' element={<Post />} />
      <Route path='/newPost' element={<NewPost />} />
      <Route path='/posts' element={<MyPosts />} />
      <Route path='/applyCheck' element={<ApplyCheck />} />
      <Route path='/studyRoom' element={<StudyRoom />} />
      <Route path='/studyEnd/:id' element={<StudyEnd />} />
      <Route path='/newNotice' element={<NewNotice />} />
      <Route path='/notices' element={<MyGroupNotice />} />
      <Route path='/notices/:id' element={<GroupNotices />} />
      <Route path='/notice/:id' element={<Notice />} />
      <Route path='/scheduleManage' element={<ScheduleManage />} />
      <Route path='/schedules/:id' element={<MyGroupSchedules />} />
      <Route path='/newSchedule' element={<NewSchedule />} />
      <Route path='/schedule/:id' element={<Schedule />} />
      <Route path='*' element={<Notfound />} />  
    </Routes>
  )
}

export default App
