import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const [email, setId] = useState("");
  const [password, setPwd] = useState("");

  const login = () => {
    dispatch(userActions.loginDB(email, password)); //유저네임? 이메일?
  };

  return (
    <React.Fragment>
      <LoginContainer>
        <form>
          <center>
            <h3>로그인</h3>
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
              <button id="loginbtn"
                onClick={login}
                type="button"
                // onClick={()=>{ history.push('/main')}} 
              >
                로그인
              </button>
              </div>            
            <hr></hr>
            <p>다른 방법으로 로그인</p>
            <button id="kakaobtn"
              onClick={login}
              type="button"
              
            >
              카카오로 로그인
            </button>
            <button id="naverbtn"
              onClick={login}
              type="button"
            >
              어쩌구로 로그인
            </button>
            <hr />
            <button id="signupbtn"
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
  border-radius: 5px;
  padding: 0px 50px 10px 37px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-style: normal;

  button {
    font-family: noto-sans-cjk-kr, sans-serif;
    font-style: normal;
    font-size: 18px;
    border: 0px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }

  #buttonBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 15px;
    padding-top: 15px;
  }

    
  #loginbtn{    
    margin-left: 70px;
    box-shadow: none;
    width: 157px;
    height: 118px;
    background-color: #62bdfa;
    margin-top: 10px;
  }
  
  #kakaobtn {    
    box-shadow: none;         
    border: 0px;
    width: 464px;           
    height: 60px;
    background-color: #FAE100;  
    margin-top: 5px;
  }

  #naverbtn {    
    box-shadow: none;   
    width: 464px;           
    height: 60px;
    background-color: #19ce60;
    margin-top: 5px;
  }

  #signupbtn {    
    box-shadow: none;       
    width: 464px;           
    height: 60px;
    background-color: #62bdfa;       
    margin-top: 5px;
  }
`;

const LoginBox = styled.div`
  border-radius: 5px;
  width: 250px;
  


  #box {
    input {
      border: 1px solid #c0c0c0;
      border-radius: 5px;
      width: 298px;
      height: 48px;
      margin-top: 10px;
      padding-top: 5px;
      margin-right: 20px;
    }
  }
`;


export default Login;