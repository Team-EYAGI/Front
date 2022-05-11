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

    const roomList = useSelector((state) => state.chat.chatListInfo);

    console.log(roomList);
    const beforeMessage = useSelector((state) => state.chat.setMessage);
    const dispatch = useDispatch();

    // const sockjs = new SockJS(process.env.REACT_APP_CHAT_URL + "/chatting");
    // const stompClient = Stomp.over(sockjs);


    React.useEffect(() => {

    
        dispatch( chatActions.setChatListAX());

        return () => { };
      }, []);
    
    


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