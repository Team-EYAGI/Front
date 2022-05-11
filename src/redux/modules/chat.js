import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getToken } from "../../shared/Token"; //겟토큰으로 사용자 토큰을 가져온다 ?
import axios from "axios";
import jwtDecode from "jwt-decode";

let sockjs = new SockJS(process.env.REACT_APP_CHAT_URL + `/chatting`);
let client = Stomp.over(sockjs);
client.debug = null;


// Action`
// 옮겨가는 (입장하려고 클릭한) 현재 방정보 입력
const MOVE_CHAT_ROOM = "MOVE_CHAT_ROOM";
// 구독하면서 실행되는 액션
// 새로입력되는 메세지(리스트 형태) 내용을 메세지에 추가
const GET_MSG = "GET_MSG";
// 처음 방에 입장할때 이전 대화기록 DB에서 가져오기 (array)
const SET_MSG = "SET_MSG";
// 입장 요청 리스트(방장용)
const SET_REQ_LIST = "SET_REQ_LIST";
// 채팅 참여 user 정보
const GET_CHAT_USER = "GET_CHAT_USER";

// ActionCreator

// 현재 채팅방 정보
const moveChatRoom = createAction(
  MOVE_CHAT_ROOM,
  (room_id, roomName, post_id, own_user_id, order_time) => ({
    room_id,
    roomName,
    post_id,
    own_user_id,
    order_time,
  })
);

// 채팅방 메세지
const getMessages = createAction(GET_MSG, (newMessage) => ({
  newMessage,
}));
// 이전 대화 목록 가져오기
const setMessage = createAction(SET_MSG, (chatMassageArray) => ({
  chatMassageArray,
}));

// 채팅 참여중인 사용자 목록 조회
const getChatUser = createAction(GET_CHAT_USER, (user_in_chat_list) => ({
  user_in_chat_list,
}));


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
};

// middleware
// 채팅방 만들기~~~
const addPostAX = (post_info) => {
  return function (dispatch, getState, { history }) {
    const address = getState().loc.post_address.address;
    const longitude = getState().loc.post_address.longitude;
    const latitude = getState().loc.post_address.latitude;
    const place_url = getState().loc.place_url;
    // logger("post모듈 addPostAX - 1", post_info.appointmentDate);

    
    axios.post(process.env.REACT_APP_CHAT_URL + `/chatting/chat/rooms`, { //우리 서버에 필요한 정보 담아주도록 수정해야함.
        title: post_info.title,
        headCount: post_info.headCount,
        category: post_info.foodCategory,
        address: `${address}/${post_info.detail_place}`,
        orderTime: `${post_info.appointmentDate} ${post_info.appointmentTime}:00`,
        contents: post_info.contents,
        restaurant: post_info.restaurant,
        longitude: longitude,
        latitude: latitude,
        meeting: post_info.meeting === null ? "SEPARATE" : post_info.meeting,
        placeUrl: place_url,
      })
      .then((res) => {
          console.log("gggg");
        // 모집글 게시 성공 시
        // customAlert.sweetConfirmReload( //성공시, 채팅 url로 리다이랙트 해주기.
          // "밀착 준비 완료",
          // [
          //   "모임 만들기 작성글을 성공적으로 작성했어요.",
          //   "이제 채팅을 기다려볼까요?",
          // ],
          // "/home"
        // );
      })
      .catch((e) => {

        console.log("error");
        // logger("모집글 작성 모듈 에러", e);
        // customAlert     //실패시, 에러메세지 작성하기!
        //   .sweetOK(
        //     "모집글 작성 실패",
        //     "모임 모집글을 작성하는데 실패했어요.",
        //     "잠시 후 다시 시도해주세요."
        //   )
          // .then(() => {
          //   window.location.replace("/home");   //메인페이지로 보내버리기.
          // });
      });
  };
};

export default handleActions(
  {
    // setChatList - 나만의 채팅 목록
    // [SET_CHAT_LIST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.chatListInfo = action.payload.myChatList;
    //   }),
    // // moveChatRoom - 현재 채팅방 id, name
    [MOVE_CHAT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.currentChat.room_id = action.payload.room_id;
        draft.currentChat.roomName = action.payload.roomName;
        draft.currentChat.post_id = action.payload.post_id;
        draft.currentChat.own_user_id = action.payload.own_user_id;
        draft.currentChat.order_time = action.payload.order_time;
      }),
    // // clearChat - 현재방 id, name 초기화
    // [CLEAR_CHAT]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.currentChat.room_id = null;
    //     draft.currentChat.roomName = null;
    //     draft.currentChat.post_id = null;
    //     draft.currentChat.own_user_id = null;
    //     draft.currentChat.order_time = null;
    //     draft.userInList = [];
    //     draft.messages = [];
    //   }),
    // getMessages - 새로운 메세지 정보를 메세지 리스트에 추가
    [GET_MSG]: (state, action) =>
      produce(state, (draft) => {
        // 들어온 메세지 안의 대상자 id 와 현재 사용자 id 비교
        // const user_id = jwtDecode(getToken).userId;
        const m = action.payload.newMessage;

        // 방장이 악성 유저를 방에서 내보낸 경우
        // if (m.type === "BAN") {
          // 강퇴 당한 사람의 경우 퇴장 알럿 표시
          // 알럿 확인 후 채팅방에서 내보냄
          // if (user_id === parseInt(m.message)) {
          // //   // customAlert
          //   //   .sweetOK(
          //   //     "접근이 불가한 채팅이에요",
          //   //     "해당 채팅방에서 퇴장처리되었어요.",
          //   //     "채팅방목록으로 돌아갈게요."
          //   //   )
          //   console.log("성공")
          //     .then(() => {
          //       // return window.location.replace("/chatlist");
          //     });
          // } else {
          //   // 그 외 사용자들은 리스트에서 강퇴 유저가 삭제된 리스트를 반환
          //   let idx = draft.userInList.findIndex(
          //     (u) => parseInt(u.user_id) === parseInt(m.message)
          //   );
          //   if (idx !== -1) {
          //     draft.userInList.splice(idx, 1);
          //   }
          //   return;
        //   // }
        // }

        // 방장이 채팅방을 나간 경우 모든 사용자를 채팅방에서 내보낸다.
        // else if (m.type === "BREAK") {
        //   // 실시간 메세지를 받은 사용자가 방장인 경우 확인 알럿 표시
        //   if (user_id === m.sender.id) {
        //     // return customAlert
        //     //   .sweetOK("나가기 완료", "채팅방 나가기가 완료되었습니다.")
        //     console.log("완료")
        //       .then((res) => {
        //         return window.location.replace("/chatlist");
        //       });
        //   } else {
        //     // 그외의 사용자인 경우 방장이 나간 채팅방인 것을 알림
        //     // return customAlert
        //     //   .sweetOK(
        //     //     "앗 사라진 채팅방이에요",
        //     //     "방장이 삭제한 채팅방이에요.",
        //     //     "다른 밀착을 시작해볼까요?"
        //     //   )
        //     console.log("실패실패")
        //       .then(() => {
        //         return window.location.replace("/chatlist");
        //       });
          // }
        // } else {
          const one_msg = {
            type: m.type,
            room_id: m.roomId,
            sender_id: m.senderId,
            // sender_img: m.sender.profileImg,
            message: m.message,
            createdAt: m.createdAt,
            msg_id: m.id,
          };
          draft.messages.push(one_msg);
        }
      ),
  // setMessage - 메세지 DB에서 조회할때 해당 방의 메세지 내역 불러옴
    // 이전 메세지 내역중 유형이 대화인 내용만 리덕스에 저장
    // [SET_MSG]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.messages = _.remove(action.payload.chatMassageArray.reverse(), {
    //       type: "TALK",
    //     });
    //   }),
    // [SET_REQ_LIST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.requestList = action.payload.request_list;
    //   }),
    // [AWAIT_LIST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.awaitList = action.payload.await_list;
    //   }),
    // [GET_CHAT_USER]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.userInList = action.payload.user_in_chat_list;
    //   }),
  },
  initialState
);

const actionCreators = {
  // setChatListAX,
  // getChatMessagesAX,
  moveChatRoom,
  // clearChat,
  getMessages,
  // requestChatListAX,
  // awaitChatListAX,
  // getChatUserAX,
  // awaitChatOut,
  // leaveChatAX,
  addPostAX
};

export { actionCreators };