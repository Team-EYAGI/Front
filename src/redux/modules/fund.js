import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";

// action
const GET_FUND = "GET_FUND";
const ADD_FUND = "ADD_REQUEST";
const ADD_LIKE = 'ADD_LIKE';
const DEL_LIKE = 'DEL_LIKE';

// 초기값
const initialState = {
  fund_list : [],
  fund_add : [],
  list: [],
  likeCnt: [],
};

// action creater
const getFunding = createAction(GET_FUND, (fund_list) => ({fund_list}));
const addFunding = createAction(ADD_FUND, (fund_add) => ({fund_add}));
const addLike = createAction(ADD_LIKE, (like, fundId) => ({ like, fundId }))
const delLike = createAction(DEL_LIKE, (like) => ({ like }))


// 미들웨어

// 펀딩페이지 가져오기
const getFundingAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/fund`, {

    },
    )
    .then((res) => {
      console.log(res)
      dispatch(getFunding(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}


// 오디오북 파일 추가
const addFundingAC = (payload) => {
  let Token = getToken("Authorization");
  let bookId = payload.bookId
  return function (dispatch, getState, { history }) {
    // formData 형식으로 이미지 전송
    const formData = new FormData();
    formData.append("file", payload.file)
    formData.append("information",
      new Blob([JSON.stringify(payload.information)], {
        type: "application/json",
      })
    )

    // FormData의 key 확인
    for (let key of formData.keys()) { console.log(key); }
    // FormData의 value 확인
    for (let value of formData.values()) { console.log(value); }

    axios.post(process.env.REACT_APP_BASE_URL + `/fund/new/${bookId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `${Token}`
        }
      }
    )
      .then((res) => {
        console.log("펀딩 등록 완료", res)
        history.replace(`/funding`);
      })
      .catch(error => {
        console.log("서버에러", error)
      })
  }
}

//좋아요
const addLikeDB = (fundHeartBool, fundId) => {
  console.log(fundHeartBool, fundId)
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios
      .post(process.env.REACT_APP_BASE_URL + `/fund/like/${fundId}`, {
        fundHeartBool : fundHeartBool
      },
      { headers: { 'Authorization': `${Token}` } }
      )
      .then((res) => {       
        dispatch(addLike(res.data, fundId)) 
      })
      .catch((error) => {       
        console.log(error)
      });
  };
};


//리듀서
export default handleActions(
  {
    [GET_FUND]: (state, action) =>
    produce(state, (draft) => {
      draft.fund_list = action.payload.fund_list;
    }),
    [ADD_FUND]: (state, action) =>
    produce(state, (draft) => {
      draft.fund_add = action.payload.fund_add;
    }),    
    [ADD_LIKE]: (state, action) =>  
    produce(state, (draft) => {
      console.log(action.payload)
      draft.likeCnt = action.payload.like.fundHeartBool;
      }),
  },
  initialState
);


const actionCreators = {
// export 할 것들
getFundingAC,
addFundingAC,
addLikeDB,
};

export { actionCreators };