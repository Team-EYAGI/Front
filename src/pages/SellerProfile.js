import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { actionCreators as libraryActions } from "../redux/modules/mypage";

import MyPageAudioBook from '../components/MyPageAudioBook';
import { useDispatch, useSelector } from 'react-redux';

const SellerProfile = () => {
  const dispatch = useDispatch();

  const params = useParams();
  console.log(params)

  const category = params.category;

  const likeBook = useSelector((state) => state.mypage.library_likeBook);
  console.log(likeBook)

  const profile = useSelector((state) => state.mypage.profile);
  console.log(profile)

  const listenAudio = useSelector((state) => state.mypage.library_listenAudio);
  console.log(listenAudio)
  
  // const userImage = useSelector((state) => state.mypage.userImage);
  // console.log(userImage)

  const seller = localStorage.getItem("seller");

  useEffect(() => {
    dispatch(libraryActions.getLikeBookAC());
    dispatch(libraryActions.getProfileAC());
    dispatch(libraryActions.getListenAudioAC());
  }, []);


  return (
    <React.Fragment>
      <Wrap>
        <Menu>
          <Profile>
            <Box>
              <div id='img'>
                <img src={profile.userImage ? profile.userImage : null } />
              </div>
              <div id='username'>
                <h4>{profile.userName}</h4>
                <h5>팔로잉 &nbsp;<span>1,529명</span></h5>
                <h5>팔로워 &nbsp;<span>93명</span></h5>
              </div>
            </Box>
            <Box>
              <h3>
                {profile.introduce}
              </h3>
            </Box>
            <button
              onClick={() => {
                history.push(`/profileEdit`)
              }}
            >
              프로필 편집
            </button>
            {seller !== "ROLE_SELLER" ?
              <span id='creatorform'>크리에이터 신청하기</span>
              :
              null
            }
          </Profile>
          <List>

              <ListBox>
                <h2>| 크리에이터</h2>
                <h3
                  style={{ textDecoration: (category === "Audiobook" ? "underline" : null) }}
                  onClick={() => { history.push(`/sellerProfile/{sellerName}/Audiobook`) }}>업로드한 오디오북
                </h3>
                <h3
                  style={{ textDecoration: (category === "Funding" ? "underline" : null) }}
                  onClick={() => { history.push(`/sellerProfile/{sellerName}/Funding`) }}>등록한 펀딩
                </h3>
              </ListBox>
              </List>
        </Menu>
        <Body>
          {category === "Audiobook" ?
            <div>아직 등록된 오디오북이 없습니다!</div>
            :
            category === "Funding" ?
              <div>아직 등록된 펀딩이 없습니다!</div>
              :
                  null
          }
        </Body>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  width: 1200px;
  min-height: 700px;
  margin: 0 auto;
  margin-top: 36px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  position: relative;
  /* background-color: lightblue; */
  padding-top: 30px;
  padding-bottom: 30px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Menu = styled.div`
  width: 300px;
  /* margin: 0 auto; */
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* background-color: white; */
  position: relative;
  
  border-radius: 10px;

  padding-bottom: 30px;

  font-family: 'Pretendard';
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
  width: 800px;
  height: 700px;

  overflow-y: scroll;
    ::-webkit-scrollbar {
     /* 세로 스크롤 넓이 */  
      width: 10px;

      /* 가로 스크롤 높이 */
      height: 8px;

      border-radius: 6px;
      background: black;
      background: rgba(255, 255, 255, 0.4);
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
    }


  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  position: relative;
  /* background-color: yellow; */
  padding-bottom: 30px;

`

const Profile = styled.div`
  width: 300px;
  min-height: 220px;

  /* background-color: purple; */
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 300px;
    height: 48px;

    /* box-sizing: border-box; */
    border-radius: 10px;
    background-color: #0C0A0A;;

    color: #FFFFFF;

    font-weight: 400;
    font-size: 14px;

    cursor: pointer;
  }

  #creatorform {
    width: 100%;
    /* background-color: yellow; */
    margin-top: 13px;

    font-weight: 300;
    font-size: 14px;
    line-height: 100%;
    text-decoration-line: underline;

    color: #0C0A0A;

    :hover {
      color: purple;
      cursor: pointer;
    }
  }
`

const Box = styled.div`

/* background-color: yellow; */
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  margin: 5px 0px;

  

  #img {
    width: 108px;
    height: 108px;
    /* margin-top: 40px; */

    border-radius: 15px;
    border: 1px solid black;
    overflow: hidden;

    img {
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }

  #username {
    width: 59%;
    /* margin-top: 40px; */

    h4 {
      font-weight: 700;
      font-size: 24px;
      margin: 0px 0px 10px 0px;
    }

    h5 {
      font-weight: 300;
      font-size: 14px;
      margin: 2px 0px 0px 0px;

      span {
        font-weight: 500;
      }
    }
  }


  h3 {
    width: 100%;
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;

    text-align: justify;

    color: #0C0A0A;
  }
`

const List = styled.div`
  width: 300px;
  height: 300px;

  /* background-color: yellow; */
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* border: 1px solid #EAEAEA; */
  /* border-radius: 10px; */
`

const ListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin: 10px 0px;

  /* background-color: red; */

  h3 {
    margin: 8px 0px;
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    color: #525252;
  }
  
`

export default SellerProfile;