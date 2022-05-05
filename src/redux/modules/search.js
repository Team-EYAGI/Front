import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";

// 액션
const GET_SEARCH = "GET_SEARCH";
const ADD_SEARCH = "ADD_SEARCH";

// 초기값
const initialState = {
  search_list: [],
};

// 액션 생성 함수
const getSearch = createAction(GET_SEARCH, (search_list) => ({ search_list }));
const addSearch = createAction(ADD_SEARCH, (search_list) => ({ search_list }));

// 미들웨어

// 검색정보 겟
const getSearchAC = () => {
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/book/request`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        console.log("검색 목록 불러오기", res)
        dispatch(getSearch(res.data))

      })
      .catch(error => {
        console.log("error", error)
      })
  }
}

// 검색 시도
const addSearchAC = (word) => {
  console.log(word)
  // let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.post(process.env.REACT_APP_BASE_URL + `/find`, {
      word: word,
    },
      // { headers: { 'Authorization': `${Token}` } }
    )
      .then((res) => {
        console.log("검색 성공", res)
        dispatch(getSearch(res.data))
        history.replace(`/search`)
      })
      .catch(error => {
        console.log("error", error.response.data.msg)
      })
  }
}


// 리듀서
export default handleActions(
  {
    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list = action.payload.search_list;
      }),
  },
  initialState
);


const actionCreators = {
  // export 할 것들
  getSearch,
  addSearch,
  getSearchAC,
  addSearchAC,
};

export { actionCreators };