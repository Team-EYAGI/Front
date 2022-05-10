import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCHK, passwordCHK, usernameCHK } from "../shared/Common";

const Signup = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const [email, setId] = useState("");
  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [passwordCheck, setPwdCheck] = useState("");


  const checkUsername = () => {
    dispatch(userActions.usernameCheckF(username));
  };

  const checkEmail = () => {
    dispatch(userActions.emailCheckF(email));
  };


  const signup = () => {
    if (
      email === "" ||
      password === "" ||
      username === "" ||
      passwordCheck === ""
    ) {
      window.alert("모두 입력해주세요!");
      return;
    }
    if (
      !emailCHK(email) ||
      !passwordCHK(password) ||
      password !== passwordCheck
    ) {
      window.alert("회원가입 조건을 다시한번 확인해주세요.");
      return;
    }


    dispatch(userActions.signUpDB(email, username, password, passwordCheck));
  };

  return (
    <React.Fragment>
      <SignupContainer>
        <form>
          <center>
            <h3>간편 회원가입</h3>

            <div>
              <MailBox>
                <input
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  value={email}
                  placeholder="이메일"
                ></input>
                <button 
                id="Mail" 
                type="button"
                onClick={checkEmail}>
                  이메일 중복확인
                </button>
              </MailBox>

              {/* 아이디 유효성검사 */}
              {email.length < 1 ? null : !emailCHK(email) ? (
                <div>
                  <li style={{ color: "red" }}>
                    6자 이상의 영문 혹은 영문과 숫자를 조합한 이메일형식
                  </li>
                </div>
              ) : (
                <div>
                  <li style={{ color: "green" }}>
                    6자 이상의 영문 혹은 영문과 숫자를 조합한 이메일형식
                  </li>
                </div>
              )}
            </div>

            <div>
              <Nickbox>
              <input
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                value={username}
                placeholder="닉네임"
              ></input>
              <button id="Name" type="button" onClick={checkUsername}>
                닉네임 중복확인
              </button>
              </Nickbox>
            </div>
            
            <div>
              <input
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={password}
                placeholder="비밀번호"
                type="password"
              ></input>
              {/* 비밀번호 유효성 검사 */}
              {password.length < 1 ? null : !passwordCHK(password) ? (
                <div className="checkPw">
                  <li style={{ color: "red" }}> 8글자 이상 입력</li>
                  <li style={{ color: "red" }}>
                    영문/숫자/특수문자(공백 제외)만 허용, 2개 이상의 조합
                  </li>
                </div>
              ) : (
                <div className="checkPw">
                  <li style={{ color: "green" }}> 8글자 이상 입력</li>
                  <li style={{ color: "green" }}>
                    영문/숫자/특수문자(공백 제외)만 허용, 2개 이상의 조합
                  </li>
                </div>
              )}
            </div>

            <div>
              <input
                onChange={(e) => {
                  setPwdCheck(e.target.value);
                }}
                value={passwordCheck}
                placeholder="비밀번호확인"
                type="password"
              ></input>

              {/* 비밀번호와 비밀번호 체크 비교 */}
              {passwordCheck.length < 1 ? null : password !== passwordCheck ? (
                <div style={{ color: "red" }}>
                  <li>동일한 비밀번호를 입력해주세요.</li>
                </div>
              ) : (
                <div style={{ color: "green" }}>
                  <li>동일한 비밀번호를 입력해주세요.</li>
                </div>
              )}
            </div>

            <button id="signup" type="button" onClick={signup}>
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

  input {
    font-family: noto-sans-cjk-kr, sans-serif;
    font-style: normal;
    font-size: 18px;
    border: 1px solid #c0c0c0;
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

  #Mail {
    font-family: noto-sans-cjk-kr, sans-serif;
    font-style: normal;
    font-size: 18px;
    border: 0px;
    border-radius: 5px;
    color: white;
    box-shadow: none;
    margin: 10px;
    width: 90px;
    height: 60px;
    background-color: #62bdfa;
    margin-top: 30px;
    cursor: pointer;
  }

  #Name {
    font-family: noto-sans-cjk-kr, sans-serif;
    font-style: normal;
    font-size: 18px;
    border: 0px;
    border-radius: 5px;
    color: white;
    box-shadow: none;
    margin: 10px;
    width: 90px;
    height: 60px;
    background-color: #62bdfa;
    margin-top: 30px;
    cursor: pointer;
  }
`;

const MailBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-flow: row nowrap;
  justify-content: space-around;
  background-color: fff;
  margin-left: 120px;
  border: 0px solid #c0c0c0;
  width: 500px;
  height: 80px;
  font-size: 16px;
  border-radius: 5px;
`

const Nickbox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-flow: row nowrap;
  justify-content: space-around;
  background-color: fff;
  margin-left: 120px;
  border: 0px solid #c0c0c0;
  width: 500px;
  height: 80px;
  font-size: 16px;
  border-radius: 5px;
`

export default Signup;
