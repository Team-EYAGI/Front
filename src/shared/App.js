import React, { lazy, Suspense } from 'react';
import '../App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import styled from 'styled-components';
import axios from "axios";

// 기본 로드 페이지 목록
import AudioPlay from '../pages/AudioPlay';
import MyPage from '../pages/MyPage';
import AudioModal from "../pages/AudioModal";
import SellerProfile from '../pages/SellerProfile';

// 컴포넌트 목록
import ScrollToTop from './ScrollToTop';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpeedDialOpen from '../elements/SpeedDial';
import Spinner from '../elements/Spinner'
import KakaoAuthHandler from '../pages/KakaoAuthHandler';

// 레이지 로딩
const AudioWrite = lazy(() => import('../pages/AudioWrite'));
const Book = lazy(() => import('../pages/Book'));
const BookDetail = lazy(() => import('../pages/BookDetail'));
const Funding = lazy(() => import('../pages/Funding'));
const FundingDetail = lazy(() => import('../pages/FundingDetail'));
const FundingWrite = lazy(() => import('../pages/FundingWrite'));
const LogIn = lazy(() => import('../pages/LogIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Main = lazy(() => import('../pages/Main'));
const Request = lazy(() => import('../pages/Request'));
const RequestWrite = lazy(() => import('../pages/RequestWrite'));
const Search = lazy(() => import('../pages/Search'));
const ReviewWirte = lazy(() => import('../pages/ReviewWrite'));
const ProfileEdit = lazy(() => import('../pages/ProfileEdit'));
const Chat = lazy(() => import('../pages/Chat'));
const Admin = lazy(() => import('../pages/Admin'));
const AdminChat = lazy(() => import('../pages/AdminChat'));
const AddProfileVoice = lazy(() => import('../pages/AddProfileVoice'));
const Loading = lazy(() => import('../pages/Loading'));
const LoadingPage = lazy(() => import('../pages/LoadingPage'));
const ServiceGuide = lazy(() => import('../pages/ServiceGuide'));
const SellerList = lazy(() => import('../pages/SellerList'));

function App() {

  // 이미 방이 있는지 확인
  const checkRoom = () => {
    const roomId = localStorage.getItem("roomId");

    if (roomId == null) {
      createRoom();
    } else {
      history.push('/Chat');
    }
  };

  const createRoom = () => {
    //방이름 => chatRoomName  /  uuid => 닉네임
    // const formData = new FormData();
    // formData.append("name", "임시 채팅방");  
    const Token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");
    const chatRoomName = "문의하기";

    axios.post(process.env.REACT_APP_CHAT_URL + "/chat/rooms", {
      chatRoomName: chatRoomName,
      uuid: userName
    }, {
      headers: { 'Authorization': `${Token}` }
    })
      .then((res) => {
        localStorage.setItem("roomId", res.data.roomId);
        localStorage.setItem("userId", res.data.userId);
        history.push('/Chat');
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <React.Fragment className="App">
      <ConnectedRouter history={history}>
        <ScrollToTop />
        <Header />
        <Wrap>
          <Suspense fallback={<Spinner />}>
            <Route path="/" exact component={Main} />
            <Route path="/login" exact component={LogIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/mypage" exact component={MyPage} />
            <Route path="/mypage/:category" exact component={MyPage} />
            <Route path="/sellerProfile" exact component={SellerProfile} />
            <Route path="/sellerProfile/:sellerName" exact component={SellerProfile} />
            <Route path="/sellerProfile/:sellerName/:category" exact component={SellerProfile} />
            <Route path="/Admin" exact component={Admin} />
            <Route path="/AdminChat/:roomId" exact component={AdminChat} />
            <Route path="/chat" exact component={Chat} />
            <Route path="/audioWrite" exact component={AudioWrite} />
            <Route path="/audioWrite/:category/:bookId" exact component={AudioWrite} />
            <Route path="/audioPlay" exact component={AudioPlay} />
            <Route path="/audioPlay/:category/:bookId/:audioBookId" exact component={AudioPlay} />
            <Route path="/audioModal/:category/:bookId/:audiobookId" exact component={AudioModal} />
            <Route path="/book/" exact component={Book} />
            <Route path="/book/:category" exact component={Book} />
            <Route path="/bookDetail/:category/:bookId" exact component={BookDetail} />
            <Route path="/funding" exact component={Funding} />
            <Route path="/fundingDetail/:fundingId" exact component={FundingDetail} />
            <Route path="/fundingWrite/:bookId" exact component={FundingWrite} />
            <Route path="/profileEdit" exact component={ProfileEdit} />
            <Route path="/profileEdit/:userId" exact component={ProfileEdit} />
            <Route path="/addvoice" exact component={AddProfileVoice} />
            <Route path="/addvoice/:userId" exact component={AddProfileVoice} />
            <Route path="/loading" exact component={Loading} />
            <Route path="/loading/:result" exact component={Loading} />
            <Route path="/loadingPage" exact component={LoadingPage} />
            <Route path="/loadingPage/:result/:category/:bookId" exact component={LoadingPage} />
            <Route path="/request" exact component={Request} />
            <Route path="/requestWrite" exact component={RequestWrite} />
            <Route path="/requestWrite/:bookId" exact component={RequestWrite} />
            <Route path="/requestWrite/:bookId/:bookRequestId" exact component={RequestWrite} />
            <Route path="/reviewWrite/:category/:bookId/:audioBookId" exact component={ReviewWirte} />
            <Route path="/reviewWrite/:category/:bookId/:audioBookId/:commentId" exact component={ReviewWirte} />
            <Route path="/user/kakao/callback" component={KakaoAuthHandler} />
            <Route path="/search" exact component={Search}/>
            <Route path="/serviceGuide" exact component={ServiceGuide} />
            <Route path="/sellerList" exact component={SellerList} />
          </Suspense>
        </Wrap>
        <Footer />
        <Icon>
          <SpeedDialOpen checkRoom={checkRoom} />
        </Icon>
      </ConnectedRouter>
    </React.Fragment>
  );
}

const Wrap = styled.div`
  min-height: calc(100vh - 300px);
`

const Icon = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 1;
  
  cursor: pointer;
`

export default App;