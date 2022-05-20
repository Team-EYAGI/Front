import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";

// action
const GET_FUND = "GET_FUND";
const ADD_FUND = "ADD_REQUEST";
const ADD_LIKE = 'ADD_LIKE';
const DEL_LIKE = 'DEL_LIKE';
const LOADING = "LOADING"

// 초기값
const initialState = {
  fund_list : [],
  fund_add : [],
  list: [],
  likeCnt: [],
  heart: [],
  paging: {page: 1, size: 20},
  is_loading: false,
};

// action creater
const getFunding = createAction(GET_FUND, (fund_list, paging) => ({fund_list, paging}));
const addFunding = createAction(ADD_FUND, (fund_add) => ({fund_add}));
const addLike = createAction(ADD_LIKE, (fundHeartBool, fundId) => ({ fundHeartBool, fundId }))
const delLike = createAction(DEL_LIKE, (fundHeartBool, fundId) => ({ fundHeartBool, fundId }))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));


// 미들웨어

// 펀딩페이지 가져오기
const getFundingAC = (page = 1, size = 20) => {
  const username = localStorage.getItem("username");
  console.log(username)
  let Token = getToken("Authorization");


  return function (dispatch, getState, {history}) {
    const _paging=getState().fund.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));

    const formData = new FormData();
    // formData.append("info", username)
    formData.append("info",
      new Blob([JSON.stringify(username)], {
        type: "application/json",
      })
    )

    axios.post(process.env.REACT_APP_BASE_URL + `/fund?size=${size}&page=${page}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `${Token}`,
        }
      }
    )
    .then((res) => {
      console.log(res)

        console.log(res.data.content)

        let paging={
          page : res.data.content.length === size ? page + 1 : null,
          size : size,
        };

        console.log(paging)
        dispatch(getFunding(res.data.content, paging));


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
        fundHeartBool : fundHeartBool,
      },
      { headers: { 'Authorization': `${Token}` } },

      )
      .then((res) => {     
        console.log(res)  
        dispatch(addLike(res.data.fundHeartBool, fundId)) 
      })
      .catch((error) => {       
        console.log(error)
      });
  };
};

// const delLikeDB = (fundHeartBool, fundId) => {
//   console.log(fundHeartBool, fundId)
//   let Token = getToken("Authorization");
//   return function (dispatch, getState, { history }) {
//     axios
//       .post(process.env.REACT_APP_BASE_URL + `/fund/like/${fundId}`, {
//         fundHeartBool : fundHeartBool,
//       },
//       { headers: { 'Authorization': `${Token}` } },

//       )
//       .then((res) => {     
//         console.log(res)  
//         dispatch(addLike(res.data.fundHeartBool, fundId)) 
//       })
//       .catch((error) => {       
//         console.log(error)
//       });
//   };
// };


//리듀서
export default handleActions(
  {
    [GET_FUND]: (state, action) =>
    produce(state, (draft) => {
      draft.fund_list.push(...action.payload.fund_list);
      draft.is_loading = false;
      if (action.payload.paging) {
        draft.paging = action.payload.paging;
      }
      // draft.fund_list = action.payload.fund_list;
    }),
    [ADD_FUND]: (state, action) =>
    produce(state, (draft) => {
      draft.fund_add = action.payload.fund_add;
    }),    
    [ADD_LIKE]: (state, action) =>  
    produce(state, (draft) => {
      console.log(action.payload.fundHeartBool)
      console.log(action.payload.fundId)
      draft.fund_list.find((p) => p.fundId !== action.payload.fundId).myHeart = action.payload.fundHeartBool;
      // window.location.reload()
      // draft.heart = draft.fund_list.find((p) => p.fundId !== action.payload.fundId)
      draft.heart = action.payload  
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