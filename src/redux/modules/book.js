import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// 액션
// 크롤링 데이터 로드
const GET_MAIN = "GET_MAIN";
const GET_BOOKDETAIL = "GET_BOOKDETAIL";
const GET_NOVEL = "GET_NOVEL";
const GET_POEM = "GET_POEM";
const GET_SELF = "GET_SELF";
const GET_ECONOMY = "GET_ECONOMY";
const GET_KIDS = "GET_KIDS";


// // 이미지 액션
// const UPLODING = "UPLODING";
// const UPLOAD_IMG = "UPLOAD_IMG";
// const SET_PREVIEW = "SET_PREVIEW";


// 초기값
const initialState = {
  main : [],
  detail_book : [],
  category_novel : [],
  category_poem : [],
  category_economy : [],
  category_kids : [],
  category_self : [],
};

// 액션 생성 함수
const getMain = createAction(GET_MAIN, (main) => ({main}));
const getBookDetail = createAction(GET_BOOKDETAIL, (detail_book) => ({detail_book}));
const getNovel = createAction(GET_NOVEL, (novel) => ({novel}));
const getPoem = createAction(GET_POEM, (poem) => ({poem}));
const getSelf = createAction(GET_SELF, (self) => ({self}));
const getEconomy = createAction(GET_ECONOMY, (economy) => ({economy}));
const getKids = createAction(GET_KIDS, (kids) => ({kids}));


// const getReview = createAction(SET_REVIEW, (comment_list) => ({comment_list}));
// const deleteReview = createAction(DELETE_REVIEW, (commentId) => ({commentId}));
// const editReview = createAction(EDIT_REVIEW, (itemId, comment_list) => ({itemId, comment_list}));
// const helpReview = createAction(HELP_REVIEW, (commentId) => ({commentId}));

// const uploading = createAction(UPLODING, (uploading) => ({ uploading }));
// const uploadImg = createAction(UPLOAD_IMG, (image) => ({ image }));
// const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// 미들웨어

// 메인페이지 책 로드
const getMainAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      // console.log("메인페이지 리스트", res)
      dispatch(getMain(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 책 상세페이지 로드
const getBookDetailAC = (bookId) => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/book/detail/${bookId}`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      // console.log("상세페이지 정보", res)
      dispatch(getBookDetail(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 카테고리별 도서 : 소설
const getNovelAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/category/novel`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      // console.log("소설 준비완료", res)
      dispatch(getNovel(res.data))
    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 카테고리별 도서 : 경제
const getEconomyAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/category/economy`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      // console.log("경제 준비완료", res)
      dispatch(getEconomy(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 카테고리별 도서 : 시, 에세이
const getPoemAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/category/poem`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      // console.log("시 준비완료", res)
      dispatch(getPoem(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 카테고리별 도서 : 유아동
const getKidsAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/category/kids`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      // console.log("유아동 준비완료", res)
      dispatch(getKids(res.data))
    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 카테고리별 도서 : 자기계발
const getSelfAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/category/self`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      // console.log("자기계발 준비완료", res)
      dispatch(getSelf(res.data))

    })
    .catch(error => {
      console.log("error", error)
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
    [GET_BOOKDETAIL]: (state, action) =>
    produce(state, (draft) => {
      draft.detail_book = action.payload.detail_book;
    }),
    [GET_NOVEL]: (state, action) =>
    produce(state, (draft) => {
      // console.log("저장!", action.payload.novel)
      draft.category_novel = action.payload.novel;
    }),
    [GET_POEM]: (state, action) =>
    produce(state, (draft) => {
      // console.log("리듀서", action.payload)
      draft.category_poem = action.payload.poem;
    }),
    [GET_SELF]: (state, action) =>
    produce(state, (draft) => {
      draft.category_self = action.payload.self;
    }),
    [GET_KIDS]: (state, action) =>
    produce(state, (draft) => {
      draft.category_kids = action.payload.kids;
    }),
    [GET_ECONOMY]: (state, action) =>
    produce(state, (draft) => {
      draft.category_economy = action.payload.economy;
    }),
  },
  initialState
);


const actionCreators = {
// export 할 것들
  getMain,
  getBookDetail,
  getNovel,
  getPoem,
  getSelf,
  getEconomy,
  getKids,
  getMainAC,
  getBookDetailAC,
  getNovelAC,
  getPoemAC,
  getSelfAC,
  getEconomyAC,
  getKidsAC,
};

export { actionCreators };