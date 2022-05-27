import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";

// 액션
// 1. 메인페이지 관련
const GET_COOKIE = "GET_COOKIE"

// 2. 책 상세페이지 관련
const DELETE_AUDIOBOOK = "DELETE_AUDIOBOOK";

// 3. 카테고리별 도서 목록 관련
const GET_NOVEL = "GET_NOVEL";
const GET_POEM = "GET_POEM";
const GET_SELF = "GET_SELF";
const GET_ECONOMY = "GET_ECONOMY";
const GET_KIDS = "GET_KIDS";
const LOADING = "LOADING"

// 4. 카테고리 초기화 
const CLEAR_CATEGORY = "CLEAR_CATEGORY";
const CLEAR_MAIN = "CLEAR_MAIN";

// 액션 생성 함수
const getCooKie = createAction(GET_COOKIE, () => ({}));
const deleteAudioBook = createAction(DELETE_AUDIOBOOK, (audioBookId) => ({ audioBookId }));

const getNovel = createAction(GET_NOVEL, (novel, paging) => ({ novel, paging }));
const getPoem = createAction(GET_POEM, (poem, paging) => ({ poem, paging }));
const getSelf = createAction(GET_SELF, (self, paging) => ({ self, paging }));
const getEconomy = createAction(GET_ECONOMY, (economy, paging) => ({ economy, paging }));
const getKids = createAction(GET_KIDS, (kids, paging) => ({ kids, paging }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const clearCategory = createAction(CLEAR_CATEGORY, () => { });
const clearMain = createAction(CLEAR_MAIN, () => { });

// 초기값
const initialState = {
  category_novel: [],
  category_poem: [],
  category_economy: [],
  category_kids: [],
  category_self: [],
  paging: { page: 1, size: 20 },
  is_loading: false,
};

// 미들웨어
// 쿠키 저장
const getCookieAC = () => {
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/cookie`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        // dispatch(getMain(res.data))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}


// 오디오북 챕터 삭제(관리자)
const deleteAudioBookAC = (audioBookId) => {
  let Token = getToken("Authorization");
  return function (dispatch, getState, { history }) {
    axios.delete(process.env.REACT_APP_BASE_URL + `/audio/detail/remove/${audioBookId}`,
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

// 카테고리별 도서 : 소설
const getNovelAC = (page = 1, size = 20) => {
  return function (dispatch, getState, { history }) {
    const _paging = getState().book.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    axios.get(process.env.REACT_APP_BASE_URL + `/category/novel?page=${page}&size=${size}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        let paging = {
          page: res.data.content.length === size ? page + 1 : null,
          size: size,
        };
        dispatch(getNovel(res.data.content, paging));
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 카테고리별 도서 : 경제
const getEconomyAC = (page = 1, size = 20) => {
  return function (dispatch, getState, { history }) {
    const _paging = getState().book.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    axios.get(process.env.REACT_APP_BASE_URL + `/category/economy?page=${page}&size=${size}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        let paging = {
          page: res.data.content.length === size ? page + 1 : null,
          size: size,
        };
        dispatch(getEconomy(res.data.content, paging));
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 카테고리별 도서 : 시, 에세이
const getPoemAC = (page = 1, size = 20) => {
  return function (dispatch, getState, { history }) {
    const _paging = getState().book.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    axios.get(process.env.REACT_APP_BASE_URL + `/category/poem?page=${page}&size=${size}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        let paging = {
          page: res.data.content.length === size ? page + 1 : null,
          size: size,
        };
        dispatch(getPoem(res.data.content, paging));
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 카테고리별 도서 : 유아동
const getKidsAC = (page = 1, size = 20) => {
  return function (dispatch, getState, { history }) {
    const _paging = getState().book.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    axios.get(process.env.REACT_APP_BASE_URL + `/category/kids?page=${page}&size=${size}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        let paging = {
          page: res.data.content.length === size ? page + 1 : null,
          size: size,
        };
        dispatch(getKids(res.data.content, paging));
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 카테고리별 도서 : 자기계발
const getSelfAC = (page = 1, size = 20) => {
  return function (dispatch, getState, { history }) {
    const _paging = getState().book.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    axios.get(process.env.REACT_APP_BASE_URL + `/category/self?page=${page}&size=${size}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        let paging = {
          page: res.data.content.length === size ? page + 1 : null,
          size: size,
        };
        dispatch(getSelf(res.data.content, paging));
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}


// 리듀서
export default handleActions(
  {
    [DELETE_AUDIOBOOK]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_book.audio = draft.detail_book.audio.filter((p) => p.audioBookId !== action.payload.audioBookId);
      }),
    [GET_NOVEL]: (state, action) =>
      produce(state, (draft) => {
        draft.category_novel.push(...action.payload.novel);
        draft.is_loading = false;
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
      }),
    [GET_POEM]: (state, action) =>
      produce(state, (draft) => {
        draft.category_poem.push(...action.payload.poem);
        draft.is_loading = false;
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
      }),
    [GET_SELF]: (state, action) =>
      produce(state, (draft) => {
        draft.category_self.push(...action.payload.self);
        draft.is_loading = false;
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
      }),
    [GET_KIDS]: (state, action) =>
      produce(state, (draft) => {
        draft.category_kids.push(...action.payload.kids);
        draft.is_loading = false;
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
      }),
    [GET_ECONOMY]: (state, action) =>
      produce(state, (draft) => {
        draft.category_economy.push(...action.payload.economy);
        draft.is_loading = false;
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
      }),
    [LOADING]: (state, action) => produce(state, (draft) => {
      draft.is_loading = action.payload.is_loading;
    }),

    [CLEAR_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.paging = { page: 1, size: 20 };
        draft.category_novel = [];
        draft.category_poem = [];
        draft.category_economy = [];
        draft.category_kids = [];
        draft.category_self = [];
      }),
    [CLEAR_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.main = [];
        draft.main_category = [];
        draft.main_creator = [];
        draft.main_funding = [];
        draft.detail_book = [];
      }),
  },
  initialState
);


const actionCreators = {
  // export 할 것들
  getCookieAC,
  deleteAudioBookAC,
  getNovelAC,
  getPoemAC,
  getSelfAC,
  getEconomyAC,
  getKidsAC,
  clearCategory,
  clearMain,
};

export { actionCreators };