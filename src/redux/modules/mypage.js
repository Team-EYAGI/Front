import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";


// 액션
const ADD_LIBRARY = "ADD_LIBRARY";
const GET_REGISTER_AUDIOBOOK = "GET_REGISTER_AUDIOBOOK";
const GET_REGISTER_FUNDING = "GET_REGISTER_FUNDING";
const GET_LISTEN_AUDIO = "GET_LISTEN_AUDIO";
const GET_LIKE_BOOK = "GET_LIKE_BOOK";
const DELETE_LIKE_BOOK = "DELETE_LIKE_BOOK";
const DELETE_LISTEN_AUDIOBOOK = "DELETE_LISTEN_AUDIOBOOK";

// const ADD_LISTEN = "ADD_LISTEN";
const ADD_PROFILE = "ADD_PROFILE";
const ADD_VOICE = "ADD_VOICE";
const GET_PROFILE = "GET_PROFILE";

// 이미지 액션
const UPLODING = "UPLODING";
const UPLOAD_IMG = "UPLOAD_IMG";
const SET_PREVIEW = "SET_PREVIEW";

// 초기값
const initialState = {
  library_listenAudio: [],
  library_likeBook: [],
  library_registerAudioBook: [],
  library_registerFunding: [],
  userImage: [],
  profile: [],
  // sellorVoice: [],
};

// 액션 생성 함수
const addLibrary = createAction(ADD_LIBRARY, (library) => ({ library }));
const getListenAudio = createAction(GET_LISTEN_AUDIO, (listenAudio) => ({ listenAudio }));
const getLikeBook = createAction(GET_LIKE_BOOK, (likeBook) => ({ likeBook }));
const getRegisterAudioBook = createAction(GET_REGISTER_AUDIOBOOK, (registerAudioBook) => ({ registerAudioBook }));
const getRegisterFunding = createAction(GET_REGISTER_FUNDING, (registerFunding) => ({ registerFunding }));
const getProfile = createAction(GET_PROFILE, (profile) => ({ profile }));
const deleteLikeBook = createAction(DELETE_LIKE_BOOK, (bookId) => ({ bookId }));
const deleteAudioBook = createAction(DELETE_LISTEN_AUDIOBOOK, (audioBookId) => ({ audioBookId }));

// const addListen = createAction(ADD_LISTEN, (library) => ({library}));
const addProfile = createAction(ADD_PROFILE, (a) => ({ a }));

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
        // console.log("프로필 가져오기", res)
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
        // console.log("서재담기 성공", res)
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
        // console.log("듣고있는 오디오북 불러오기 성공", res)
        dispatch(getListenAudio(res.data))

        // history.replace(`/request`)
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 등록한 오디오북 겟
const getRegisterAudioBookAC = () => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/load/profiles/seller/audioBook`,
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("등록한 오디오북 불러오기 성공", res)
        dispatch(getRegisterAudioBook(res.data))

        // history.replace(`/request`)
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 등록한 펀딩 겟
const getRegisterFundingAC = () => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/load/profiles/seller/fund`,
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("등록한 펀딩 불러오기 성공", res)
        dispatch(getRegisterFunding(res.data))

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
        // console.log("찜한 책 불러오기 성공", res)
        dispatch(getLikeBook(res.data))

        // history.replace(`/request`)
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 찜한 책 삭제
const deleteLikeBookAC = (bookId) => {
  console.log("삭제준비완료", bookId)
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.delete(process.env.REACT_APP_BASE_URL + `/load/profiles/library/book/${bookId}/remove`,
      { headers: { 'Authorization': `${Token}` } },
    )
      .then((res) => {
        // console.log("찜한 책 삭제완료", res)
        dispatch(deleteLikeBook(bookId))
      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 듣고있는 오디오북 삭제
const deleteAudioBookAC = (audioBookId) => {
  console.log("삭제준비완료", audioBookId)
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.delete(process.env.REACT_APP_BASE_URL + `/load/profiles/library/audio/${audioBookId}/remove`,
      { headers: { 'Authorization': `${Token}` } },
    )
      .then((res) => {
        // console.log("찜한 책 삭제완료", res)
        dispatch(deleteAudioBook(audioBookId))
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

// 크리에이터 목소리 등록
const addVoiceAC = (payload) => {
  console.log(payload)
  let Token = getToken("Authorization");

  return function (dispatch, getState, { history }) {
    // formData 형식으로 이미지 전송
    const formData = new FormData();
    formData.append("audio", payload.file)

    // FormData의 key 확인
    for (let key of formData.keys()) { console.log(key); }
    // FormData의 value 확인
    for (let value of formData.values()) { console.log(value); }

    window.alert("등록중이니 조금만 기다려주세요!(시간이 쪼금.. 걸려요!!)")

    axios.post(process.env.REACT_APP_BASE_URL + `/seller/new/voice`,
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
        history.push(`/loading`)
      })
      .catch(error => {
        console.log("서버에러", error)
        window.alert("파일 등록에 실패했습니다. 확장자를 다시한번 확인해주세요!")
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
      [GET_REGISTER_AUDIOBOOK]: (state, action) =>
      produce(state, (draft) => {
        draft.library_registerAudioBook = action.payload.registerAudioBook;
      }),
      [GET_REGISTER_FUNDING]: (state, action) =>
      produce(state, (draft) => {
        draft.library_registerFunding = action.payload.registerFunding;
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
    [DELETE_LIKE_BOOK]: (state, action) =>
      produce(state, (draft) => {
        draft.library_likeBook = draft.library_likeBook.filter((p) => p.bookId !== action.payload.bookId);
      }),
      [DELETE_LISTEN_AUDIOBOOK]: (state, action) =>
      produce(state, (draft) => {
        draft.library_listenAudio = draft.library_listenAudio.filter((p) => p.audioBookId !== action.payload.audioBookId);
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
  getRegisterAudioBookAC,
  getRegisterFundingAC,
  deleteLikeBookAC,
  deleteAudioBookAC,
  addProfileAC,
  getProfileAC,
  addVoiceAC,
  uploading,
  uploadImg,
  setPreview,
};

export { actionCreators };