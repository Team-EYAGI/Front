import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setToken } from "../../shared/Token";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { emailCHK, passwordCHK, usernameCHK } from "../../shared/Commons";
import Swal from 'sweetalert2';

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

// 미들웨어
// 로그인
const loginAC = (email, password) => {
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

        localStorage.setItem("email", email);
        localStorage.setItem("username", DecodedToken.USER_NIK);
        localStorage.setItem("seller", DecodedToken.USER_ROLE);

        dispatch(
          login({
            is_login: true,

            email: email,
            username: DecodedToken.USER_NIK,
          })
        );
        history.replace("/");
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 1500,
          color: '#000000',
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: '로그인 성공!'
        })
      })
      .catch((error) => {
        if(error) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            color: '#000000',
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'error',
            title: '아이디와 비밀번호를 다시한번 확인해주세요!'
          })
        }
      });
  };
};

// 카카오
const kakaoLoginAC = (code) => {
  console.log(code)
  return function (dispatch, getState, { history }) {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/user/kakao/callback?code=${code}`)
      .then((res) => {        
        console.log(res);
        const token = res.headers.authorization;
        console.log(token);
        setToken(token);

        const DecodedToken = jwtDecode(token);
        console.log(DecodedToken);

        localStorage.setItem("email", DecodedToken.USER_EMAIL);
        localStorage.setItem("username", DecodedToken.USER_NIK);
        localStorage.setItem("seller", DecodedToken.USER_ROLE);

        dispatch(
          login({
            is_login: true,

            email: DecodedToken.USER_EMAIL,
            username: DecodedToken.USER_NIK,
            seller: DecodedToken.USER_ROLE
            //위치불확실 콘솔찍어서 확인
          })
        );
        history.replace("/");
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 1500,
          color: '#000000',
          // timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: '로그인 성공!'
        })
      })
      .catch((error) => {
        console.log(error)
      });
  };
};


// 회원가입
const signUpAC = (email, username, password, passwordCheck) => {
  
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    color: '#000000',
    // timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  return function (dispatch, getState, { history }) {
    axios
      .post(process.env.REACT_APP_BASE_URL + `/user/join`, {        
        username: username,
        password: password,
        passwordCheck: passwordCheck,
        email: email,
      })
      
      .then((res) => {
        Toast.fire({
          icon: 'success',
          title: '회원가입이 완료되었습니다!'
        })
        history.replace("/login");
      })
      .catch((error) => {
        if(error) {
          Toast.fire({
            icon: 'error',
            title: '회원가입 조건을 다시한번 확인해주세요!'
          })
        }
      });
  };
};


//이메일 중복확인
const emailCheckAC = (email) => {
  console.log(email);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    color: '#000000',
    // timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  if (!emailCHK(email)){
        Toast.fire({
          icon: 'error',
          title: '이메일 조건을 다시한번 확인해주세요!!',
        })
    return;
  }

  return function (dispatch, getState) {
        axios
      .post(process.env.REACT_APP_BASE_URL + `/user/email/check`, {        
        email: email,
      })
      .then((res) => {     
        Toast.fire({
          icon: 'success',
          title: '사용 가능한 이메일입니다!'
        })
      })
      .catch((error) => {
        if(error) {
          Toast.fire({
            icon: 'error',
            title: '이미 사용중인 이메일입니다!!'
          })
        }
      });
  };
};



//닉네임 중복확인
const usernameCheckAC = (username) => {

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    color: '#000000',
    // timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  if (!usernameCHK(username)){
    Toast.fire({
      icon: 'error',
      title: '닉네임 조건을 다시한번 확인해주세요!'
    })   
    return;
  }
  return function (dispatch, getState) {    
    axios
      .post(process.env.REACT_APP_BASE_URL + `/user/userName/check`, {        
        username: username,
    })
      .then((res) => {
        Toast.fire({
          icon: 'success',
          title: '사용 가능한 닉네임입니다!'
        })     
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: '이미 사용중인 닉네임입니다!'
        })   
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
        localStorage.removeItem("username");
        localStorage.removeItem("seller");
        localStorage.removeItem("is_login");
        localStorage.removeItem("roomId");
        localStorage.removeItem("userId");
        draft.user = null;

        draft.is_login = false;
        window.location.replace("/");
        console.log("로그아웃합니다")
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

//action creator export
const actionCreators = {
  login,
  loginAC,
  getUser,
  signUpAC,
  logOut,
  kakaoLoginAC,
  usernameCheckAC,
  emailCheckAC,
  //   loginCheckDB,
};

export { actionCreators };