import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

import { actionCreators as chatActions } from "../redux/modules/chat";
import ChatList from '../components/ChatList';
import MessageList from '../components/MessageList';
import MessageWrite from '../components/MessageWrite';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import logo from '../src_assets/eyagiLogo1.png'
import { useBeforeunload } from "react-beforeunload";

const AdminChatList = (props) => {
  const dispatch = useDispatch();
  // useBeforeunload((event) => event.preventDefault());
  const params = useParams();
  const roomId = params.roomId;
  const sockjs = new SockJS(process.env.REACT_APP_CHAT_URL + `/chatting`);
  const stompClient = Stomp.over(sockjs);
  const Token = localStorage.getItem("token");
  // 현재 방정보
  // ChatRoomList에서 받아오는 정보
  // 채팅 목록 조회시 받아온 정보로 특정 채팅방 입장
  const room_id = props.history.location.state?.room_id;
  const roomName = props.history.location.state?.roomName;
  const own_user_id = props.history.location.state?.own_user_id;

  // 새로고침될때 방 정보 날아가지 않도록 함
  React.useEffect(() => {
    // 리덕스의 현재방 정보 변경
    if (Token) {
      dispatch(
        chatActions.moveChatRoom(
          room_id,
          roomName,
          own_user_id
        )
      );
      // 이전 대화 기록 불러오기
      dispatch(chatActions.getChatMessagesAX(roomId));
    }
  }, []);

  // 방 정보가 바뀌면 소켓 연결 구독, 구독해제
  React.useEffect(() => {
    // 방 정보가 없는 경우 홈으로 돌려보내기
    if (!room_id) {
      console.log("room_id 내놔");
    }
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [room_id ? room_id : null]);

  // 채팅방시작하기, 채팅방 클릭 시 room_id에 해당하는 방을 구독
  const wsConnectSubscribe = () => {
    try {
      stompClient.debug = null;
      stompClient.connect(
        {
          token: Token,
        },
        () => {
          stompClient.subscribe(
            `/sub/api/chat/rooms/${room_id}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              // 실시간 채팅 시간 넣어주는 부분
              const now_time = moment().format("YYYY-MM-DD HH:mm:ss");
              dispatch(
                chatActions.getMessages({ ...newMessage, createdAt: now_time })
              );
            },
            {
              token: Token,
            }
          );
        }
      );
    } catch (e) {
      console.log("소켓 커넥트 에러", e);
    }
  };

  // 다른 방을 클릭하거나 뒤로가기 버튼 클릭시 연결해제 및 구독해제
  const wsDisConnectUnsubscribe = () => {
    try {
      stompClient.debug = null;
      stompClient.disconnect(
        () => {
          stompClient.unsubscribe("sub-0");
          clearTimeout(waitForConnection);
        },
        { token: Token }
      );
    } catch (e) {
      console.log("연결 구독 해체 에러", e);
    }
  };

  // 웹소켓이 연결될 때 까지 실행하는 함수
  const waitForConnection = (stompClient, callback) => {
    setTimeout(() => {
      if (stompClient.ws.readyState === 1) {
        callback();
      } else {
        waitForConnection(stompClient, callback);
      }
    }, 0.1);
  };

  const sendMessage = (new_message) => {
    const userId = localStorage.getItem("userId");
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
        // console.log("메세지보내기 상태", stompClient.ws.readyState);
      });
    } catch (e) {
      console.log("message 소켓 함수 에러", e);
      console.log("메세지보내기 상태", stompClient.ws.readyState);
    }
  };
  
    // 메세지가 변할 때마다 스크롤 이동시켜주기
    const messages = useSelector((state) => state.chat.messages);
    // 스크롤 대상
    const messageEndRef = React.useRef();

    // console.log(messages, messageEndRef);
    const scrollTomBottom = () => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
      }
    };
    // 렌더링시 이동
    React.useEffect(() => {
      scrollTomBottom();
    }, [messages.length]);


    // 방 나가기 - 사용자, 방장 구분 후 실행하는 함수
    const get_out_chat = () => {
      console.log(roomId);
      dispatch(chatActions.leaveChatAX(roomId));
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
            <button id="exit" 
              onClick={get_out_chat} //채팅방 나가기 함수.
            >x</button> 
            <div id="lastest" ref={messageEndRef}>
              <MessageList />
            </div>
            <div id='hello'></div>
            <div id="btm_area">
              <MessageWrite sendMessage={sendMessage} />
            </div>
          </Wrap>
        </div>
      </React.Fragment>
    )
}
const Wrap = styled.div`
background-color: #fffefc;
border: 1px solid #000;
width: 580px;
height: calc(100vh - 270px);
padding: 0 0 0;
position: relative;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
flex-wrap: nowrap;

box-sizing: border-box;
& * {box-sizing: border-box;}

#exit {
  position: absolute;
  top: 20px; 
  right: 20px;
  z-index: 5;
  background-color: #EBEBEB;
  border: none;
  width: 36px; 
  height: 36px;
  font-size: 20px;

  :hover {color: #fff; background-color: #222;}
}

#lastest {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x:hidden;
  ::-webkit-scrollbar{
    display: none;
  }
}

#hello {
  
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding-bottom: 160px;
}

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

  & input {
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

export default AdminChatList;