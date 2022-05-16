import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ChatList from '../components/ChatList';
import { getToken } from "../shared/Token";
import { actionCreators as chatActions } from "../redux/modules/chat";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Join from "../components/Join";
import moment from "moment";
import { useBeforeunload } from "react-beforeunload";
import logo from '../src_assets/eyagiLogo1.png';
import MessageWrite from '../components/MessageWrite';


// var stompClient = null;

const Chat = (props) => {
  const dispatch = useDispatch();
  useBeforeunload((event) => event.preventDefault());
  const handleEvent = (e) => { 
    if (e.nativeEvent.isComposing) { return; } 
    if (e.key !== "Enter") { 
      return; } sendMessage();
  };


  const sockjs = new SockJS(process.env.REACT_APP_CHAT_URL + `/chatting`);
  const stompClient = Stomp.over(sockjs);


  const [list, setList] = React.useState([
    { nick: "임시 사용자", text: "test message" },
  ]);

  const is_session = localStorage.getItem("is_login");
  const Token = localStorage.getItem("token");
  const userName = localStorage.getItem("username");
  const chatRoomName = "문의하기";

  const preview = useSelector((state) => state.chat.messages);
  // console.log(preview);

  //화면이 렌더 될때 서버와의 연결
  React.useEffect(() => {

    // createRoom(chatRoomName,userName);
    connect();
    // enterRoom();
    return () => { };
  }, []);


  // connect 함수
  const connect = () => {

    stompClient.connect({
      token: `${Token}`
    }, onConnected);
  };
  const onConnected = () => { };

  //클릭이벤트 추가 join
  const [click ,setClick] = React.useState(true);
  // console.log(click);

  //채팅 룸에 접속한다음  소켓연결이 되야하는 라인  : 방 입장하는 버튼
  const enterRoom = () => {
    const Token = localStorage.getItem("token");
    const roomId = localStorage.getItem("roomId");
    setClick(false);

    stompClient.connect()
    stompClient.subscribe(`/sub/api/chat/rooms/${roomId}`, (data) => {
      const onMessage = JSON.parse(data.body);
      // console.log(onMessage);
      const now_time = moment().format("YYYY-MM-DD HH:mm:ss");
      dispatch(
        chatActions.getMessages({ ...onMessage, createdAt: now_time })
      );
    },
      {
        token: `${Token}`,
      }
    );

  };
  //연결된 서버와의 통신시 payloadData의 타입에 따른 정보들 //메세지 읽어오는부분
  const onMessageReceived = (payload) => {
    // console.log(payload)
    var payloadData = JSON.parse(payload.body);
    // console.log(payloadData);//서버에서 보내주는 정보
    switch (payloadData.type) {
      case "JOIN":
        break;
      case "MESSAGE":
        break;
      case "TALK":
        setList((list) => [
          ...list,
          { nick: payloadData.sender, text: payloadData.message },
        ]);
        break;
    }
  };

  const sendMessage = (new_message) => {
    const roomId = localStorage.getItem("roomId");
    const userId = localStorage.getItem("userId");
    console.log(roomId + "/" + userId);
    try {
      const data = {
        type: "TALK",
        roomId: roomId,
        senderId: userId,
        message: new_message,
      };
      waitForConnection(stompClient, () => {
        stompClient.debug = null;

        stompClient.send("/pub/message",
          {
            token: `${Token}`,
          }, JSON.stringify(data));
        console.log("메세지보내기 상태", stompClient.ws.readyState);
      });
    } catch (e) {
      console.log("message 소켓 함수 에러", e);
      console.log("메세지보내기 상태", stompClient.ws.readyState);
    }
  };

  // 웹소켓이 연결될 때 까지 실행하는 함수
  const waitForConnection = (ws, callback) => {
    setTimeout(() => {
      if (stompClient.ws.readyState === 1) {
        callback();
      } else {
        waitForConnection(stompClient, callback);
      }
    }, 0.1);

  };

  return (
    <React.Fragment>
      <div className="container"
        style={{
          display: 'flex',
          justifyContent: "center",
          alignItems:"center",
        }}
      >
        <div className="logo_left"
        style={{
          maxWidth: "708px",
          width: "calc(100% - 48px)",
          boxSizing: "border-box",
          marginRight: "24px"
        }}
        >
          <img src={logo} style={{maxWidth: "100%"}} alt="eyagi"/>
        </div>
        <Wrap>
          <div id='hello'>
          {preview.map((item, idx) => ( <ChatList key={idx} item={item}/> ))}
          </div>
          <div id="btm_area">
            <div>
            <MessageWrite sendMessage={sendMessage} />
              <Join
                enterRoom={enterRoom}
                click={click}
              />
            </div>
          </div>
        </Wrap>
      </div>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  background-color: #fffefc;
  border: 1px solid #000;
  border-width: 0 1px 1px;
  width: 580px;
  height: calc(100vh - 270px);
  padding: 0 0 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  box-sizing: border-box;
  & * {box-sizing: border-box;}

  #hello {
    
    width: 100%;
    overflow: hidden scroll;
    max-height: 100%
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    padding-bottom: 160px;
  }

  #hello::-webkit-scrollbar{
    display: none
  };

  #btm_area {
    width: calc(100%);
    position: absolute;
    bottom: 0; 
    z-index: 10;
    left:50%;
    transform:translate(-50%, 0);
    background-color: #EBEBEB;
    height: 140px;
    padding: 15px 9px 15px 0;
    & div {
      position: relative; z-index: 5;
      width: 100%; height: auto;
      height: 100%;
      display:flex;
      justify-content: space-between;
      align-items: center;
    }

    & textarea {
      width: calc(100% - 160px); 
      height: 100%;
      border: none;
      padding: 5px 12px;
      resize:none;
      z-index:1;
      positioN: relative;
      background-color: transparent;
      overflow:hidden;
      :focus {outline: none;}
    }

    & button {
      font-weight: bold;
      z-index: 5;
      position: absolute;
      right: 0;
      padding: 0;
      top: 50%;
      width: 100%;
      height: 100%;
      transform: translateY(-50%);
      border: none; background: none;
      font-size: 16px;
      background: #EBEBEB;
      transition: 0.35s all;
    }
    
    & .hide {
      opacity:0;
      z-index: -1;
    }

    & .set {
      position: static;
      width: 160px;
      height: 100%;
      z-index:3;
      right:0; top: 0;
      transform: none;
      background-color: #f4f4f4;      
      border-radius: 12px;
    }
  }
`

export default Chat