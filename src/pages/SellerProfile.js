import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MyPageAudioBook from '../components/MyPageAudioBook';

import { history } from '../redux/configureStore';
import { actionCreators as creatorActions } from "../redux/modules/creator";
import { useDispatch, useSelector } from 'react-redux';

const SellerProfile = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const sellerId = params.sellerName;
  const category = params.category;

  // 셀러가 등록한 오디오북 가져오기
  const audioBookList = useSelector((state) => state.creator.creator_audiobook);

  // 셀러 프로필 정보 가져오기
  const profile = useSelector((state) => state.creator.creator_profile);
  
  // 셀러가 등록한 펀딩 정보 가져오기
  const fundingList = useSelector((state) => state.creator.creator_funding);
  console.log(fundingList)

  // 권한이 무엇인지
  const authority = localStorage.getItem("seller");

  useEffect(() => {
    dispatch(creatorActions.getProfileAC(sellerId));

    if (category === "audiobook") {
      dispatch(creatorActions.getAudioAC(sellerId));
    } else {
      dispatch(creatorActions.getFundingAC(sellerId));
    }
  }, []);

  return (
    <React.Fragment>
      <Wrap>
        <Menu>
          <Profile>
            <Box>
              <div id='img'>
                <img src={profile.userImage ? profile.userImage : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTB2Sn%2FbtrB4PINn6v%2FpPKEkCp0WIdi5JI9NGvzrk%2Fimg.png"} />
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
                // history.push(`/profileEdit`)
              }}
            >
              팔로우
            </button>
          </Profile>
          <List>
            <ListBox>
              <h2>| 크리에이터</h2>
              <h3
                style={{ textDecoration: (category === "audiobook" ? "underline" : null) }}
                onClick={() => {
                  history.push(`/sellerProfile/${sellerId}/audiobook`)
                  dispatch(creatorActions.getAudioAC(sellerId));
                }}>
                업로드한 오디오북
              </h3>
              <h3
                style={{ textDecoration: (category === "funding" ? "underline" : null) }}
                onClick={() => {
                  history.push(`/sellerProfile/${sellerId}/funding`)
                  dispatch(creatorActions.getFundingAC(sellerId));
                }}>
                등록한 펀딩
              </h3>
            </ListBox>
          </List>

        </Menu>
        <div>
          {
            category === "funding" && fundingList ?
              <span>총 {fundingList.length}개</span>
              :
              category === "audiobook" && audioBookList ?
                <span>총 {audioBookList.length}개</span>
                :
                null
          }

          {
            (category === "audiobook") && (audioBookList && audioBookList.length === 0) ?
              <AudioReviewNone>
                아직 크리에이터가 오디오북을 등록하지 않았습니다!
              </AudioReviewNone>
              :
              (category === "funding") && (fundingList && fundingList.length === 0) ?
                <AudioReviewNone>
                  아직 크리에이터가 펀딩을 진행하지 않았습니다!
                </AudioReviewNone>
                :
                null
          }
          <Body>

            {category === "funding" ? fundingList.map((item, idx) => (
              <MyPageAudioBook key={idx} item={item} />
            ))
              :
              category === "audiobook" ? audioBookList.map((item, idx) => (
                <MyPageAudioBook key={idx} item={item} />
              ))
                :
                null
            }
          </Body>
        </div>
      </Wrap>
    </React.Fragment>
  )
}

const AudioReviewNone = styled.div`
  width: 100%;
  min-height: 200px;
  

  /* background-color: purple; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const Wrap = styled.div`
  width: 1100px;
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
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;

  #num {
    font-size: 16px;
    margin: 0px 0px 5px 8px;
  }
`

const Menu = styled.div`
  width: 290px;
  /* margin: 0 auto; */
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* background-color: white; */
  position: relative;
  
  border-radius: 10px;

  padding-bottom: 30px;

  /* font-family: 'Pretendard';
  font-style: normal; */
`

const Body = styled.div`
  width: 750px;
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
  /* position: relative; */
  /* background-color: yellow; */
  padding-bottom: 30px;

`

const Profile = styled.div`
  width: 290px;
  min-height: 220px;

  /* background-color: purple; */
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 290px;
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
  width: 290px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  margin: 5px 0px;

  

  #img {
    width: 100px;
    height: 100px;
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
      font-size: 22px;
      margin: 0px 0px 10px 0px;
    }

    h5 {
      font-weight: 300;
      font-size: 13px;
      margin: 2px 0px 0px 0px;

      span {
        font-weight: 500;
      }
    }
  }


  h3 {
    width: 100%;
    /* min-height: 10px; */
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;

    text-align: justify;

    color: #0C0A0A;
  }
`

const List = styled.div`
width: 290px;
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