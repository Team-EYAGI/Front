import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";
import Swal from 'sweetalert2';

// action
const GET_FUND = "GET_FUND";
const ADD_FUND = "ADD_REQUEST";
const ADD_LIKE = 'ADD_LIKE';
const DEL_LIKE = 'DEL_LIKE';
const LOADING = "LOADING"
const GET_DETAIL = "GET_DETAIL"
const CLEAN = "CLEAN"

// 초기값
const initialState = {
  fund_list: [],
  fund_add: [],
  list: [],
  likeCnt: [],
  heart: [],
  paging: { page: 1, size: 20 },
  is_loading: false,
  fund_detail: [],
};

// action creater
const getFunding = createAction(GET_FUND, (fund_list, totalPages) => ({ fund_list, totalPages }));
const addFunding = createAction(ADD_FUND, (fund_add) => ({ fund_add }));
const addLike = createAction(ADD_LIKE, (fundHeartBool, fundHeartCnt, successFunding) => ({ fundHeartBool, fundHeartCnt, successFunding }))
const delLike = createAction(DEL_LIKE, (fundHeartBool, fundId) => ({ fundHeartBool, fundId }))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const getDetail = createAction(GET_DETAIL, (fund_detail) => ({ fund_detail }));
const clean = createAction(CLEAN, () => ({}));

// 미들웨어

// 펀딩페이지 가져오기
const getFundingAC = (page, size = 12) => {
  const username = localStorage.getItem("username");
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {

    const formData = new FormData();
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
        dispatch(getFunding(res.data.content, res.data.totalPages));
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 펀딩상세페이지
const getFundingDetailAC = (fundId) => {
  const username = localStorage.getItem("username");
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {

    const formData = new FormData();
    formData.append("info",
      new Blob([JSON.stringify(username)], {
        type: "application/json",
      })
    )

    if (username) {
      axios.post(process.env.REACT_APP_BASE_URL + `/fund/detail/${fundId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${Token}`,
          }
        }
      )
        .then((res) => {
          dispatch(getDetail(res.data.content))
        })
        .catch(error => {
          // console.log("error", error)
        })
    } else {
      axios.post(process.env.REACT_APP_BASE_URL + `/fund/detail/${fundId}`, {

      },
        // { headers: { 'Authorization': `${Token}` } },
      )
        .then((res) => {
          dispatch(getDetail(res.data.content))
        })
        .catch(error => {
          // console.log("error", error)
        })
    }


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
    // for (let key of formData.keys()) { console.log(key); }
    // FormData의 value 확인
    // for (let value of formData.values()) { console.log(value); }

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
        history.replace(`/funding`);
      })
      .catch(error => {
        // console.log(error)
      })
  }
}

//좋아요
const addLikeDB = (fundHeartBool, fundId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios
      .post(process.env.REACT_APP_BASE_URL + `/fund/like/${fundId}`, {
        fundHeartBool: fundHeartBool,
      },
        { headers: { 'Authorization': `${Token}` } },

      )
      .then((res) => {
        dispatch(addLike(res.data.fundHeartBool, res.data.fundHeartCnt, res.data.successFunding))
      })
      .catch((error) => {
        // console.log(error)
      });
  };
};

// 펀딩에 성공한사람인지 아닌지
const fundingSuccessAC = (bookId, category) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.post(process.env.REACT_APP_BASE_URL + `/book/detail/${bookId}/success`, {

    },
      { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        if (res.data === false) {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `펀딩을 먼저 진행해주세요!`,
            showConfirmButton: false,
            timer: 1500,
            color: "#000000",
          })
          return;
        } else {
          history.push(`/audioWrite/${category}/${bookId}`)
        }
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}



//리듀서
export default handleActions(
  {
    [GET_FUND]: (state, action) =>
      produce(state, (draft) => {
        draft.fund_list = action.payload.fund_list;
        draft.totalPages = action.payload.totalPages;
        draft.is_loading = false;
      }),
    [ADD_FUND]: (state, action) =>
      produce(state, (draft) => {
        draft.fund_add = action.payload.fund_add;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.fund_detail.myHeart = action.payload.fundHeartBool;
        draft.fund_detail.likeCnt = action.payload.fundHeartCnt;
        draft.fund_detail.successFunding = action.payload.successFunding;
      }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.fund_detail = action.payload.fund_detail;
      }),
    [CLEAN]: (state, action) =>
      produce(state, (draft) => {
        draft.fund_detail = [];
      }),
  },
  initialState
);


const actionCreators = {
  // export 할 것들
  getFundingAC,
  addFundingAC,
  addLikeDB,
  getFundingDetailAC,
  fundingSuccessAC,
  clean,
};

export { actionCreators };