import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { actionCreators as chatActions } from "../redux/modules/chat";
import ChatList from '../components/ChatList';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Join from "../components/Join";

const AdminChatList = (props) => {
  const dispatch = useDispatch();

    const params = useParams();
    const roomId = params.roomId;

    const beforeMessage = useSelector((state) => state.chat.setMessage);
    console.log(beforeMessage);

    const sockjs = new SockJS(process.env.REACT_APP_CHAT_URL + `/chatting`);
    const stompClient = Stomp.over(sockjs);
    const Token = localStorage.getItem("token");


    const preview = useSelector((state) => state.chat.messages);
    console.log(preview);

  
    React.useEffect(() => {

      connect();
      // dispatch( chatActions.getChatMessagesAX(roomId)); 
      return () => { };
    }, []);
     
 
      const connect = () => {
    
        stompClient.connect({
          token: `${Token}`
        }, onConnected);

      };
      const onConnected = () => { };


        //채팅 룸에 접속한다음  소켓연결이 되야하는 라인  : 방 입장하는 버튼
  const enterRoom = () => {
    
    const Token = localStorage.getItem("token");
    console.log(roomId);
    stompClient.connect()
    stompClient.subscribe(`/sub/api/chat/rooms/${roomId}`, (data) => {
      const onMessage = JSON.parse(data.body);
      console.log(onMessage);
      const now_time = moment().format("YYYY-MM-DD HH:mm:ss");
      dispatch( chatActions.getChatMessagesAX(roomId)); 
      dispatch(
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
        
            <div>채팅방</div>
            <div id='hello'>
                {beforeMessage.map((item, idx) => (<ChatList key={idx} item={item} />))}
            </div>
            <div>
            {preview.map((item, idx) => (<ChatList key={idx} item={item} />))}
            </div>
            <div>
                <input type="text" onChange={changeMessage} />
                <button onClick={()=> {
                  sendMessage(roomId);
                }}>전송</button>
                 <Join
            enterRoom={enterRoom}
          />
                <div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default AdminChatList;