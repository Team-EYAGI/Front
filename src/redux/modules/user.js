import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import api from "../../api/api";
import { setToken } from "../../shared/Token";
import jwtDecode from "jwt-decode";
import axios from "axios";

// action
const LOGIN = "LOGIN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// action creator
const login = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, () => ({}));

// initialState
const initialState = {
  user : [],
  is_login: false,
};

//------------------middleware------------------------------

//-------------로그인-------------------
const loginDB = (email, password) => {
  console.log(email)
  return function (dispatch, getState, { history }) {
    axios
      .post(process.env.REACT_APP_BASE_URL + `/user/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        const token = res.headers.authorization;
        console.log(token);
        setToken(token);

        const DecodedToken = jwtDecode(token);
        console.log(DecodedToken);
        console.log(DecodedToken.sub);

        localStorage.setItem("email", email);
        localStorage.setItem("username", DecodedToken.sub);

        dispatch(
          login({
            is_login: true,

            email: email,
            username: DecodedToken.sub,
            //위치불확실 콘솔찍어서 확인
          })
        );
        history.replace("/");
        console.log("로그인성공!!");
      })
      .catch((error) => {
        alert(error.response.data.msg);
        // console.log(error)
      });
  };
};


// const loginCheckDB = () => {
//   return function (dispatch, getState, { history }) {
//     const username = localStorage.getItem("username");
//     const tokenCheck = document.cookie;
//     if (tokenCheck) {
//       dispatch(login({ username: username }));
//     } else {
//       dispatch(logOut());
//     }
//   };
// };

//------------회원가입-------------------
const signUpDB = (email, username, password, passwordCheck) => {
  console.log(email)
  console.log(username)
  console.log(password)
  console.log(passwordCheck)
  return function (dispatch, getState, { history }) {
    axios
      .post(process.env.REACT_APP_BASE_URL + `/user/join`, {        
        username: username,
        password: password,
        passwordCheck: passwordCheck,
        email: email,
      })
      
      .then((res) => {
        console.log(res)
        window.alert("회원가입이 완료되었습니다!");
        history.replace("/login");
      })
      
      .catch((err) => {
        console.log("에러",err);
      });
  };
};

//-----------------------reducer------------------------
export default handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        localStorage.setItem("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;

        console.log("action.payload.user", action.payload.user);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        // deleteCookie("is_login");
        draft.user = null;

        draft.is_login = false;
        // window.location.replace("/");
        // console.log("로그아웃합니다")
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

//action creator export
const actionCreators = {
  login,
  loginDB,
  getUser,
  signUpDB,
  logOut,

  //   loginCheckDB,
};

export { actionCreators };