import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";


// 액션
const ADD_LIBRARY = "ADD_LIBRARY";
const GET_LISTEN_AUDIO = "GET_LISTEN_AUDIO";
const GET_LIKE_BOOK = "GET_LIKE_BOOK";
const GET_PROFILE = "GET_PROFILE";
// const DELETE_LIBRARY = "DELETE_LIBRARY";

// const ADD_LISTEN = "ADD_LISTEN";
const ADD_PROFILE = "ADD_PROFILE";

// 이미지 액션
const UPLODING = "UPLODING";
const UPLOAD_IMG = "UPLOAD_IMG";
const SET_PREVIEW = "SET_PREVIEW";

// 초기값
const initialState = {
  library_listenAudio : [],
  library_likeBook : [],
  userImage : [],
  profile : [],
};

// 액션 생성 함수
const addLibrary = createAction(ADD_LIBRARY, (library) => ({library}));
const getListenAudio = createAction(GET_LISTEN_AUDIO, (listenAudio) => ({listenAudio}));
const getLikeBook = createAction(GET_LIKE_BOOK, (likeBook) => ({likeBook}));
const getProfile = createAction(GET_PROFILE, (profile) => ({profile}));
// const deleteLibrary = createAction(DELETE_LIBRARY, (library) => ({library}));

// const addListen = createAction(ADD_LISTEN, (library) => ({library}));
const addProfile = createAction(ADD_PROFILE, (a) => ({a}));


const uploading = createAction(UPLODING, (uploading) => ({ uploading }));
const uploadImg = createAction(UPLOAD_IMG, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// 미들웨어
// 프로필 가져오기
const getProfileAC = () => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/load/profiles`, 
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("프로필 가져오기", res)
        dispatch(getProfile(res.data))

      })
      .catch(error => {
        console.log("error", error)
      })
  }
}


// 내 서재에 담기
const addLibraryAC = (bookId) => {
  console.log(bookId)

  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.post(process.env.REACT_APP_BASE_URL + `/book/detail/${bookId}/heart`, {

    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("서재담기 성공", res)
        window.alert(res.data)
        // history.replace(`/request`)
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}


// 듣고 있는 오디오북 겟
const getListenAudioAC = () => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/load/profiles/library/audio`,
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("듣고있는 오디오북 불러오기 성공", res)
        dispatch(getListenAudio(res.data))

        // history.replace(`/request`)
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 찜한 책 겟
const getLikeBookAC = () => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/load/profiles/library/book`, 
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("찜한 책 불러오기 성공", res)
        dispatch(getLikeBook(res.data))

        // history.replace(`/request`)
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}



// 프로필 추가
const addProfileAC = (payload) => {
  console.log(payload)
  console.log(payload.information)
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    // formData 형식으로 이미지 전송
    const formData = new FormData();
    formData.append("image", payload.file)
    formData.append("info",
      new Blob([JSON.stringify(payload.information)], {
        type: "application/json",
      })
    
    )

    // FormData의 key 확인
    for (let key of formData.keys()) { console.log(key); }
    // FormData의 value 확인
    for (let value of formData.values()) { console.log(value); }

    axios.post(process.env.REACT_APP_BASE_URL + `/user/new/profiles`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `${Token}`
        }
      }
    )
      .then((res) => {
        console.log("프로필 등록 완료", res)
        dispatch(uploadImg(res.data))
        history.replace(`/mypage/likeAudio`);
      })
      .catch(error => {
        console.log("서버에러", error)
      })
  }
}


// 리듀서
export default handleActions(
  {
    // [ADD_LIBRARY]: (state, action) =>
    // produce(state, (draft) => {
    //   draft.library = action.payload.library;
    // }),
    [GET_LISTEN_AUDIO]: (state, action) =>
    produce(state, (draft) => {
      draft.library_listenAudio = action.payload.listenAudio;
    }),
    [GET_PROFILE]: (state, action) =>
    produce(state, (draft) => {
      draft.profile = action.payload.profile;
    }),
    [GET_LIKE_BOOK]: (state, action) =>
    produce(state, (draft) => {
      draft.library_likeBook = action.payload.likeBook;
    }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
    }),
    [UPLOAD_IMG]: (state, action) =>
    produce(state, (draft) => {
      draft.userImage = action.payload.image;
  }),
  },
  initialState
);


const actionCreators = {
// export 할 것들
  addLibrary,
  getListenAudio,
  getLikeBook,
  getProfile,
  addProfile,
  addLibraryAC,
  getListenAudioAC,
  getLikeBookAC,
  addProfileAC,
  getProfileAC,
  uploading,
  uploadImg,
  setPreview,
};

export { actionCreators };