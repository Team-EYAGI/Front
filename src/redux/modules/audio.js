import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";

// 액션
// 1. 듣고 싶은 오디오북 요청하기
const GET_REQUEST = "GET_REQUEST";
const DELETE_REQUEST = "DELETE_REQUEST";
const LOADING = "LOADING"

// 2. 크리에이터가 오디오북 등록하는 부분
const GET_AUDIO = "GET_AUDIO";
const ADD_AUDIO_CHECK = "ADD_AUDIO_CHECK";
const ADD_FOLLOW = "ADD_FOLLOW";
const CLEAN_AUDIO = "CLEAN_AUDIO";

// 3. 관리자가 오디오북 삭제하는 부분
const DELETE_AUDIO = "DELETE_AUDIO";

// 4. 리뷰 CRUD 부분
const GET_REVIEW = "GET_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";


// 초기값
const initialState = {
  request_list: [],
  totalPages: [],
  request_add: [],
  audio_list: [],
  audio_check: [],
  review_list: [],
  review_add: [],
  paging: { page: 1, size: 20 },
  is_loading: false,
};

// 액션 생성 함수
const getRequest = createAction(GET_REQUEST, (request_list, totalPages) => ({ request_list, totalPages }));
const deleteRequest = createAction(DELETE_REQUEST, (bookRequestId) => ({ bookRequestId }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const addAudioCheck = createAction(ADD_AUDIO_CHECK, (audio_check) => ({ audio_check }));
const getAudio = createAction(GET_AUDIO, (audio_list) => ({ audio_list }));
const addFollow = createAction(ADD_FOLLOW, (followCount, followStatus) => ({ followCount, followStatus }));
const cleanAudio = createAction(CLEAN_AUDIO, () => ({}));

const deleteAudio = createAction(DELETE_AUDIO, (audioFileId) => ({ audioFileId }));

const getReview = createAction(GET_REVIEW, (review_list, totalPages) => ({ review_list, totalPages }));
const deleteReview = createAction(DELETE_REVIEW, (commentId) => ({ commentId }));




// 미들웨어

// 오디오북 요청 겟
const getRequestAC = (page, size = 7) => {
  return function (dispatch, getState, { history }) {

    dispatch(loading(true));
    axios.get(process.env.REACT_APP_BASE_URL + `/book/request?page=${page}&size=${size}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        dispatch(getRequest(res.data.content, res.data.totalPages));

      })
      .catch(error => {
        // console.log("error", error)
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
        history.replace(`/request`)
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 오디오북 요청 수정
const editRequestAC = (bookRequestId, title, contents) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.put(process.env.REACT_APP_BASE_URL + `/book/request/edit/${bookRequestId}`, {
      title: title,
      contents: contents,
    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        history.replace(`/request`)
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 오디오북 요청 삭제
const deleteRequestAC = (bookRequestId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.delete(process.env.REACT_APP_BASE_URL + `/book/request/remove/${bookRequestId}`,
      { headers: { 'Authorization': `${Token}` } },
    )
      .then((res) => {
        dispatch(deleteRequest(bookRequestId))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 오디오북 파일 추가
const addAudioAC = (payload) => {
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
    // for (let key of formData.keys()) { console.log(key); }
    // FormData의 value 확인
    // for (let value of formData.values()) { console.log(value); }

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
        history.push(`/bookdetail/${category}/${bookId}`);
      })
      .catch(error => {
        // console.log("서버에러", error)
        history.push(`/loadingPage/failed/${category}/${bookId}`)
      })
  }
}

// 오디오북 첫 등록인지 확인하기
const addAudioCheckAC = (bookId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.post(process.env.REACT_APP_BASE_URL + `/book/detail/newAudio/check/${bookId}`, {

    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        dispatch(addAudioCheck(res.data))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 오디오북 상세리스트 겟
const getAudioAC = (audioBookId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/audio/detail/${audioBookId}`,
      { headers: { 'Authorization': `${Token}` } }
    ,
    )
      .then((res) => {
        dispatch(getAudio(res.data))
      })
      .catch(error => {
        // console.log("error", error.message)
      })
  }
}

// 오디오북 챕터 삭제(관리자)
const deleteAudioAC = (audioFileId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.delete(process.env.REACT_APP_BASE_URL + `/audio/detail/audiofile/remove/${audioFileId}`,
      { headers: { 'Authorization': `${Token}` } },
    )
      .then((res) => {
        dispatch(deleteAudio(audioFileId))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 팔로우
const audiofollowAC = (sellerId) => {

  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.put(process.env.REACT_APP_BASE_URL + `/user/follow?id=${sellerId}`, {

    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        dispatch(addFollow(res.data.followCount, res.data.followStatus))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 오디오북 후기 겟
const getReviewAC = (audioBookId, page, size = 5) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/audio/detail/${audioBookId}/comment?page=${page}&size=${size}`,
      { headers: { 'Authorization': `${Token}` } }
    ,
    )
      .then((res) => {
        dispatch(getReview(res.data.content, res.data.totalPages));
      })
      .catch(error => {
        // console.log("error", error)
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
        history.replace(`/audioPlay/${category}/${bookId}/${audioBookId}`)
      })
      .catch(error => {
        // console.log("error", error)
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
        history.replace(`/audioPlay/${category}/${bookId}/${audioBookId}`)
      })
      .catch(error => {
        // console.log("error", error)
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
        dispatch(deleteReview(commentId))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}


// 리듀서
export default handleActions(
  {
    [GET_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.request_list = action.payload.request_list;
        draft.totalPages = action.payload.totalPages;
        draft.is_loading = false;
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
      [DELETE_AUDIO]: (state, action) =>
      produce(state, (draft) => {
        draft.audio_list.audioBookDetail.audioFileDtoList = draft.audio_list.audioBookDetail.audioFileDtoList.filter((p) => p.id !== action.payload.audioFileId);
      }),
    [GET_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.review_list = action.payload.review_list;
        draft.totalPages = action.payload.totalPages;
      }),
    [DELETE_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.review_list = draft.review_list.filter((p) => p.commentId !== action.payload.commentId);
      }),
    [ADD_FOLLOW]: (state, action) =>
      produce(state, (draft) => {
        draft.audio_list.audioBookDetail.followerCnt = action.payload.followCount;
        draft.audio_list.followStatus = action.payload.followStatus;
      }),
    [CLEAN_AUDIO]: (state, action) =>
      produce(state, (draft) => {
        draft.audio_list = [];
        draft.review_list = [];
      }),
  },
  initialState
);


const actionCreators = {
  // export 할 것들
  cleanAudio,
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
  audiofollowAC,
  deleteAudioAC,
};

export { actionCreators };