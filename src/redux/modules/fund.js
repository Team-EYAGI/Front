import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// action
const GET_FUND = "GET_FUND";

// 초기값
const initialState = {
  fund : [],
};

// action creater
const getFund = createAction(GET_FUND, (key) => ({key}));

// --------------------middleware---------------------------

// 펀딩페이지 가져오기
const getFunding = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/fund`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("펀딩리스트", res)
      dispatch(getFund(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

//---------------reducer---------------
export default handleActions(
  {
    [GET_FUND]: (state, action) =>
    produce(state, (draft) => {
      draft.fund = action.payload.fund;
    }),
  },
  initialState
);


const actionCreators = {
// export 할 것들
  getFund,
};

export { actionCreators };