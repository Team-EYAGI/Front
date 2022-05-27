import React, { useEffect } from 'react';
import styled from 'styled-components';
import AudioReview from '../components/AudioReview';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Pagination from '../shared/Pagination';

import { BsFillPlayFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/audio";
import { actionCreators as followActions } from "../redux/modules/audio";
import { history } from '../redux/configureStore';


const AudioPlay = (props) => {

  const dispatch = useDispatch();

  const params = useParams();
  const bookId = params.bookId
  const audioBookId = params.audioBookId
  const category = params.category

  // 오디오북 재생목록 불러오기
  const audioDetail = useSelector((state) => state.audio.audio_list);
  const followStatus = audioDetail.followStatus;
  const audioBookDetail = audioDetail.audioBookDetail ? audioDetail.audioBookDetail : null;
  const playList = audioDetail.audioBookDetail ? audioBookDetail.audioFileDtoList : null;
  const sellerId = audioDetail.audioBookDetail ? audioDetail.audioBookDetail.sellerId : null;
  const authority = localStorage.getItem("seller");
  const username = localStorage.getItem("username");
  const sellerName = audioBookDetail?.sellerName;

  // 오디오북 리뷰 불러오기
  const audioReview = useSelector((state) => state.audio.review_list);
  const totalPages = useSelector((state) => state.audio.totalPages);

  // 플레이리스트 상태변경
  const [play, setPlay] = React.useState("");
  const [page, setPage] = React.useState(1)

  useEffect(() => {
    dispatch(getActions.getAudioAC(audioBookId));
    return () => {
      dispatch(getActions.cleanAudio());
    }
  }, []);

  useEffect(() => {
    dispatch(getActions.getReviewAC(audioBookId, page));
  }, [page]);

  // 권한이 없는 사용자는 페이지 접근 불가
  useEffect(() => {
    if (!authority) {
      history.push("/login")
    }
  }, []);

  return (
    <React.Fragment>
      <Wrap>
        <Player>
          <Header>
            <div>
              {audioBookDetail?.title}
            </div>
            <span>
              저자: {audioBookDetail?.author} / 크리에이터: {audioBookDetail?.sellerName}
            </span>
          </Header>

          <ImgBox style={{ backgroundImage: `url(${audioBookDetail?.bookImg})` }}>
            <div id='img_wrap'>
              <div id='img'>
                <img
                  alt="책 이미지"
                  src={audioBookDetail?.bookImg} />
              </div>
              <AudioPlayer
                showJumpControls={false}
                className='audio'
                autoPlay={false}
                src={play}
                volume={1}
                // onPlay={e => console.log("onPlay")}
              />
            </div>
          </ImgBox>
          <div id='name'>
            <span id='creatorname'>{audioBookDetail?.sellerName}</span>&nbsp;&nbsp;
            <span id='fixname'>크리에이터</span>
          </div>
          <AudioCard>
            <SellerImg>
              <img
                onClick={() => {
                  history.push(`/sellerProfile/${sellerId}/audiobook`)
                }}
                alt="크리에이터 이미지"
                src={audioBookDetail?.sellerImage ? audioBookDetail?.sellerImage : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTB2Sn%2FbtrB4PINn6v%2FpPKEkCp0WIdi5JI9NGvzrk%2Fimg.png"}
              />
            </SellerImg>
            <Content>
              <div id='follow'>
                <div>팔로잉&nbsp;{audioBookDetail?.followingCnt}  팔로워&nbsp;{audioBookDetail?.followerCnt} </div>
                {followStatus === false && sellerName !== username ?
                  <button
                    style={{
                      color: "#FFFFFF",
                      background: "#0C0A0A",
                      border: "1px solid #0C0A0A"
                    }}
                    onClick={() => {
                      if (username === audioBookDetail?.sellerName) {
                        return;
                      }
                      dispatch(followActions.audiofollowAC(sellerId));
                    }}
                  >follow</button>
                  :
                  followStatus === true && sellerName !== username ?
                    <button
                      style={{
                        color: "#0C0A0A",
                        background: "#FFFFFF",
                        border: "1px solid #0C0A0A"
                      }}
                      onClick={() => {
                        if (username === audioBookDetail?.sellerName) {
                          return;
                        }
                        dispatch(followActions.audiofollowAC(sellerId));
                      }}
                    >unfollow</button>
                    :
                    null
                }
              </div>
              <span id='contents'>
                {audioBookDetail?.audioInfo}
              </span>
            </Content>
          </AudioCard>
        </Player>
        <ListBox>
          <div id='listname'>
            <h3>목차</h3>&nbsp;&nbsp;
            <span>2개 챕터</span>
          </div>
          <div id='playbox'>
            {/* 플레이리스트 목록 map */}
            {playList && playList.map((item, idx) => (
              <div key={idx} id='list'>
                {authority === "ROLE_ADMIN" &&
                  <button
                    onClick={() => {
                      dispatch(getActions.deleteAudioAC(item.id));
                    }}
                  >X</button>
                }
                <h4>{idx + 1}. Chapter{idx + 1}</h4>
                <PlayerSt onClick={() => {
                  setPlay(`${item.s3FileName}`)
                }}>
                  <BsFillPlayFill id='playbtn' />
                </PlayerSt>
              </div>
            ))}
          </div>
        </ListBox>
      </Wrap>
      <ReviewBox>
        <div id='reviewbox'>
          <div id='reviewHeader'>
            <h3>후기</h3>
            <h4>{audioReview.length}개</h4>
          </div>
          <span
            onClick={() => {
              history.push(`/reviewWrite/${category}/${bookId}/${audioBookId}`)
            }}
          >후기 작성하기</span>
        </div>
        {audioReview.length === 0 ?
          <AudioReviewNone>
            후기가 없어요! 후기를 등록해주세요!
          </AudioReviewNone>
          :
          null
        }
        <div id='reviewcard'>
          {audioReview && audioReview.map((item, idx) =>
            <AudioReview item={item} key={idx} />
          )}
        </div>
      </ReviewBox>
      <Pagination totalPages={totalPages} setPage={setPage} />
    </React.Fragment>
  )
}



const Wrap = styled.div`
    width: 1100px;
    margin: 0 auto;
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    #name {
      width: 464px;
      height: 24px;
      margin-top: 44px;
      margin-bottom: 25px;

      #creatorname {
        font-weight: 700;
        font-size: 24px;
      }

      #fixname {
        font-weight: 300;
        font-size: 18px;
        color: #707070;
      }
    }
  `

const Header = styled.div`
    width: 450px;
    height: 56px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 81px;
    margin-bottom: 26px;

    div {
      font-weight: 700;
      font-size: 24px;
      margin-bottom: 16px;
    }

    span {
      font-weight: 400;
      font-size: 16px;
    }
  `

const Player = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;
    
    #creator {
      width: 464px;
      height: 227px;
      background-color: #F4F4F4;
      border-radius: 15px;
    }

    /* 오디오 플레이어 커스텀 */
    .audio {
      width: 100%;
      height: 80px;
      border-radius: 20px;
      background: none;
      box-shadow: none;

      .rhap_progress-indicator {
        background: #ffffff;
      }

      .rhap_volume-indicator {
        background: #ffffff;
      }

      div {
        background : "white";
        color : white;
      }

      div.rhap_progress-filled {
        background-color : white;
      }

      button {
        color : white;
      }
    }

`
const ImgBox = styled.div`
  width: 450px;
  height: 450px;

  background-repeat : no-repeat;
  background-size : cover;
  border-radius: 20px;

  #img_wrap {
    width: 450px;
    height: 450px;

    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 20px;

    #img {
      min-height: 300px;

      display: flex;
      justify-content: center;
      align-items: center;
    
      img {
        width: 100%;
        border-radius: 2px 10px 10px 2px;
      }
    }

  }
`

const AudioCard = styled.div`
  width: 450px;
  height: 180px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const AudioReviewNone = styled.div`
  width: 1100px;
  height: 180px;
  
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

  overflow: hidden;

  img {
    width:100%;
    height:100%;
    object-fit: cover;
  }

  :hover {
    transform: scale(0.99);
    cursor: pointer;
  }
`
const Content = styled.div`
  width: 297px;
  min-height: 64px;
  
  display: flex;
  flex-direction: column;

  #contents {
    margin-top: 10px;
    width: 100%;
    font-size: 12px;
    min-height: 100px;
  }

  #follow {
    width: 100%;
    height: 30px;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
      width: 73px;
      height: 30px;

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;

      border-radius: 10px;

      :hover {
        transform: scale(0.97);
        cursor: pointer;
      }
    }
  }
`

const ListBox = styled.div`
  width: 550px;
  height: 100%;

  font-weight: 400;

  #listname {
    height: 30px;

    display: flex;
    align-items: center;
    background-color: white;

    margin-top: 80px;
    margin-bottom: 26px;

    h3 {
      font-weight: 700;
      font-size: 24px;
    }

    span {
      font-weight: 300;
      font-size: 18px;
      color: #707070;
    }
  }

  #playbox {
    width: 550px;
    height: 750px;
  
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

    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;

    #list {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      padding: 0px 20px;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;

      button {
        cursor: pointer;
      }

      h4 {
        width: 400px;
        font-weight: 400;
        font-size: 20px;
      }

      h3 {
        width: 400px;
        font-size: 35px;
      }

      :hover {
        background: #0C0A0A;
        border-radius: 10px;

        h4 {
         color: white;
        }

        div {
          border: 1px solid white;
          color: white;
        }
      }
    }
  }
`

const PlayerSt = styled.div`
  width: 50px;
  height: 50px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  border-radius: 50px;
  border: 0.5px solid #000000;
  
  cursor: pointer;

  :hover {
    background-color: #000000;
    color: white;
    border: 0.5px solid #FFFFFF;
  }
`

const ReviewBox = styled.div`
  width: 1100px;
  margin: auto;
  
  display: flex;
  flex-direction: column;

  #reviewbox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;

    height: 150px;

    padding: 0px 0px 20px 0px;
    border-bottom: 2px solid #000000;

    #reviewHeader {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 30px;

      h3 {
        font-weight: 700;
        font-size: 24px;
        margin-right: 10px;
      }

      h4 {
        font-weight: 300;
        font-size: 18px;
        color: #707070;
      }
    }

    span {
      height: 30px;
      margin-right: 8px;

      font-weight: 500;
      font-size: 14px;
      color: #000000;
      
      :hover {
        color: #D05943;
        cursor: pointer;
      }
    }
  }

`

export default AudioPlay;