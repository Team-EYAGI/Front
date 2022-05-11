import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Text } from "../elements/Index";
import moment from "moment";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import Join from "../components/Join";
import { actionCreators as chatActions } from "../redux/modules/chat";
import ChatList from '../components/ChatList';
import { useParams } from 'react-router-dom';

const AdminChatList = (props) => {
    const params = useParams();
    const roomId = params.roomId;
    const preview = useSelector((state) => state.chat.messages);
    const beforeMessage = useSelector((state) => state.chat.setMessage);
    console.log(beforeMessage);
    console.log(preview);
    const dispatch = useDispatch();

    const sockjs = new SockJS(process.env.REACT_APP_CHAT_URL + "/chatting");
    const stompClient = Stomp.over(sockjs);
    const Token = localStorage.getItem("token");

    React.useEffect(() => {

      connect();
      dispatch( chatActions.getChatMessagesAX(roomId)); 
      return () => { };
    }, []);
     
 
      const connect = () => {
    
        stompClient.connect({
          token: `${Token}`
        }, onConnected);

      };
      const onConnected = () => { };


        //채팅 룸에 접속한다음  소켓연결이 되야하는 라인  : 방 입장하는 버튼
  const enterRoom = (roomId) => {
    console.log(roomId);
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

    const [message, setMessage] = React.useState("");
    const changeMessage = (e) => {
      setMessage(e.target.value);
    };
    const sendMessage = () => {
      const roomId = localStorage.getItem("roomId");
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
                {preview.map((item, idx) => (<ChatList key={idx} item={item} />))} 
            </div>
            <div>
                <textarea onChange={changeMessage} />
                <button onClick={sendMessage}>전송</button>
                <button onClick={()=>{
                  enterRoom(roomId);
                }}>연결..</button>
                <div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default AdminChatList;