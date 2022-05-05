import React from 'react';
import { Grid, Text } from '../elements/Index';
import { BsList } from "react-icons/bs";
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
          <Grid position="relative" margin="auto" width="1920px" is_flex padding="16px">
            <Grid width="200px" is_center>
              {/* 텍스트 커서 효과주기 */}
              <Text onClick={() => { history.push('/') }} bold size="40px" margin="0px">EYAGI</Text>
            </Grid>
            <Grid position="relative" width="200px" margin="0px" padding="0px">
              <Grid is_center>
                {/* <Text
              size="20px"
              onClick={() => {history.push('/signup')}}
              >회원가입</Text> */}
                <Text
                  size="20px"
                  margin="0px 10px 0px 0px"
                  onClick={() => {
                    history.push(`/mypage/main`)
                  }}
                > {userName}님</Text>
                {/* <Text margin="0px">로그아웃</Text> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid position="relative" margin="auto" bg="lightgray" is_center width="100%">
            <BottomSt>
              <Grid width="100%" is_left margin="0px 20px">
                {/* <BsList size="25px" style={{ margin: "5px 20px 0px 20px" }} /> */}
                <li onClick={() => { history.push(`/book/자기계발`); }}>카테고리별 도서</li>
                <li onClick={() => { history.push('/funding') }}>오디오 펀딩</li>
                <li onClick={() => { history.push('/request') }}>오디오북 요청 모아보기</li>
                {/* <li>ㅇㅇㅇ</li> */}
              </Grid>
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
          </Grid>
        </React.Fragment>
        :
        <React.Fragment>
          <Grid position="relative" margin="auto" width="1920px" is_flex padding="16px">
            <Grid width="200px" is_center>
              {/* 텍스트 커서 효과주기 */}
              <Text onClick={() => { history.push('/') }} bold size="40px" margin="0px">EYAGI</Text>
            </Grid>
            <Grid position="relative" width="200px" margin="0px" padding="0px">
              <Grid is_center>
                <Text
                  size="20px"
                  margin="0px 10px 0px 0px"
                  onClick={() => { history.push('/login') }}
                >로그인 / 회원가입</Text>
                {/* <Text margin="0px">로그아웃</Text> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid position="relative" margin="auto" bg="lightgray" is_center width="100%">
            <BottomSt>
              <Grid width="1000px" is_left margin="0px 20px">
                {/* <BsList size="25px" style={{ margin: "5px 20px 0px 20px" }} /> */}
                <li onClick={() => { history.push(`/book/자기계발`); }}>카테고리별 도서</li>
                <li onClick={() => { history.push('/funding') }}>오디오 펀딩</li>
                <li onClick={() => { history.push('/request') }}>오디오북 요청 모아보기</li>
                {/* <li>ㅇㅇㅇ</li> */}
              </Grid>
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
          </Grid>
        </React.Fragment>
      }
    </>
  )
}

const BottomSt = styled.ul`
  width: 1920px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: yellow; */

  padding: 0px;
  padding-bottom: 2px;
  height: 33px;
  
  position: relative;
  list-style-type: none;

  cursor: pointer;
  font-family: Pretendard;
  /* font-family: noto-sans-cjk-kr, sans-serif; */
  font-weight: 400;
  font-style: normal;

  li {
    padding: 7px 40px 0px 0px;
    
    font-size: 25px;
    font-weight: bold;
    color: #333;
    line-height: 20px;

    cursor: pointer;
    :hover {
      color: purple;
    }
  }
`

const SearchWrap = styled.div`
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
`

const Search = styled.input`
  background-color: #f7f7f7;
  background-image: "https://res.kurly.com/pc/service/common/1908/ico_search_x2.png";

  box-sizing: border-box;
  border: 1px solid #f7f7f7;
  border-radius: 50px;
  outline: none;

  width: 400px;
  height: 40px;
  padding: 0px 30px 0px 14px;
  margin-bottom: 2px;
  margin-right: 20px;
  /* margin-left: -31px; */

  letter-spacing: -1px;
  font-weight: 400;
  font-size: 12px;
  color: #666;
  line-height: 16px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const SearchIcon = styled.div`
  background-image: url(https://res.kurly.com/pc/service/common/1908/ico_search_x2.png);
  background-size: 30px;

  position: absolute;
  right: 30px;
  top: 3px;
  width: 30px;
  height: 30px;
`

export default Header;