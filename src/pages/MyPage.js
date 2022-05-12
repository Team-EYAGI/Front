import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { actionCreators as libraryActions } from "../redux/modules/mypage";

import MyPageAudioBook from '../components/MyPageAudioBook';
import { useDispatch, useSelector } from 'react-redux';

const MyPage = () => {
  const dispatch = useDispatch();

  const params = useParams();
  // console.log(params)

  const category = params.category;

  const likeBook = useSelector((state) => state.mypage.library_likeBook);
  // console.log(likeBook)

  const profile = useSelector((state) => state.mypage.profile);
  console.log(profile)

  const listenAudio = useSelector((state) => state.mypage.library_listenAudio);
  // console.log(listenAudio)

  const myFunding = useSelector((state) => state.mypage.library_registerFunding);
  // console.log(myFunding)

  const myAudio = useSelector((state) => state.mypage.library_registerAudioBook);
  // console.log(myFunding)

  // const userImage = useSelector((state) => state.mypage.userImage);
  // console.log(userImage)

  const seller = localStorage.getItem("seller");

  useEffect(() => {
    dispatch(libraryActions.getProfileAC());

    if (category === "likeBook") {
      dispatch(libraryActions.getLikeBookAC());
    } else if (category === "listen") {
      dispatch(libraryActions.getListenAudioAC());
    } else if (category === "myAudio") {
      dispatch(libraryActions.getRegisterAudioBookAC());
    } else {
      dispatch(libraryActions.getRegisterFundingAC());
    }
  }, []);


  return (
    <React.Fragment>
      <Wrap>
        <Menu>
          <Profile>
            <Box>
              <div id='img'>
                <img src={profile.userImage ? profile.userImage : null} />
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
              <span id='creatorform'>내 목소리 등록하기</span>
            }
          </Profile>
          <List>
            {seller === "ROLE_SELLER" ?
              <ListBox>
                <h2>| 크리에이터</h2>
                <h3
                  style={{ textDecoration: (category === "myAudio" ? "underline" : null) }}
                  onClick={() => {
                    history.push(`/mypage/myAudio`)
                    dispatch(libraryActions.getRegisterAudioBookAC());
                  }}>업로드한 오디오북
                </h3>
                <h3
                  style={{ textDecoration: (category === "myFunding" ? "underline" : null) }}
                  onClick={() => {
                    history.push(`/mypage/myFunding`)
                    dispatch(libraryActions.getRegisterFundingAC());
                  }}>등록한 펀딩
                </h3>
              </ListBox>
              :
              null
            }
            <ListBox>
              <h2>| 서재</h2>
              <h3
                style={{ textDecoration: (category === "listen" ? "underline" : null) }}
                onClick={() => {
                  history.push(`/mypage/listen`)
                  dispatch(libraryActions.getListenAudioAC());
                }}>듣고 있는 오디오북
              </h3>
              <h3
                style={{ textDecoration: (category === "likeBook" ? "underline" : null) }}
                onClick={() => {
                  history.push(`/mypage/likeBook`)
                  dispatch(libraryActions.getLikeBookAC());
                }}>찜한 책
              </h3>
            </ListBox>
          </List>

        </Menu>
        <div>
          {
            category === "myAudio" && myAudio ?
              <span>총 {myAudio.length}개</span>
              :
              category === "myFunding" && myFunding ?
                <span>총 {myFunding.length}개</span>
                :
                category === "listen" && listenAudio ?
                  <span id='num'>총 {listenAudio.length}개</span>
                  :
                  category === "likeBook" && likeBook ?
                    <span id='num'>총 {likeBook.length}개</span>
                    :
                    null
          }

          {
            (category === "myAudio") && (myAudio && myAudio.length === 0) ?
              <AudioReviewNone>
                아직 등록한 오디오북이 없네요! 오디오북을 등록해볼까요?
              </AudioReviewNone>
              :
              (category === "myFunding") && (myFunding && myFunding.length === 0) ?
                <AudioReviewNone>
                  아직 펀딩을 시도하지 않았어요! 펀딩을 시작해볼까요?
                </AudioReviewNone>
                :
                (category === "listen") && (listenAudio && listenAudio.length === 0) ?
                  <AudioReviewNone>
                    아직 듣고 있는 오디오북이 없어요! 들으러 가볼까요?
                  </AudioReviewNone>
                  :
                  (category === "likeBook") && (likeBook && likeBook.length === 0) ?
                    <AudioReviewNone>
                      아직 찜한 책이 없어요! 책을 둘러보러 가볼까요?
                    </AudioReviewNone>
                    :
                    null
          }
          <Body>

            {category === "myAudio" ? myAudio.map((item, idx) => (
              <MyPageAudioBook key={idx} item={item} />
            ))
              :
              category === "myFunding" ? myFunding.map((item, idx) => (
                <MyPageAudioBook key={idx} item={item} />
              ))
                :
                category === "listen" ? listenAudio.map((item, idx) => (
                  <MyPageAudioBook key={idx} item={item} />
                ))
                  :
                  category === "likeBook" ? likeBook.map((item, idx) => (
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

const SellerImg = styled.div`
  width: 130px;
  height: 130px;
  
  border-radius: 15px;
  border: 1px solid #878787;
  
  cursor: pointer;
  

  overflow: hidden;

img {
  width:100%;
  height:100%;
  object-fit:cover;
}
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
      width: 7px;
      height: 100%;
      
      border-radius: 6px;
      /* background: #FFFFFC; */
      /* border: 1px solid #000000; */
    }
    ::-webkit-scrollbar-thumb {
      height: 17%;
      background-color: #000000;
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

export default MyPage;