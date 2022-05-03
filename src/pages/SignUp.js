import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";

const Signup = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const [email, setId] = useState("");
  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [passwordCheck, setPwdCheck] = useState("");

  const signup = () => {
    dispatch(userActions.signUpDB(email, username, password, passwordCheck));
  };

  return (
    <React.Fragment>
      <SignupContainer>
        <form>
          <center>
            <h3>간편 회원가입</h3>

            <input
              onChange={(e) => {
                setId(e.target.value);
              }}
              value={email}
              placeholder="이메일"
            ></input>
            <input
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={username}
              placeholder="닉네임"              
            ></input>
            <input
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={password}
              placeholder="비밀번호"
              type="password"              
            ></input>
            <input
              onChange={(e) => {
                setPwdCheck(e.target.value);
              }}
              value={passwordCheck}
              placeholder="비밀번호확인"
              type="password"              
            ></input>
            <button id="signup"              
              type="button"
              onClick={signup}              
            >
              가입하기
            </button>
          </center>
        </form>
      </SignupContainer>
    </React.Fragment>
  );
};

const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin: 100px auto;
  border: 0px solid #c0c0c0;
  width: 400px;
  height: 500px;
  font-size: 16px;
  border-radius: 5px;
  padding: 44px 50px 10px 37px;


  input{
    font-family: noto-sans-cjk-kr, sans-serif;
    font-style: normal;
    font-size: 18px;
    border: 1px solid #C0C0C0;
    border-radius: 5px;
    width: 360px;
    height: 48px;
    margin-top: 20px;
  }


  #signup {
    font-family: noto-sans-cjk-kr, sans-serif;
    font-style: normal;
    font-size: 18px;
    border: 0px;
    border-radius: 5px;
    color: white;
    box-shadow: none;       
    width: 364px;           
    height: 60px;
    background-color: #62bdfa;       
    margin-top: 50px;
    cursor: pointer;
  }
`;

export default Signup;