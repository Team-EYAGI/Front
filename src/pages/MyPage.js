import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

import MyPageAudioBook from '../components/MyPageAudioBook';

const MyPage = () => {

  const params = useParams();
  console.log(params)

  const category = params.category;

  const seller = localStorage.getItem("seller");

  return (
    <React.Fragment>
      <Wrap>
        <Menu>
          <Profile>
            <Box>
              <div id='img'>
                <img src='https://www.incheon.go.kr/humanframe/theme/incheon/assets/image/incheon04/img-0107-02.png'/>
              </div>
              <div id='username'>
                <h4>닉네임</h4>
                <h5>hello@naver.com</h5>
              </div>
            </Box>
            <Box>
              <h3>팔로잉 9,999명</h3>
              <h3>팔로워 9,999명</h3>
            </Box>
            <button>프로필 편집</button>
          </Profile>
          <List>
            {seller === "ROLE_SELLER" ?
              <ListBox>
              <h2>크리에이터</h2>
              <h3 onClick={() => {history.push(`/mypage/myAudio`)}}>업로드한 오디오북</h3>
              <h3 onClick={() => {history.push(`/mypage/myFunding`)}}>등록한 펀딩</h3>
            </ListBox>
            :
            null
            }
            <ListBox>
              <h2>서재</h2>
              <h3 onClick={() => {history.push(`/mypage/listen`)}}>듣고 있는 오디오북</h3>
              <h3 onClick={() => {history.push(`/mypage/likeAudio`)}}>책 바구니</h3>
            </ListBox>
          </List>
          <button id='submit'>크리에이터 신청하기</button>
        </Menu>
        <Body>
          {category === "myAudio" ?
          <MyPageAudioBook/>
          :
          category === "myFunding" ?
          <div>Funding</div>
          :
          category === "listen" ?
          <div>listen</div>
          :
          category === "likeAudio" ?
          <div>likeAudio</div>
          :
          <div>이게기본</div>
          }
        </Body>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  width: 1440px;
  margin: 0 auto;
  margin-top: 36px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  position: relative;
  background-color: lightblue;
  padding-top: 30px;
  padding-bottom: 30px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Menu = styled.div`
  width: 342px;
  /* margin: 0 auto; */
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  background-color: white;
  position: relative;
  
  border-radius: 10px;

  padding-bottom: 30px;

  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;

  #submit {
    margin-top: 5px;
    width: 342px;
    height: 48px;

    background-color: #FAFAFA;

    border: 1px solid #EAEAEA;
    border-radius: 10px;
    font-size: 16px;

    cursor: pointer;
  }
`

const Body = styled.div`
  width: 952px;

  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  position: relative;
  background-color: yellow;
  padding-bottom: 30px;

`

const Profile = styled.div`
  width: 342px;
  height: 271px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid #EAEAEA;
  border-radius: 10px;

  button {
    width: 300px;
    height: 45px;
    border: 1px solid #EAEAEA;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #FFFFFF;

    font-size: 14px;

    cursor: pointer;
  }
`

const Box = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;

  #img {
    width: 77px;
    height: 77px;
    margin-top: 40px;

    border-radius: 50px;
    overflow: hidden;

    img {
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }

  #username {
    width: 65%;
    margin-top: 40px;

    h4 {
      font-size: 25px;
      margin: 0px;
    }

    h5 {
      font-size: 14px;
      margin: 2px 0px 0px 0px;
    }
  }


  h3 {
    width: 45%;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }
`

const List = styled.div`
  width: 342px;
  height: 350px;

  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid #EAEAEA;
  border-radius: 10px;
`

const ListBox = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;

  margin: 10px 0px;

  /* background-color: red; */

  h3 {
    margin: 8px 0px;
    cursor: pointer;
  }
  
`

export default MyPage;