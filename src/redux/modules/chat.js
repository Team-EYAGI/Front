import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getToken } from "../../shared/Token"; //겟토큰으로 사용자 토큰을 가져온다 ?
import axios from "axios";
import jwtDecode from "jwt-decode";
// 새로세팅
import { actionCreators as userAction } from "./user";



let sockjs = new SockJS(process.env.REACT_APP_CHAT_URL + "/chatting");
let client = Stomp.over(sockjs);
client.debug = null;


// Action
// 채팅방 목록
const SET_CHAT_LIST = "SET_CHAT_LIST";
// 옮겨가는 (입장하려고 클릭한) 현재 방정보 입력
const MOVE_CHAT_ROOM = "MOVE_CHAT_ROOM";
// 뒤로가기 클릭시 현재방 정보 초기화
const CLEAR_CHAT = "CLEAR_CHAT";
// 구독하면서 실행되는 액션
// 새로입력되는 메세지(리스트 형태) 내용을 메세지에 추가
const GET_MSG = "GET_MSG";
// 처음 방에 입장할때 이전 대화기록 DB에서 가져오기 (array)
const SET_MSG = "SET_MSG";

const GET_MESSAGE= "GET_MESSAGE";


// ActionCreator
// 현재 채팅방 정보
const moveChatRoom = createAction(
  MOVE_CHAT_ROOM,
  (room_id, roomName, own_user_id) => ({
    room_id,
    roomName,
    own_user_id,
  })
);

// 현재 채팅방 정보 초기화
const clearChat = createAction(CLEAR_CHAT, () => {});
// 채팅방 메세지
const getMessages = createAction(GET_MSG, (newMessage) => ({
  newMessage,
}));
// 이전 대화 목록 가져오기
const setMessage = createAction(SET_MSG, (chatMessageArray) => ({
  chatMessageArray,
}));
//채팅방 목록 불러오기
const setChatList = createAction(SET_CHAT_LIST, (myChatList) => ({
  myChatList,
}));
const getMSG = createAction(GET_MESSAGE, (newMessage) => ({
  newMessage,
}));
// // 채팅 참여중인 사용자 목록 조회
// const getChatUser = createAction(GET_CHAT_USER, (user_in_chat_list) => ({
//   user_in_chat_list,
// }));

// initialState
const initialState = {
  // my chat list
  chatListInfo: [],
  // 현재 채팅들어갈/들어간 방정보
  currentChat: {
    room_id: null,
    roomName: null,
    post_id: null,
  },
  // 현재 접속한 채팅 메시지 (DB저장된 내용에 추가되는 메세지 push)
  messages: [],
  // 사용자가 입력하는 순간의 메세지
  messageText: null,
  // 사용자가 입력하는 순간의 메세지 time
  now_time: null,
  userInList: [],
  setMessage: [],
  msg : [],
};

// middleware
// 채팅 탭 이동시 실행되는 함수
// 사용자 개인의 참여중인 채팅 목록을 조회한다.
const setChatListAX = () => {
  return function (dispatch, getState, {history}) {
  let Token = getToken("Authorization");
    axios.get(process.env.REACT_APP_CHAT_URL + "/rooms", 
    { headers: { 'Authorization': `${Token}` } }
    )
    .then((res) => {
      // console.log("채팅방 목록", res)
      let my_chat_list = [];
      res.data.forEach(c => {
        let one_chat_info = {
          room_id: c.roomId,
          own_user_id: c.nickname,
          roomName: c.romName,
          createdAt: c.createdAt,
          userRole: c.userRole,
          new_msg: c.newMessage
        };
        my_chat_list.push(one_chat_info);
      });
      dispatch(setChatList(my_chat_list))
    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

const setUserChatListAX = () => {
  return function (dispatch, getState, {history}) {
  let Token = getToken("Authorization");
    axios.get(process.env.REACT_APP_CHAT_URL + "/chat/rooms/mine", 
    { headers: { 'Authorization': `${Token}` } }
    )
    .then((res) => {
      // console.log("채팅방 목록", res)
      let my_chat_list = [];
      res.data.forEach(c => {
        let one_chat_info = {
          room_id: c.roomId,
          own_user_id: c.nickname,
          roomName: c.romName,
          createdAt: c.createdAt,
          userRole: c.userRole,
          new_msg: c.newMessage
        };
        my_chat_list.push(one_chat_info);
      });
      dispatch(setChatList(my_chat_list))
    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

const getChatMessagesAX = (roomId) => {
  return function (dispatch, getState, {history}) {
    let Token = getToken("Authorization");
    axios.get(process.env.REACT_APP_CHAT_URL + `/chat/${roomId}/messages`,
    { headers: { 'Authorization': `${Token}` } }
    )
    .then((res) => {
      let chatMassageArray = [];
      // console.log(res);
      res.data.forEach((m) => {
        let one_msg_info = {
          type: m.type,
          room_id: m.roomId,
          sender: m.nickname,
          sender_id: m.senderId,
          message: m.message,
          createdAt: m.createdAt,
          msg_id: m.id,
        };
        chatMassageArray.push(one_msg_info);
      });
      // console.log(chatMassageArray);
      // console.log("이전 메세지 목록", res)
      dispatch(setMessage(chatMassageArray))
    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 유저 문의하기
const userQnAAX = (uuid) => {
  return function (dispatch, getState, { history }) {
    let Token = getToken("Authorization");
    axios
      .post(process.env.REACT_APP_BASE_URL + "/chat/rooms", 
      { headers: { 'Authorization': `${Token}` } },
      {
        chatRoomName: "문의하기",
        uuid: uuid
      })
      .then((res) => {
        console.log(res);
        dispatch(setUserChatListAX());
        console.log("채팅방 생성 완료");
      })
      .catch((e) => {
        console.log("모집글 작성 모듈 에러", e);
      });
  };
};

export default handleActions(
  {
    // setChatList - 나만의 채팅 목록
    [SET_CHAT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.chatListInfo = action.payload.myChatList;
      }),
    
    // moveChatRoom - 현재 채팅방 id, name
    [MOVE_CHAT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.currentChat.room_id = action.payload.room_id;
        draft.currentChat.roomName = action.payload.roomName;
        draft.currentChat.own_user_id = action.payload.own_user_id;
      }),

    // clearChat - 현재방 id, name 초기화
    [CLEAR_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.currentChat.room_id = null;
        draft.currentChat.roomName = null;
        draft.currentChat.own_user_id = null;
        draft.userInList = [];
        draft.messages = [];
      }),

    // getMessages - 새로운 메세지 정보를 메세지 리스트에 추가
    [GET_MSG]: (state, action) =>
      produce(state, (draft) => {
        // 들어온 메세지 안의 대상자 id 와 현재 사용자 id 비교
        const m = action.payload.newMessage;
          const one_msg = {
            type: m.type,
            room_id: m.roomId,
            sender_id: m.senderId,
            message: m.message,
            createdAt: m.createdAt,
            msg_id: m.id,
          };
          draft.messages.push(one_msg);
        }
      ),

    [GET_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.newMessage);
        const m = action.payload.newMessage;

          const one_msg = {
            type: m.type,
            room_id: m.roomId,
            sender_id: m.senderId,
            message: m.message,
            createdAt: m.createdAt,
            msg_id: m.id,
          };
          draft.msg.push(one_msg);
        }
      ),
    // setMessage - 메세지 DB에서 조회할때 해당 방의 메세지 내역 불러옴
    // 이전 메세지 내역중 유형이 대화인 내용만 리덕스에 저장
    [SET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = action.payload.chatMessageArray;
      }),
    
  },
  initialState,
);

const actionCreators = {
  setChatListAX,
  getChatMessagesAX,
  moveChatRoom,
  clearChat,
  getMessages,
  getMSG,
  userQnAAX,
  setUserChatListAX
};

export { actionCreators };