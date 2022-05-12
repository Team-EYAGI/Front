import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// 액션
// 크롤링 데이터 로드
const GET_MAIN = "GET_MAIN";
const GET_MAIN_CATEGORY = "GET_MAIN_CATEGORY";
const GET_MAIN_FUNDING = "GET_MAIN_FUNDING";
const GET_MAIN_CREATOR = "GET_MAIN_CREATOR";
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
  main_category : [],
  main_funding : [],
  main_creator : [],
  detail_book : [],
  category_novel : [],
  category_poem : [],
  category_economy : [],
  category_kids : [],
  category_self : [],
};


// 액션 생성 함수
const getMain = createAction(GET_MAIN, (main) => ({main}));
const getMainCategory = createAction(GET_MAIN_CATEGORY, (main_category) => ({main_category}));
const getMainFunding = createAction(GET_MAIN_FUNDING, (main_funding) => ({main_funding}));
const getMainCreator = createAction(GET_MAIN_CREATOR, (main_creator) => ({main_creator}));
const getBookDetail = createAction(GET_BOOKDETAIL, (detail_book) => ({detail_book}));
const getNovel = createAction(GET_NOVEL, (novel) => ({novel}));
const getPoem = createAction(GET_POEM, (poem) => ({poem}));
const getSelf = createAction(GET_SELF, (self) => ({self}));
const getEconomy = createAction(GET_ECONOMY, (economy) => ({economy}));
const getKids = createAction(GET_KIDS, (kids) => ({kids}));


// 미들웨어

// 메인페이지 추천도서 겟
const getMainAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("메인페이지 리스트", res)
      dispatch(getMain(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 메인페이지 카테고리별 도서 겟
const getMainCategoryAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/category`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("메인 카테고리 리스트", res)
      dispatch(getMainCategory(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}

// 메인페이지 크리에이터 겟
const getMainCreatorAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/user/todayCreator`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("메인 크리에이터 리스트", res)
      dispatch(getMainCreator(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}


// 메인페이지 펀딩목록 겟
const getMainFundingAC = () => {
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/main/fund`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("메인 펀딩 리스트", res)
      dispatch(getMainFunding(res.data))

    })
    .catch(error => {
      console.log("error", error)
    })
  }
}




// 책 상세페이지 겟
const getBookDetailAC = (bookId) => {
  console.log(bookId)
  return function (dispatch, getState, {history}) {
    axios.get(process.env.REACT_APP_BASE_URL + `/book/detail/${bookId}`, {

    },
    // {headers: { 'Authorization' : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log("상세페이지 정보", res.data)
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
      // console.log("리듀서로 넘김",action.payload.detail_book)
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
  getMainCategory,
  getBookDetail,
  getNovel,
  getPoem,
  getSelf,
  getEconomy,
  getKids,
  getMainAC,
  getMainCategoryAC,
  getMainCreatorAC,
  getMainFundingAC,
  getBookDetailAC,
  getNovelAC,
  getPoemAC,
  getSelfAC,
  getEconomyAC,
  getKidsAC,
};

export { actionCreators };