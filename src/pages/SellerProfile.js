import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MyPageAudioBook from '../components/MyPageAudioBook';
import AudioPlayer from "react-h5-audio-player";

import { history } from '../redux/configureStore';
import { actionCreators as creatorActions } from "../redux/modules/creator";
import { actionCreators as followActions } from "../redux/modules/creator";
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SellerProfile = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const sellerId = params.sellerName;
  const category = params.category;

  // 셀러가 등록한 오디오북 가져오기
  const audioBookList = useSelector((state) => state.creator.creator_audiobook);

  // 셀러 프로필 정보 가져오기
  const profile = useSelector((state) => state.creator.creator_profile);
  const followStatus = profile.followStatus;
  const profileDetail = profile.sellerProfile
  const authority = localStorage.getItem("seller");
  const username = localStorage.getItem("username");
  console.log("profile", profile)


  // 셀러가 등록한 펀딩 정보 가져오기
  const fundingList = useSelector((state) => state.creator.creator_funding);
  const follower = useSelector((state) => state.creator.creator_follower);
  const following = useSelector((state) => state.creator.creator_following);

  // 팔로우, 팔로잉 모달창
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);


  // 플레이어 자동재생 막기
  const player = useRef();

  useEffect(() => {
    if (authority === "ROLE_SELLER") {
      player.current.audio.current.pause();  // -3-
    }
  }, [profile]);

  useEffect(() => {
    if (!authority) {
      dispatch(creatorActions.getProfileAC(sellerId));
    } else {
      dispatch(creatorActions.getProfileAC(sellerId, authority, username));
    }
  }, []);

  useEffect(() => {
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
            {!authority ?
              <>
                <ProfileBox>
                  <div id='img'>
                    <img src={profile.userImage ? profile.userImage : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTB2Sn%2FbtrB4PINn6v%2FpPKEkCp0WIdi5JI9NGvzrk%2Fimg.png"} />
                  </div>
                  <div id='username'>
                    <h4>{profile.userName}</h4>
                    <h5 onClick={() => {
                      dispatch(followActions.followingListAC(sellerId));
                      handleOpen();
                    }}>팔로잉 &nbsp;<span>{profile.followingCnt}명</span></h5>
                    <h5 onClick={() => {
                      dispatch(followActions.followerListAC(sellerId));
                      handleOpen2();
                    }}>팔로워 &nbsp;<span>{profile.followerCnt}명</span></h5>
                  </div>
                </ProfileBox>
                <ProfileBox>
                  <h3>
                    {profile.introduce}
                  </h3>
                </ProfileBox>
              </>
              :
              <>
                <ProfileBox>
                  <div id='img'>
                    <img src={profileDetail && profileDetail.userImage ? profileDetail.userImage : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTB2Sn%2FbtrB4PINn6v%2FpPKEkCp0WIdi5JI9NGvzrk%2Fimg.png"} />
                  </div>
                  <div id='username'>
                    <h4>{profileDetail && profileDetail.userName}</h4>
                    <h5 onClick={() => {
                      dispatch(followActions.followingListAC(sellerId));
                      handleOpen();
                    }}>팔로잉 &nbsp;<span>{profileDetail && profileDetail.followingCnt}명</span></h5>
                    <h5 onClick={() => {
                      dispatch(followActions.followerListAC(sellerId));
                      handleOpen2();
                    }}>팔로워 &nbsp;<span>{profileDetail && profileDetail.followerCnt}명</span></h5>
                  </div>
                </ProfileBox>
                <ProfileBox>
                  <h3>
                    {profileDetail && profileDetail.introduce}
                  </h3>
                </ProfileBox>
              </>
            }

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h2 style={{ width: "100%", textAlign: "center" }}>팔로워</h2>
                <BoxSt>
                  {following && following.map((item, idx) =>

                    <FollowerList key={idx}>
                      <div id='name'>
                        <ImageBox>
                          <img
                            style={{ width: "100%" }}
                            src={item.img ? item.img : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTB2Sn%2FbtrB4PINn6v%2FpPKEkCp0WIdi5JI9NGvzrk%2Fimg.png"}
                          />
                        </ImageBox>
                        <h3 style={{ fontSize: "16px" }}>
                          {item.name}
                        </h3>
                      </div>
                      {/* <button>팔로우 취소</button> */}
                    </FollowerList>
                  )}
                </BoxSt>
              </Box>
            </Modal>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h2 style={{ width: "100%", textAlign: "center" }}>팔로워</h2>
                <BoxSt>
                  {follower && follower.map((item, idx) =>
                    <FollowerList >
                      <div id='name'>
                        <ImageBox>
                          <img
                            style={{ width: "100%" }}
                            src={item.img ? item.img : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTB2Sn%2FbtrB4PINn6v%2FpPKEkCp0WIdi5JI9NGvzrk%2Fimg.png"}
                          />
                        </ImageBox>
                        <h3 style={{ fontSize: "16px" }}>
                          {item.name}
                        </h3>
                      </div>
                      {/* <button>unfollow</button> */}
                    </FollowerList>
                  )
                  }
                </BoxSt>
              </Box>
            </Modal>

            {authority ?
              <AudioPlayer
                className='audio'
                autoPlay={false}
                src={profileDetail && profileDetail.sellerVoice}
                volume={1}
                timeFormat={"mm:ss"}
                defaultCurrentTime={"00:00"}
                showJumpControls={false}
                ref={player}
                onPlay={e => console.log("onPlay")}
              />
              :
              <AudioPlayer
                className='audio'
                autoPlay={false}
                src={profile.sellerVoice}
                volume={1}
                timeFormat={"mm:ss"}
                defaultCurrentTime={"00:00"}
                showJumpControls={false}
                ref={player}
                onPlay={e => console.log("onPlay")}
              />
            }

            {authority &&
              (followStatus === false ?
                <button
                  id='follow'
                  onClick={() => {
                    dispatch(followActions.followAC(sellerId));
                  }}
                >
                  Follow
                </button>
                :
                <button
                  id='unfollow'
                  onClick={() => {
                    dispatch(followActions.followAC(sellerId));
                  }}
                >
                  unFollow
                </button>
              )
            }


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

const FollowerList = styled.div`
  width: 90%;
  height: 60px;
  margin: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border: 1px solid #000000;
  border-radius: 5px;

  #name {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-left: 10px;

    h3 {
      margin-left: 15px;
    }
  }

  button {
    border: none;
    background: none;
    color: #000000;
    margin-right: 10px;

    :hover {
      cursor: pointer;
      color: #D05943;
    }
  }
`

const BoxSt = styled.div`
  height: 400px;

  overflow-y: scroll;
    ::-webkit-scrollbar {
     /* 세로 스크롤 넓이 */  
      width: 7px;
      
      border-radius: 6px;
      background: #FFFFFC;
      border: 1px solid #000000;
    }
    ::-webkit-scrollbar-thumb {
      height: 17%;
      background-color: #000000;
      border-radius: 6px;
    }
`

const ImageBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100px;

  overflow: hidden;
  border: 1px solid #878787;

  img {
    width:100%;
    height:100%;
    object-fit:cover;
  }
`


const AudioReviewNone = styled.div`
  width: 100%;
  min-height: 200px;

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
  position: relative;
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
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 10px;
  padding-bottom: 30px;
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
  padding-bottom: 30px;

`

const Profile = styled.div`
  width: 290px;
  min-height: 220px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .audio {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    background: none;
    margin-bottom: 20px;

    .rhap_progress-indicator {
      background: #0C0A0A;;

    }
  
    .rhap_volume-indicator {
      background: #0C0A0A;;

    }
    div {
      color : black;
    }

    div.rhap_progress-filled {
      background-color : #0C0A0A;;

    }

    button {
      color : #0C0A0A;;

    }
  }

  #follow {
    width: 290px;
    height: 48px;

    border-radius: 10px;
    background-color: #0C0A0A;

    color: #FFFFFF;

    font-weight: 400;
    font-size: 14px;

    cursor: pointer;
  }

  #unfollow {
    width: 290px;
    height: 48px;

    border-radius: 10px;
    background-color: #FFFFFF;
    color: #0C0A0A;
    font-weight: 400;
    font-size: 14px;

    cursor: pointer;
  }

  #creatorform {
    width: 100%;
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

const ProfileBox = styled.div`
  width: 290px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0px;

  #img {
    width: 100px;
    height: 100px;

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

    h4 {
      font-weight: 700;
      font-size: 22px;
      margin: 0px 0px 10px 0px;
    }

    h5 {
      font-weight: 300;
      font-size: 13px;
      margin: 2px 0px 0px 0px;

      :hover {
        color: #D05943;
        cursor: pointer;
      }

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
width: 290px;
  height: 300px;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const ListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0px;

  h3 {
    margin: 8px 0px;
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    color: #525252;
  }
  
`

export default SellerProfile;