import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";

// 액션
// 1. 듣고 싶은 오디오북 요청하기
const GET_REQUEST = "GET_REQUEST";
const ADD_REQUEST = "ADD_REQUEST";
const EDIT_REQUEST = "EDIT_REQUEST";
const DELETE_REQUEST = "DELETE_REQUEST";

// 2. 크리에이터가 오디오북 등록하는 부분
const ADD_AUDIO = "ADD_AUDIO";
const GET_AUDIO = "GET_AUDIO";
const ADD_AUDIO_CHECK = "ADD_AUDIO_CHECK";
// const ADD_FOLLOW = "FOLLOW";

// 3. 리뷰 CRUD 부분
const GET_REVIEW = "GET_REVIEW";
const ADD_REVIEW = "ADD_REVIEW";
const EDIT_REVIEW = "EDIT_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";


// 초기값
const initialState = {
  request_list: [],
  request_add: [],
  audio_list: [],
  audio_check: [],
  review_list: [],
  review_add: [],
};

// 액션 생성 함수
const getRequest = createAction(GET_REQUEST, (request_list) => ({ request_list }));
// const addRequest = createAction(ADD_REQUEST, (request_add) => ({ request_add }));
// const editRequest = createAction(EDIT_REQUEST, (bookRequestId, request_list) => ({ bookRequestId, request_list }));
const deleteRequest = createAction(DELETE_REQUEST, (bookRequestId) => ({ bookRequestId }));

// const addAudio = createAction(ADD_AUDIO, (audio_list) => ({ audio_list }));
const addAudioCheck = createAction(ADD_AUDIO_CHECK, (audio_check) => ({ audio_check }));
const getAudio = createAction(GET_AUDIO, (audio_list) => ({ audio_list }));
// const audiofollow = createAction(ADD_FOLLOW, (followCount, followStatus) => ({followCount, followStatus}));

const getReview = createAction(GET_REVIEW, (review_list) => ({ review_list }));
// const addReview = createAction(ADD_REVIEW, (review_add) => ({ review_add }));
// const editReview = createAction(EDIT_REVIEW, (commentId, review_list) => ({ commentId, review_list }));
const deleteReview = createAction(DELETE_REVIEW, (commentId) => ({ commentId }));


// 미들웨어

// 오디오북 요청 겟
const getRequestAC = () => {
  return function (dispatch, getState, { history }) {
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

// 오디오북 요청 추가
const addRequestAC = (bookId, title, contents) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.post(process.env.REACT_APP_BASE_URL + `/book/${bookId}/request/new`, {
      title: title,
      contents: contents,
    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("성공", res)
        history.replace(`/request`)
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 오디오북 요청 수정
const editRequestAC = (bookRequestId, title, contents) => {
  console.log("수정하기준비", bookRequestId)
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.put(process.env.REACT_APP_BASE_URL + `/book/request/edit/${bookRequestId}`, {
      title: title,
      contents: contents,
    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("수정완료!", res)
        history.replace(`/request`)
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 오디오북 요청 삭제
const deleteRequestAC = (bookRequestId) => {
  console.log("삭제준비완료", bookRequestId)
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.delete(process.env.REACT_APP_BASE_URL + `/book/request/remove/${bookRequestId}`,
      { headers: { 'Authorization': `${Token}` } },
    )
      .then((res) => {
        console.log("삭제완료", res)
        dispatch(deleteRequest(bookRequestId))
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 오디오북 파일 추가
const addAudioAC = (payload) => {
  console.log(payload)
  let Token = getToken("Authorization");
  let bookId = payload.bookId
  let category = payload.category
  return function (dispatch, getState, { history }) {
    // formData 형식으로 이미지 전송
    const formData = new FormData();
    formData.append("audio", payload.file)
    formData.append("contents",
      new Blob([JSON.stringify(payload.information)], {
        type: "application/json",
      })
    )

    // FormData의 key 확인
    for (let key of formData.keys()) { console.log(key); }
    // FormData의 value 확인
    for (let value of formData.values()) { console.log(value); }

    history.push(`/loadingPage`)

    axios.post(process.env.REACT_APP_BASE_URL + `/book/detail/newAudio/${bookId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `${Token}`
        }
      }
    )
      .then((res) => {
        console.log("오디오 등록 완료", res)
        // dispatch(uploadImg({userId, title, comment}))
        history.push(`/bookdetail/${category}/${bookId}`);
      })
      .catch(error => {
        console.log("서버에러", error)
        history.push(`/loadingPage/failed/${category}/${bookId}`)
      })
  }
}

// 오디오북 첫 등록인지 확인하기
const addAudioCheckAC = (bookId) => {
  // console.log(bookId)

  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.post(process.env.REACT_APP_BASE_URL + `/book/detail/newAudio/check/${bookId}`, {

    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("첫등록이니? 성공", res)
        dispatch(addAudioCheck(res.data))
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 오디오북 상세리스트 겟
const getAudioAC = (audioBookId) => {
  console.log(audioBookId)
  let Token = getToken("Authorization");
  // console.log(Token)
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/audio/detail/${audioBookId}`,
      { headers: { 'Authorization': `${Token}` } }
    ,
    )
      .then((res) => {
        console.log("오디오 상세 리스트", res)
        dispatch(getAudio(res.data))

      })
      .catch(error => {
        console.log("error", error.message)
      })
  }
}

// 팔로우
// const audiofollowAC = (sellerId) => {

//   let Token = getToken("Authorization");
//   return function (dispatch, getState, { history }) {
//     axios.post(process.env.REACT_APP_BASE_URL + `/user/follow?id=${sellerId}`, {

//     },
//       { headers: { 'Authorization': `${Token}` } }
//     )
//       .then((res) => {
//         console.log("팔로우 성공", res)
//         dispatch(audiofollow(res.data.followCount, res.data.followStatus))
//       })
//       .catch(error => {
//         console.log("error", error)
//       })
//   }
// }

// 오디오북 후기 겟
const getReviewAC = (audioBookId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/audio/detail/${audioBookId}/comment`,
      { headers: { 'Authorization': `${Token}` } }
    ,
    )
      .then((res) => {
        console.log("오디오 후기 리스트", res)
        dispatch(getReview(res.data))

      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 오디오북 후기 추가
const addReviewAC = (category, bookId, audioBookId, title, content) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.post(process.env.REACT_APP_BASE_URL + `/audio/detail/${audioBookId}/comment/new`, {
      title: title,
      content: content,
    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("성공", res)
        history.replace(`/audioPlay/${category}/${bookId}/${audioBookId}`)
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 오디오북 후기 수정
const editReviewAC = (category, bookId, audioBookId, title, content, commentId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.put(process.env.REACT_APP_BASE_URL + `/audio/detail/comment/edit/${commentId}`, {
      title: title,
      content: content,
    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("성공", res)
        history.replace(`/audioPlay/${category}/${bookId}/${audioBookId}`)
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 오디오북 후기 삭제
const deleteReviewAC = (commentId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.delete(process.env.REACT_APP_BASE_URL + `/audio/detail/comment/remove/${commentId}`,
      { headers: { 'Authorization': `${Token}` } },
    )
      .then((res) => {
        // console.log("삭제완료", res)
        dispatch(deleteReview(commentId))
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}


// 리듀서
export default handleActions(
  {
    [GET_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.request_list = action.payload.request_list;
        console.log("스테이스상태", state)
      }),
    [ADD_AUDIO_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.audio_check = action.payload.audio_check;
      }),
    [DELETE_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.request_list = draft.request_list.filter((p) => p.bookRequestId !== action.payload.bookRequestId);
      }),
    [GET_AUDIO]: (state, action) =>
      produce(state, (draft) => {
        draft.audio_list = action.payload.audio_list;
      }),
    [GET_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.review_list = action.payload.review_list;
      }),
    [DELETE_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.review_list = draft.review_list.filter((p) => p.commentId !== action.payload.commentId);
      }),
      // [ADD_FOLLOW]: (state, action) =>
      // produce(state, (draft) => {
      //   console.log(action.payload.followCount)
      //   console.log(action.payload.followStatus)
      //   draft.audio_list.sellerProfile.followerCnt = action.payload.followCount;
      //   draft.audio_list.followStatus = action.payload.followStatus;
      // }),
  },
  initialState
);


const actionCreators = {
  // export 할 것들
  getRequestAC,
  addRequestAC,
  editRequestAC,
  deleteRequestAC,
  addAudioAC,
  getAudioAC,
  getReviewAC,
  addReviewAC,
  editReviewAC,
  deleteReviewAC,
  addAudioCheckAC,
  // audiofollowAC,
};

export { actionCreators };