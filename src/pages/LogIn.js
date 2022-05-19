import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setId] = useState("");
  const [password, setPwd] = useState("");

  const login = () => {
    dispatch(userActions.loginAC(email, password));
  };

  // 카카오 로그인
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <React.Fragment>
      <LoginContainer>
        <form>
          <center>
            <h2>로그인</h2>
            <div id="buttonBox">
              <LoginBox>
                <div id="box">
                  <input
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                    placeholder="이메일"
                    value={email}
                  ></input>

                  <input
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    placeholder="비밀번호"
                    value={password}
                    type="password"
                  ></input>
                </div>
              </LoginBox>
              <button
                disabled={email === "" || password === ""}
                id="loginbtn"
                onClick={login}
                type="button"
              >
                로그인
              </button>
            </div>
            <hr></hr>
            <button
              id="kakaobtn"
              onClick={() => {
                window.open(KAKAO_AUTH_URL);
              }}
              type="button"
            >
              카카오로 로그인
            </button>

            <button
              id="signupbtn"
              onClick={() => {
                history.push("/SignUp");
              }}
              type="button"
            >
              간편 회원가입
            </button>
          </center>
        </form>
      </LoginContainer>
    </React.Fragment>
  );
};

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin: 100px auto;
  border: 0px solid #c0c0c0;
  width: 464px;
  height: 537px;
  font-size: 16px;
  border-radius: 10px;
  padding: 0px 50px 10px 37px;
  font-family: "Pretendard";
  font-style: normal;

  #loginbtn {
      background: #0C0A0A;
      color: #FFFFFF;
      border-radius: 10px;
      cursor: pointer;

      :disabled {
        background: #F4F4F4;
        color: #8E8E8E;
        border: 1px solid #E4E4E4;
        cursor: auto;
      }
    }


  button {
    font-family: "Pretendard";
    font-style: normal;
    font-size: 18px;
    border: 0px;
    border-radius: 10px;
    cursor: pointer;
  }

  #buttonBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 15px;
    padding-top: 5px;
  }

  #loginbtn {
    margin-left: 70px;
    box-shadow: none;
    width: 157px;
    height: 118px;
    background-color: #0c0a0a;
    margin-top: 10px;
    color: white;
    font-family: "Pretendard";
    font-style: normal;
  }

  #kakaobtn {
    box-shadow: none;
    border: 0px;
    width: 464px;
    height: 60px;
    background-color: #fae44d;
    margin-top: 5px;
    color: #212127;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
  }

  #signupbtn {
    display: flex;
    align-items: center;
    justify-content: space-around;
    float: left;
    box-shadow: none;
    width: 120px;
    height: 24px;
    background-color: #fff;
    margin-top: 5px;
    color: #0c0a0a;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
  }
`;

const LoginBox = styled.div`
  border-radius: 10px;
  width: 250px;

  #box {
    input {
      border: 1px solid #c0c0c0;
      border-radius: 10px;
      width: 282px;
      height: 48px;
      margin-top: 10px;
      padding-top: 5px;
      padding-left: 16px;
      margin-right: 20px;
    }
  }
`;



export default Login;
