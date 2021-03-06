import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";

// 액션
const GET_CREATOR_PROFILE = "GET_CREATOR_PROFILE";
const GET_CREATOR_LIST = "GET_CREATOR_LIST";
const FOLLOW = "FOLLOW";
const GET_FOLLOWER = "GET_FOLLOWER";
const GET_FOLLOWING = "GET_FOLLOWING";
const CLEAN_SELLER = "CLEAN_SELLER"


// 초기값
const initialState = {
  creator_profile : [],
  creator_list : [],
  creator_followStatus : [],
  creator_follower : [],
  creator_following : [],
  totalPages: [],
};

// 액션 생성 함수
const getProfile = createAction(GET_CREATOR_PROFILE, (creator_profile) => ({creator_profile}));
const getList = createAction(GET_CREATOR_LIST, (creator_list, totalPages) => ({creator_list, totalPages}));

const follow = createAction(FOLLOW, (followCount, followStatus) => ({followCount, followStatus}));
const followerList = createAction(GET_FOLLOWER, (creator_follower) => ({creator_follower}));
const followingList = createAction(GET_FOLLOWING, (creator_following) => ({creator_following}));
const cleanSeller = createAction(CLEAN_SELLER, () => ({ }));

// 셀러 프로필 정보 가져오기
const getProfileAC = (sellerId, authority, username) => {
    let Token = getToken("Authorization");
    return function (dispatch, getState, {history}) {
      // 비회원일 경우
      if(!authority) {
        axios.get(process.env.REACT_APP_BASE_URL + `/viewer/seller/${sellerId}?username=none`)
        .then((res) => {
          dispatch(getProfile(res.data))
        })
        .catch(error => {
          // console.log("error", error)
        })
      } else {
        // 회원일 경우
        axios.get(process.env.REACT_APP_BASE_URL + `/viewer/seller/${sellerId}?username=${username}`, 
        {headers: {'Authorization' : `${Token}`}}
        )
        .then((res) => {
          dispatch(getProfile(res.data))
        })
        .catch(error => {
          // console.log("error", error)
        })
      }  
  }
}

// 셀러 목록 가져오기
const getListAC = (page, size = 15) => {
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/sellerList?page=${page}&size=${size}`,
      // { headers: { 'Authorization': `${Token}` } }
    
    )
      .then((res) => {
        dispatch(getList(res.data.content, res.data.totalPages));
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 팔로우
const followAC = (sellerId) => {
  
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.put(process.env.REACT_APP_BASE_URL + `/user/follow?id=${sellerId}`, {

    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        dispatch(follow(res.data.followCount, res.data.followStatus))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 팔로워 리스트 가져오기
const followerListAC = (sellerId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/user/follower?id=${sellerId}`, {

    },
    {headers: { 'Authorization' : `Bearer ${Token}`}}
    )
    .then((res) => {
      dispatch(followerList(res.data))
    })
    .catch(error => {
      // console.log("error", error)
    })
  }
}

// 팔로잉 리스트 가져오기
const followingListAC = (sellerId) => {

  let Token = getToken("Authorization");
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/user/following?id=${sellerId}`, {

    },
    {headers: { 'Authorization' : `Bearer ${Token}`}}
    )
    .then((res) => {
      dispatch(followingList(res.data))
    })
    .catch(error => {
      // console.log("error", error)
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
    [GET_CREATOR_LIST]: (state, action) =>
    produce(state, (draft) => {
      draft.creator_list = action.payload.creator_list;
      draft.totalPages = action.payload.totalPages;
    }),
    [FOLLOW]: (state, action) =>
    produce(state, (draft) => {
      draft.creator_profile.sellerProfile.followerCnt = action.payload.followCount;
      draft.creator_profile.followStatus = action.payload.followStatus;
    }),
    [GET_FOLLOWER]: (state, action) =>
    produce(state, (draft) => {
      draft.creator_follower = action.payload.creator_follower;
    }),
    [GET_FOLLOWING]: (state, action) =>
    produce(state, (draft) => {
      draft.creator_following = action.payload.creator_following;
    }),
    [CLEAN_SELLER]: (state, action) =>
    produce(state, (draft) => {
      draft.creator_profile = [];
      draft.creator_followStatus = [];
      draft.creator_follower = [];
      draft.creator_following = [];
    }),
  },
  initialState
);


const actionCreators = {
// export 할 것들
  cleanSeller,
  getProfileAC,
  followAC,
  followerListAC,
  followingListAC,
  getListAC,
};

export { actionCreators };