import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";
import Swal from 'sweetalert2';

// 액션
const DELETE_LIKE_BOOK = "DELETE_LIKE_BOOK";
const DELETE_LISTEN_AUDIOBOOK = "DELETE_LISTEN_AUDIOBOOK";
// const GET_PROFILE = "GET_PROFILE";

// 이미지 액션
const UPLODING = "UPLODING";
const UPLOAD_IMG = "UPLOAD_IMG";
const SET_PREVIEW = "SET_PREVIEW";

// 초기값
const initialState = {
  userImage: [],
  profile: [],
};

// 액션 생성 함수
// const getProfile = createAction(GET_PROFILE, (profile) => ({ profile }));
const deleteLikeBook = createAction(DELETE_LIKE_BOOK, (bookId) => ({ bookId }));
const deleteAudioBook = createAction(DELETE_LISTEN_AUDIOBOOK, (audioBookId) => ({ audioBookId }));

const uploading = createAction(UPLODING, (uploading) => ({ uploading }));
const uploadImg = createAction(UPLOAD_IMG, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// 미들웨어
// 프로필 가져오기
// const getProfileAC = () => {
//   let Token = getToken("Authorization");
//   return function (dispatch, getState, { history }) {
//     axios.get(process.env.REACT_APP_BASE_URL + `/load/profiles`,
//       { headers: { 'Authorization': `${Token}` } }
//     )
//       .then((res) => {
//         dispatch(getProfile(res.data))

//       })
//       .catch(error => {
//         // console.log("error", error)
//       })
//   }
// }


// 내 서재에 담기
const addLibraryAC = (bookId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.post(process.env.REACT_APP_BASE_URL + `/book/detail/${bookId}/heart`, {

    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: `${res.data}` === "이미 등록된 도서입니다." ? 'warning' : 'success',
          title: `${res.data}`,
          showConfirmButton: false,
          timer: 1500,
          color: "#000000",
        })
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}


// 찜한 책 삭제
const deleteLikeBookAC = (bookId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.delete(process.env.REACT_APP_BASE_URL + `/load/profiles/library/book/${bookId}/remove`,
      { headers: { 'Authorization': `${Token}` } },
    )
      .then((res) => {
        dispatch(deleteLikeBook(bookId))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 듣고있는 오디오북 삭제
const deleteAudioBookAC = (audioBookId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.delete(process.env.REACT_APP_BASE_URL + `/load/profiles/library/audio/${audioBookId}/remove`,
      { headers: { 'Authorization': `${Token}` } },
    )
      .then((res) => {
        dispatch(deleteAudioBook(audioBookId))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 프로필 추가
const addProfileAC = (payload) => {
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
    // for (let key of formData.keys()) { console.log(key); }
    // FormData의 value 확인
    // for (let value of formData.values()) { console.log(value); }

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
        dispatch(uploadImg(res.data))
        history.replace(`/mypage/likeAudio`);
      })
      .catch(error => {
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${payload.authority}` === "ROLE_SELLER" ? '프로필 이미지와 자기소개를 모두 입력해주세요!' : '프로필 이미지를 등록해주세요!',
          })
        }

      })
  }
}

// 크리에이터 목소리 등록
const addVoiceAC = (payload) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    // formData 형식으로 이미지 전송
    const formData = new FormData();
    formData.append("audio", payload.file)

    // FormData의 key 확인
    // for (let key of formData.keys()) { console.log(key); }
    // FormData의 value 확인
    // for (let value of formData.values()) { console.log(value); }

    history.push(`/loading`)

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
        history.push(`/loading/success`)
      })
      .catch(error => {
        // console.log("서버에러", error)
        history.push(`/loading/failed`)
      })
  }
}


// 리듀서
export default handleActions(
  {
    // [GET_PROFILE]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.profile = action.payload.profile;
    //   }),
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
  addLibraryAC,
  deleteLikeBookAC,
  deleteAudioBookAC,
  addProfileAC,
  // getProfileAC,
  addVoiceAC,
  uploading,
  uploadImg,
  setPreview,
};

export { actionCreators };