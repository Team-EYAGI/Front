import React from 'react';
import { Grid, Text } from '../elements/Index';
import { BsPerson } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../shared/Token";
import { actionCreators as searchActions } from "../redux/modules/search";
import { actionCreators } from "../redux/modules/user";
// import logo from '../src_assets/eyagiLogo1.png'
import logo from '../src_assets/logo.svg';

const Header = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  console.log(is_login)


  const is_session = localStorage.getItem("is_login");
  const seller = localStorage.getItem("seller");
  // const is_token = localStorage.getItem("token");
  const userName = localStorage.getItem("username");

  React.useEffect(() => {

  }, []);

  const [word, setWord] = React.useState("")

  const handleEvent = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key !== "Enter") {
      return;
    }

    sendWord();
  };

  const sendWord = () => {
    if (word === "") {
      window.alert("검색어를 입력해주세요!")
    } else {
      dispatch(searchActions.addSearchAC(word));
    }
  }

  return (
    <React.Fragment>
      <HeaderWrap>
        <LogoBox>
          <img
            onClick={() => { history.push('/') }}
            src={logo}
          // src='https://blog.kakaocdn.net/dn/SJmxC/btqxeJAzjZA/UgEHLHzJlq9TZBpo7hyi5k/img.jpg'
          />
        </LogoBox>
        {is_session ?
          <div>
            {/* {seller === "ROLE_ADMIN" ? */}
              <RiAdminLine
                size="25px"
                style={{ margin: "5px 0px 0px 0px", cursor: "pointer" }}
                onClick={() => {
                  history.push(`/Admin`)
                }} />
              {/* : */}
              <BsPerson
                size="25px"
                style={{ margin: "5px 0px 0px 0px", cursor: "pointer" }}
                onClick={() => {
                  history.push(`/mypage/listen`)
                }} />
            {/* } */}
            <FiLogOut
              size="25px"
              style={{ margin: "5px 2px 0px 20px", cursor: "pointer" }}
              onClick={() => {
                dispatch(actionCreators.logOut());
              }}
            />
          </div>
          :
          <LoginBox
            onClick={() => {
              history.push(`/login`)
            }}
          >
            <span>로그인</span>
          </LoginBox>
        }
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
              onKeyDown={handleEvent}
              placeholder="검색어를 입력해주세요."></Search>
            <SearchIcon
              onClick={sendWord} />
          </SearchWrap>
        </BottomSt>
      </BottomWrap>
    </React.Fragment>
  )
}

const HeaderWrap = styled.div`
  width: 1200px;
  height: 60px;
  
  
  position: relative;
  margin: 20px auto -5px auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  #admin {
    background-color: yellow;
    margin: 0px 10px 0px 0px;
  }
`

const BottomWrap = styled.div`
  max-width: 1440px;
  width: calc(100%-480px);
  /* min-width: 1200px; */

  /* background-color: yellow; */
  height: 50px;
  
  position: relative;
  margin: 0px auto;
  padding: 0.3vw 13.02vw;

  border-radius: 20px;
  border-bottom: 1px solid black;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const LogoBox = styled.div`
  width: 200px;
  height: 60px;


  color: white;

  img {
    width: 190px;
    height: 60px;
    cursor: pointer;
  }
  span {
    text-align: center;
    margin-bottom: 3px;
  }
`

const LoginBox = styled.div`
  width: 110px;
  height: 40px;

  background: #0C0A0A;
  border-radius: 10px;
  color: white;

  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  span {
    text-align: center;
  }
`

const BottomSt = styled.ul`

  width: 1200px;
  height: 30px;

  display: flex;

  padding: 0px;
  padding-bottom: 2px;
  
  position: relative;
  list-style-type: none;

  cursor: pointer;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;

  #list {
    width: 1200px;

    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

  }

  li {

    padding: 5px 40px 0px 0px;
    
    font-size: 15px;
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

   display: flex;
   justify-content: center;
   align-items: center;
`;

const Search = styled.input`
  background-color: #FFFFFF;
  background-image: "https://res.kurly.com/pc/service/common/1908/ico_search_x2.png";
  box-sizing: border-box;
  border: 1px solid #000000;
  border-radius: 10px;
  outline: none;
  width: 279px;
  height: 48px;
  padding: 0 60px 0 14px;
  margin-bottom: 2px;
  margin-left: -31px;
  letter-spacing: -1px;
  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;

  font-size: 12px;
  color: #666;
  line-height: 16px;
`;

const SearchIcon = styled.div`
  background-image: url(https://res.kurly.com/pc/service/common/1908/ico_search_x2.png);
  background-size: 30px;
  position: absolute;
  right: 5px;
  top: -2px;
  width: 30px;
  height: 30px;
`;


export default Header;