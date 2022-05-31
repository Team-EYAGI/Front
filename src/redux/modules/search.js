import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// 액션
const ADD_SEARCH = "ADD_SEARCH";

// 초기값
const initialState = {
  search_list: [],
};

// 액션 생성 함수
const addSearch = createAction(ADD_SEARCH, (search_list) => ({ search_list }));

// 미들웨어

// 검색 시도
const addSearchAC = (word) => {
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/search?search=${word}`,

    )
      .then((res) => {
        dispatch(addSearch(res.data))
        history.replace(`/search`);
      })
      .catch(error => {
        // console.log("서버에러", error)
      })
  }
}


// 리듀서
export default handleActions(
  {
    [ADD_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list = action.payload.search_list;
      }),
  },
  initialState
);


const actionCreators = {
  // export 할 것들
  addSearch,
  addSearchAC,
};

export { actionCreators };