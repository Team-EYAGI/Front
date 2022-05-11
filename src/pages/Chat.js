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


// var stompClient = null;

const Chat = (props) => {
  const dispatch = useDispatch();

  useBeforeunload((event) => event.preventDefault());


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
  console.log(preview);

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


  //채팅 룸에 접속한다음  소켓연결이 되야하는 라인  : 방 입장하는 버튼
  const enterRoom = () => {
    const Token = localStorage.getItem("token");
    const roomId = localStorage.getItem("roomId");
    // console.log(roomId);
    // stompClient.debug = null;
    stompClient.connect()
    stompClient.subscribe(`/sub/api/chat/rooms/${roomId}`, (data) => {
      const onMessage = JSON.parse(data.body);
      console.log(onMessage);
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
  const sendMessage = () => {
    const roomId = localStorage.getItem("roomId");
    const userId = localStorage.getItem("userId");
    try {
      // 토큰없으면 다시 로그인 시키기
      // if (!token) {
      //   customAlert.sweetNeedLogin();
      // }
      // send할 데이터
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
      <Wrap>
        <div>채팅방</div>
        <div id='hello'>
        {preview.map((item, idx) => ( <ChatList key={idx} item={item}/> ))}
        </div>
        <div>
          <input type="text" onChange={changeMessage} />
          <button onClick={sendMessage}>전송</button>
          <Join
            enterRoom={enterRoom}
          />

        </div>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  background-color: lightblue;

  width: 1200px;
  /* height: 800px; */
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  #hello {
    background-color: #2a2a2a;
    width: 1000px;
    min-height: 600px;
  }
`

export default Chat