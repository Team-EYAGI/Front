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
                <div id="bd_top">
                  <Card>1:1 문의 내역보기</Card>
                  <span>글 작성</span>
                </div>
                <div id='hello'>
                    {/* //아래 맵에서 채팅방 목록 돌리면서 빼주기. */}
                    {roomList.map((item, idx) => (<AdminChatList key={idx} item={item} />))}
                </div>
            </Wrap>
        </React.Fragment>
    )
}

const Wrap = styled.div`

  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  #hello {
    border: 1px solid #000;
    border-width: 2px 0 0;
    width: 100%;
    min-height: 540px;
  }

  
  #bd_top {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 30px;

    & span {line-height: 1; font-size: 14px; font-weight: 500;}
  }
`

const Card = styled.div`
  color: #000;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  line-height: 1;
`
export default Admin;