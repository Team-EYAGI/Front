import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// 액션
// 1. 메인페이지 관련
const GET_MAIN = "GET_MAIN";
const GET_MAIN_CATEGORY = "GET_MAIN_CATEGORY";
const GET_MAIN_FUNDING = "GET_MAIN_FUNDING";
const GET_MAIN_CREATOR = "GET_MAIN_CREATOR";
const GET_COOKIE = "GET_COOKIE"

// 2. 책 상세페이지 관련
const GET_BOOKDETAIL = "GET_BOOKDETAIL";

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
const getMain = createAction(GET_MAIN, (main) => ({ main }));
const getMainCategory = createAction(GET_MAIN_CATEGORY, (main_category) => ({ main_category }));
const getMainFunding = createAction(GET_MAIN_FUNDING, (main_funding) => ({ main_funding }));
const getMainCreator = createAction(GET_MAIN_CREATOR, (main_creator) => ({ main_creator }));
const getCooKie = createAction(GET_COOKIE, () => ({  }));


const getBookDetail = createAction(GET_BOOKDETAIL, (detail_book) => ({ detail_book }));

const getNovel = createAction(GET_NOVEL, (novel, paging) => ({ novel, paging }));
const getPoem = createAction(GET_POEM, (poem, paging) => ({ poem, paging }));
const getSelf = createAction(GET_SELF, (self, paging) => ({ self, paging }));
const getEconomy = createAction(GET_ECONOMY, (economy, paging) => ({ economy, paging }));
const getKids = createAction(GET_KIDS, (kids, paging) => ({ kids, paging }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const clearCategory = createAction(CLEAR_CATEGORY, () => {});
const clearMain = createAction(CLEAR_MAIN, () => {});

// 초기값
const initialState = {
  main: [],
  main_category: [],
  main_funding: [],
  main_creator: [],
  detail_book: [],
  category_novel: [],
  category_poem: [],
  category_economy: [],
  category_kids: [],
  category_self: [],
  paging: {page: 1, size: 20},
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
        console.log(res)
        // dispatch(getMain(res.data))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 메인페이지 추천도서 겟
const getMainAC = () => {
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        console.log(res)
        dispatch(getMain(res.data))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 메인페이지 카테고리별 도서 겟
const getMainCategoryAC = () => {
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/category`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        dispatch(getMainCategory(res.data))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 메인페이지 크리에이터 겟
const getMainCreatorAC = () => {
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/user/todayCreator`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        dispatch(getMainCreator(res.data))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}


// 메인페이지 펀딩목록 겟
const getMainFundingAC = () => {
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/main/fund`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        dispatch(getMainFunding(res.data))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 책 상세페이지 겟
const getBookDetailAC = (bookId) => {
  return function (dispatch, getState, { history }) {
    axios.get(process.env.REACT_APP_BASE_URL + `/book/detail/${bookId}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        dispatch(getBookDetail(res.data))
      })
      .catch(error => {
        // console.log("error", error)
      })
  }
}

// 카테고리별 도서 : 소설
const getNovelAC = (page = 1, size = 20) => {
  return function (dispatch, getState, { history }) {
    const _paging=getState().book.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    axios.get(process.env.REACT_APP_BASE_URL + `/category/novel?page=${page}&size=${size}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        let paging={
          page : res.data.content.length === size ? page + 1 : null,
          size : size,
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
    const _paging=getState().book.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    axios.get(process.env.REACT_APP_BASE_URL + `/category/economy?page=${page}&size=${size}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        let paging={
          page : res.data.content.length === size ? page + 1 : null,
          size : size,
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
    const _paging=getState().book.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    axios.get(process.env.REACT_APP_BASE_URL + `/category/poem?page=${page}&size=${size}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        let paging={
          page : res.data.content.length === size ? page + 1 : null,
          size : size,
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
    const _paging=getState().book.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    axios.get(process.env.REACT_APP_BASE_URL + `/category/kids?page=${page}&size=${size}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        let paging={
          page : res.data.content.length === size ? page + 1 : null,
          size : size,
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
    const _paging=getState().book.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    axios.get(process.env.REACT_APP_BASE_URL + `/category/self?page=${page}&size=${size}`, {

    },
      // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
      .then((res) => {
        let paging={
          page : res.data.content.length === size ? page + 1 : null,
          size : size,
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
    [GET_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.main = action.payload.main;
      }),
    [GET_MAIN_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.main_category = action.payload.main_category;
      }),
    [GET_MAIN_FUNDING]: (state, action) =>
      produce(state, (draft) => {
        draft.main_funding = action.payload.main_funding;
      }),
    [GET_MAIN_CREATOR]: (state, action) =>
      produce(state, (draft) => {
        draft.main_creator = action.payload.main_creator;
      }),
    [GET_BOOKDETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_book = action.payload.detail_book;
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
        draft.paging = {page: 1, size: 20};
        draft.category_novel = [];
        draft.category_poem= [];
        draft.category_economy= [];
        draft.category_kids= [];
        draft.category_self= [];
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
  getMainAC,
  getMainCategoryAC,
  getMainCreatorAC,
  getMainFundingAC,
  getCookieAC,
  getBookDetailAC,
  getNovelAC,
  getPoemAC,
  getSelfAC,
  getEconomyAC,
  getKidsAC,
  clearCategory,
  clearMain,
};

export { actionCreators };