import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

// 모듈
import User from "./modules/user";
import Book from "./modules/book";
import Audio from "./modules/audio";
import Search from "./modules/search";
import Fund from "./modules/fund";
import Mypage from "./modules/mypage";
import Chat from "./modules/chat";

// history를 페이지에서 편하게 사용할 수 있도록 준비
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  book: Book,
  audio : Audio,
  search : Search,
  fund : Fund,
  mypage : Mypage,
  chat : Chat,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려주는 것
const env = process.env.NODE_ENV;

// 콘솔에서 로거 확인하기
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 리덕스 데브툴 설정하기
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어 만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
