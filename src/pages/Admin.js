import React from 'react'
import styled from 'styled-components';
import AdminChatList from '../components/AdminChatList';
import { useDispatch, useSelector } from 'react-redux';
import ChatList from '../components/ChatList';
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { actionCreators as chatActions } from "../redux/modules/chat";

// 관리자만 보이는 페이지 
const Admin = () => {
    //채팅방 목록
       //채팅방 리스트도 가져와야함.
    //이전 대화내용 목록도 가져와야함.
    //채팅방 리스트에서 특정 채팅방 클릭시, 해당 채팅방 ID로 이전 대화내용 get하는 api 필요. 
    const Token = localStorage.getItem("token");
    const preview = useSelector((state) => state.chat.messages);
    const roomList = useSelector((state) => state.chat.chatListInfo);
    console.log(preview);
    console.log(roomList);
    const beforeMessage = useSelector((state) => state.chat.setMessage);
    const dispatch = useDispatch();

    const sockjs = new SockJS(process.env.REACT_APP_CHAT_URL + "/chatting");
    const stompClient = Stomp.over(sockjs);


    React.useEffect(() => {

        connect();
        dispatch( chatActions.setChatListAX());

        return () => { };
      }, []);
    
    
      // connect 함수
      const connect = () => {
    
        stompClient.connect({
          token: `${Token}`
        }, onConnected);
      };
      const onConnected = () => { };


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
            <Wrap>
                <div>채팅방 리스트</div>
                <div id='hello'>
                    {/* //아래 맵에서 채팅방 목록 돌리면서 빼주기. */}
                    {roomList.map((item, idx) => (<AdminChatList key={idx} item={item} />))}
                </div>
                <div>
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
    background-color: skyblue;
    width: 1000px;
    min-height: 600px;
  }
`
export default Admin;