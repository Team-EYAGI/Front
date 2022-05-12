import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// 액션
const GET_CREATOR_PROFILE = "GET_CREATOR_PROFILE";
const GET_CREATOR_FUNDING = "GET_CREATOR_FUNDING";
const GET_CREATOR_AUDIO = "GET_CREATOR_AUDIO";

// 초기값
const initialState = {
  creator_profile : [],
  creator_funding : [],
  creator_audiobook : [],
};

// 액션 생성 함수
const getProfile = createAction(GET_CREATOR_PROFILE, (creator_profile) => ({creator_profile}));
const getFunding = createAction(GET_CREATOR_FUNDING, (creator_funding) => ({creator_funding}));
const getAudio = createAction(GET_CREATOR_AUDIO, (creator_audiobook) => ({creator_audiobook}));

// 메인페이지 추천도서 겟
const getProfileAC = (sellerId) => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/viewer/seller/${sellerId}`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("셀러 프로필 정보", res)
      dispatch(getProfile(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 메인페이지 추천도서 겟
const getFundingAC = (sellerId) => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/viewer/sellerFund/${sellerId}`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("셀러 펀딩 정보", res)
      dispatch(getFunding(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 메인페이지 추천도서 겟
const getAudioAC = (sellerId) => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/viewer/sellerAudioBook/${sellerId}`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("셀러 오디오북 정보", res)
      dispatch(getAudio(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 리듀서
export default handleActions(
  {
    [GET_CREATOR_PROFILE]: (state, action) =>
    produce(state, (draft) => {
      draft.creator_profile = action.payload.creator_profile;
    }),
    [GET_CREATOR_FUNDING]: (state, action) =>
    produce(state, (draft) => {
      draft.creator_funding = action.payload.creator_funding;
    }),
    [GET_CREATOR_AUDIO]: (state, action) =>
    produce(state, (draft) => {
      draft.creator_audiobook = action.payload.creator_audiobook;
    }),
  },
  initialState
);


const actionCreators = {
// export 할 것들
  getProfileAC,
  getFundingAC,
  getAudioAC,
};

export { actionCreators };