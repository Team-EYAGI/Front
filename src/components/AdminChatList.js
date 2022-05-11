import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Text } from "../elements/Index";
import moment from "moment";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import Join from "../components/Join";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { history } from '../redux/configureStore';
const AdminChatList = (props) => {

// 채팅방 목록 한개 
// 유저 닉네임, 날짜, 방번호 , 유저 롤 
// const {
    
//   } = props;
const dispatch = useDispatch();

// const sockjs = new SockJS(process.env.REACT_APP_CHAT_URL + "/chatting");
// const stompClient = Stomp.over(sockjs);
// const Token = localStorage.getItem("token");


// React.useEffect(() => {

//   connect();

//   return () => { };
// }, []);

// const connect = () => {
    
//   stompClient.connect({
//     token: `${Token}`
//   }, onConnected);
// };
// const onConnected = () => { };



return (
    <React.Fragment> 
      <div onClick={()=>{
        history.push(`/AdminChat/${props.item.roomId}`);
      }}>
        <div>{props.item.createdAt}</div>
        <a>{props.item.senderName}님의 문의</a>
        <div>뚠뚠</div>
      </div>
    </React.Fragment>
    )
}


export default AdminChatList;