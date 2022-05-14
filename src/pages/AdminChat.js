import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

import { actionCreators as chatActions } from "../redux/modules/chat";
import ChatList from '../components/ChatList';
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
    const roomName = props.history.location.state?.romName;
    console.log(roomName);
    // const room_id = props.history.location.state?.room_id;
    // const post_id = props.history.location.state?.post_id;
    // const own_user_id = props.history.location.state?.own_user_id;
    // const order_time = props.history.location.state?.order_time;

    const beforeMessage = useSelector((state) => state.chat.setMessage);
    const preview = useSelector((state) => state.chat.messages); //얘가 문젠데..

  
    React.useEffect(() => {

      connect();
      dispatch( chatActions.getChatMessagesAX(roomId)); 
      dispatch(chatActions.clearChat());
      return () => { };
    }, []); 
     
 
      const connect = () => {
    
        stompClient.connect({
          token: `${Token}`
        }, onConnected);
        
      };
      const onConnected = () => { };

  // 채팅 룸에 접속한다음  소켓연결이 되야하는 라인  : 방 입장하는 버튼
  const enterRoom = () => {
    // const roomId = localStorage.getItem("roomId");
    const Token = localStorage.getItem("token");

    stompClient.connect()
    stompClient.subscribe(`/sub/api/chat/rooms/${roomId}`, (data) => {
      const onMessage = JSON.parse(data.body);
      console.log(onMessage);
      const now_time = moment().format("YYYY-MM-DD HH:mm:ss");
      // dispatch( chatActions.getChatMessagesAX(roomId)); 
      dispatch(
        // chatActions.getChatMessagesAX(roomId),
        chatActions.getMessages({ ...onMessage, createdAt: now_time })
      );
    },
      {
        token: `${Token}`,
      }
    );
  };

  const [list, setList] = React.useState([
    { nick: "임시 사용자", text: "test message" },
  ]);

    //연결된 서버와의 통신시 payloadData의 타입에 따른 정보들 //메세지 읽어오는부분
    const onMessageReceived = (payload) => {
      console.log(payload)
      var payloadData = JSON.parse(payload.body);
      console.log(payloadData);//서버에서 보내주는 정보
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

    const [message, setMessage] = React.useState("");
    const changeMessage = (e) => {
      setMessage(e.target.value);
    };
    const sendMessage = (roomId) => {
      const userId = localStorage.getItem("userId");
      try {
        const data = {
          type: "TALK",
          roomId: roomId,
          senderId: userId,
          message: message,
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
            <div id="lastest">
              {beforeMessage.map((item, idx) => (<ChatList key={idx} item={item} />))}
            </div>
            <div id='hello'>
              {preview.map((item, idx) => (<ChatList key={idx} item={item} />))}
            </div>
            <div id="btm_area">
              <div>
                <input type="text" onChange={changeMessage}/>
                <button className="set" onClick={()=> {
                  sendMessage(roomId);
                }}>전송</button>
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
flex-wrap: nowrap;
overflow-x: hidden;
overflow-y: scroll;

box-sizing: border-box;
& * {box-sizing: border-box;}

::-webkit-scrollbar{
  display: none;
}

#lastest {
  width: 100%;
  height: auto;
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