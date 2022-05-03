import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// 액션
const GET_REQUEST = "GET_REQUEST";
const ADD_REQUEST = "ADD_REQUEST";
const EDIT_REQUEST = "EDIT_REQUEST";
const DELETE_REQUEST = "DELETE_REQUEST";

const ADD_AUDIO = "ADD_AUDIO";

// 초기값
const initialState = {
  request_list : [],
  request_add : [],
  audio_list : [],
};

// 액션 생성 함수
const getRequest = createAction(GET_REQUEST, (request_list) => ({request_list}));
const addRequest = createAction(ADD_REQUEST, (request_add) => ({request_add}));
const editRequest = createAction(EDIT_REQUEST, (bookRequestId, request_list) => ({bookRequestId, request_list}));
const deleteRequest = createAction(DELETE_REQUEST, (bookRequestId) => ({bookRequestId}));

const addAudio = createAction(ADD_AUDIO, (audio_list) => ({audio_list}));

// 미들웨어

// 메인페이지 책 로드
const getRequestAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/book/request`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("요청 목록 불러오기", res)
      dispatch(getRequest(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

const addRequestAC = (title, contents) => {
  // console.log("제목", title)
  // console.log("이유", contents)
  return function (dispatch, getState, {history}) {
    axios.post(process.env.REACT_APP_BASE_URL + `/book/request/new`, {
      title: title,
      contents: contents,
    },
    {headers: { 'Authorization' : `토큰`}}
    )
    .then((res) => {
      console.log("성공", res)
      dispatch(addRequest(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

const editRequestAC = (bookRequestId) => {
  console.log("수정준비완료", bookRequestId)
  return function (dispatch, getState, {history}) {
    axios.put(process.env.REACT_APP_BASE_URL + `/book/request/edit/{bookRequestId}`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("수정완료!", res)
      // dispatch(getMain(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

const deleteRequestAC = (bookRequestId) => {
  console.log("삭제준비완료", bookRequestId)
  return function (dispatch, getState, {history}) {
    axios.delete(process.env.REACT_APP_BASE_URL + `/book/request/remove/{bookRequestId}`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("삭제완료", res)
      // dispatch(deleteRequest(bookRequestId))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

const addAudioAC = (payload) => {
  console.log(payload)
  // let myToken = getCookie("Authorization")
  return function (dispatch, getState, {history}) {
    // formData 형식으로 이미지 전송
    const formData = new FormData();
    formData.append("image", payload.file)
    formData.append("comment",
      new Blob([JSON.stringify(payload.information)], {
      type: "application/json",
    })
    )

    // console.log(formData)
    axios.post(process.env.REACT_APP_BASE_URL + `book/detail/newaudio/{bookId}`, 
      formData,
    {headers:{ 
      "Content-Type": "multipart/form-data",
      // 'Authorization' : `Bearer ${myToken}`
    }}
    )
    .then((res) => {
      console.log("오디오 등록 완료", res)
      // dispatch(uploadImg({userId, title, comment}))
      // history.replace(`/detail/${payload.itemId}`)
    })
    .catch(error => {
      console.log("서버에러", error)
    })
  }
}


// 리듀서
export default handleActions(
  {
    [GET_REQUEST]: (state, action) =>
    produce(state, (draft) => {
      draft.request_list = action.payload.request_list;
    }),
    [ADD_REQUEST]: (state, action) =>
    produce(state, (draft) => {
      draft.request_add = action.payload.request_add;
    }),
    [DELETE_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload)
        console.log(action.payload.bookRequestId)
        draft.detail_post = draft.detail_post.filter((p) =>  p.bookRequestId !== action.payload.bookRequestId);
      }),
  },
  initialState
);


const actionCreators = {
// export 할 것들
  getRequest,
  addRequest,
  editRequest,
  deleteRequest,
  addAudio,
  getRequestAC,
  addRequestAC,
  editRequestAC,
  deleteRequestAC,
  addAudioAC,
};

export { actionCreators };