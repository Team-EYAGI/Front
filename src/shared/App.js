import React from 'react';
import '../App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import styled from 'styled-components';
import axios from "axios";

// 페이지 목록
import AudioPlay from '../pages/AudioPlay';
import AudioWrite from '../pages/AudioWrite';
import Book from '../pages/Book';
import BookDetail from '../pages/BookDetail';
import Funding from '../pages/Funding';
import FundingDetail from '../pages/FundingDetail';
import FundingWrite from '../pages/FundingWrite';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Request from '../pages/Request';
import RequestWrite from '../pages/RequestWrite';
import Search from '../pages/Search';
import AudioModal from "../pages/AudioModal";
import ReviewWirte from '../pages/ReviewWrite';
import SellerProfile from '../pages/SellerProfile';
import ProfileEdit from '../pages/ProfileEdit';
import Chat from '../pages/Chat';
import Admin from '../pages/Admin';
import AdminChat from '../pages/AdminChat';
import KakaoAuthHandler from '../pages/KakaoAuthHandler';
import AddProfileVoice from '../pages/AddProfileVoice';
import Loading from '../pages/Loading'
import LoadingPage from '../pages/LoadingPage'

// 컴포넌트 목록
import ScrollToTop from './ScrollToTop';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpeedDialOpen from '../elements/SpeedDial';

function App() {

  const createRoom = () => {       //방이름 => chatRoomName  /  uuid => 닉네임
    // const formData = new FormData();
    // formData.append("name", "임시 채팅방");  
    const Token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");
    const chatRoomName = "문의하기";

    axios.post(process.env.REACT_APP_CHAT_URL + "/chat/rooms",{
        chatRoomName : chatRoomName,
        uuid :userName
      }, {
        headers: {'Authorization': `${Token}` }
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.roomId);
        //scrollbarRef.current.scrollToBottom();
        localStorage.setItem("roomId",res.data.roomId);
        localStorage.setItem("userId",res.data.userId);
        history.push('/Chat');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment className="App">
      <ConnectedRouter history={history}>
        <ScrollToTop/>
        <Header />
        <Wrap>
          <Route path="/Admin" exact component={Admin} />
          <Route path="/AdminChat/:roomId" exact component={AdminChat} />
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/audioPlay" exact component={AudioPlay} />
          <Route path="/audioPlay/:category/:bookId/:audioBookId" exact component={AudioPlay} />
          <Route path="/audioWrite" exact component={AudioWrite} />
          <Route path="/audioWrite/:category/:bookId" exact component={AudioWrite} />
          <Route path="/book/" exact component={Book} />
          <Route path="/book/:category" exact component={Book} />
          <Route path="/bookDetail/:category/:bookId" exact component={BookDetail} />
          <Route path="/audioModal/:category/:bookId/:audiobookId" exact component={AudioModal} />
          <Route path="/funding" exact component={Funding} />
          <Route path="/fundingDetail/:fundingId" exact component={FundingDetail} />
          <Route path="/fundingWrite/:bookId" exact component={FundingWrite} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/mypage/:category" exact component={MyPage} />
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
          <Route path="/sellerProfile" exact component={SellerProfile} />
          <Route path="/sellerProfile/:sellerName" exact component={SellerProfile} />
          <Route path="/sellerProfile/:sellerName/:category" exact component={SellerProfile} />
          <Route path="/requestWrite/:bookId/:bookRequestId" exact component={RequestWrite} />
          <Route path="/search" exact component={Search} />
          <Route path="/reviewWrite/:category/:bookId/:audioBookId" exact component={ReviewWirte} />
          <Route path="/reviewWrite/:category/:bookId/:audioBookId/:commentId" exact component={ReviewWirte} />
          <Route path="/user/kakao/callback" component={KakaoAuthHandler} />
        </Wrap>
        <Footer />
        <Icon>
          <SpeedDialOpen createRoom={createRoom}/>
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
