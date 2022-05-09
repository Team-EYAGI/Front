import React from 'react';
import { Grid, Text } from '../elements/Index';
import { BsPerson } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../shared/Token";
import { actionCreators as searchActions } from "../redux/modules/search";


const Header = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  console.log(is_login)


  const is_session = localStorage.getItem("is_login");
  // const is_token = localStorage.getItem("token");
  const userName = localStorage.getItem("username");

  React.useEffect(() => {

  }, []);

  const [word, setWord] = React.useState("")

  return (
    <>
      {is_session ?
        <React.Fragment>
          <HeaderWrap>
            <LogoBox>
              <img
                onClick={() => { history.push('/') }}
                src='https://blog.kakaocdn.net/dn/SJmxC/btqxeJAzjZA/UgEHLHzJlq9TZBpo7hyi5k/img.jpg'
              />
            </LogoBox>
            <div>
              <BsPerson size="25px" style={{ margin: "0.26vw 0px 0px 0px" }} />
              <FiLogOut size="25px" style={{ margin: "0.26vw 0px 0px 1.04vw" }} />
            </div>
          </HeaderWrap>
          <BottomWrap>
            <BottomSt>
              <div id='list'>
                <li onClick={() => { history.push(`/book/자기계발`); }}>카테고리별 도서</li>
                <li onClick={() => { history.push('/funding') }}>오디오 펀딩</li>
                <li onClick={() => { history.push('/request') }}>오디오북 요청 모아보기</li>
                {/* <li>ㅇㅇㅇ</li> */}
              </div>
              <SearchWrap>
                <Search
                  onChange={(e) => {
                    setWord(e.target.value)
                  }}
                  placeholder="검색어를 입력해주세요."></Search>
                <SearchIcon
                  onClick={() => {
                    dispatch(searchActions.addSearchAC(word));
                  }} />
              </SearchWrap>
            </BottomSt>
          </BottomWrap>
        </React.Fragment>
        :
        <React.Fragment>
          <HeaderWrap>
            <LogoBox>
              <img
                onClick={() => { history.push('/') }}
                src='https://blog.kakaocdn.net/dn/SJmxC/btqxeJAzjZA/UgEHLHzJlq9TZBpo7hyi5k/img.jpg'
              />
            </LogoBox>
            <LoginBox
              onClick={() => {
                history.push(`/login`)
              }}
            >
              <span>로그인/회원가입</span>
            </LoginBox>
          </HeaderWrap>
          <BottomWrap>
            <BottomSt>
              <div id='list'>
                {/* <BsList size="25px" style={{ margin: "5px 20px 0px 20px" }} /> */}
                <li onClick={() => { history.push(`/book/자기계발`); }}>카테고리별 도서</li>
                <li onClick={() => { history.push('/funding') }}>오디오 펀딩</li>
                <li onClick={() => { history.push('/request') }}>오디오북 요청 모아보기</li>
                {/* <li>ㅇㅇㅇ</li> */}
              </div>
              <SearchWrap>
                <Search
                  onChange={(e) => {
                    setWord(e.target.value)
                  }}
                  placeholder="검색어를 입력해주세요."></Search>
                <SearchIcon
                  onClick={() => {
                    dispatch(searchActions.addSearchAC(word));
                  }} />
              </SearchWrap>
            </BottomSt>
          </BottomWrap>
        </React.Fragment>
      }
    </>
  )
}

const HeaderWrap = styled.div`
  /* background-color: lightblue; */
  max-width: 1440px;
  width: calc(100%-480px);

  height: 50px;
  
  position: relative;
  margin: 0 auto;
  padding: 0.83vw 13.02vw;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const BottomWrap = styled.div`
  /* background-color: yellow; */
  max-width: 1440px;
  /* width: 100%; */
  width: calc(100%-480px);

  height: 50px;
  
  position: relative;
  margin: 0 auto;
  padding: 0.3vw 13.02vw;

  border-radius: 20px;
  border-bottom: 1px solid black;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const LogoBox = styled.div`
  width: 10.4vw;
  height: 2.8vw;

  /* background-color: #393C3F; */
  color: white;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
  font-size: 0.94vw;
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
  span {
    text-align: center;
    margin-bottom: 3px;
  }
`

const LoginBox = styled.div`
  width: 8.54vw;
  height: 2.81vw;

  /* background-color: #393C3F; */
  color: white;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
  font-size: 0.94vw;
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  span {
    text-align: center;
    margin-bottom: 0.16vw;
  }
`

const BottomSt = styled.ul`
  max-width: 1440px;
  width: 100%;
  height: 50px;

  display: flex;
  /* align-items: center; */
  /* justify-content: space-between; */
  /* background-color: yellow; */

  padding: 0px;
  padding-bottom: 2px;
  
  position: relative;
  list-style-type: none;

  cursor: pointer;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;

  #list {
    width: 100%;
    /* background-color: red; */

    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    /* margin: 0px 20px; */
  }

  li {
    padding: 0.36vw 2.08vw 0vw 0vw;
    
    font-size: 1.30vw;
    font-weight: bold;
    color: #333;
    line-height: 1.04vw;

    cursor: pointer;
    :hover {
      color: purple;
    }
  }
`

const SearchWrap = styled.div`
  position: relative;
  font-family: Pretendard;
  /* background-color: red; */

  display: flex;
  justify-content: center;
  align-items: center;
`

const Search = styled.input`
  background-color: #f7f7f7;
  background-image: "https://res.kurly.com/pc/service/common/1908/ico_search_x2.png";

  box-sizing: border-box;
  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 10px;
  outline: none;

  width: 14.53vw;
  height: 2.50vw;
  padding: 0.00vw 1.56vw 0.00vw 0.73vw;
  margin-right: 1.04vw;

  color: #666;
  line-height: 0.83vw;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
  font-size: 0.63vw;
`

const SearchIcon = styled.div`
  background-image: url(https://res.kurly.com/pc/service/common/1908/ico_search_x2.png);
  background-size: 1.56vw;

  position: absolute;
  right: 1.56vw;
  top: 0.52vw;
  width: 1.56vw;
  height: 1.56vw;
`

export default Header;