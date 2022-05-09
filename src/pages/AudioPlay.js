import React from 'react';
import styled from 'styled-components';
import AudioReview from '../components/AudioReview';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { BsFillPlayFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/audio";
import { actionCreators as libraryActions } from "../redux/modules/mypage";
import { history } from '../redux/configureStore';
import { useBeforeunload } from "react-beforeunload";
import { useParams } from 'react-router-dom';

const AudioPlay = (props) => {

  const dispatch = useDispatch();

  // 새로고침 경고 알럿
  useBeforeunload((event) => event.preventDefault());

  const params = useParams();
  const bookId = params.bookId
  const audioBookId = params.audioBookId
  const category = params.category


  // 오디오북 재생목록 불러오기
  const audioDetail = useSelector((state) => state.audio.audio_list);
  const playList = audioDetail.audioFileDtoList
  console.log("받은 데이타", audioDetail)
  console.log(playList)

  // 오디오북 리뷰 불러오기
  const audioReview = useSelector((state) => state.audio.review_list);
  console.log("리뷰 데이타", audioReview)

  const [play, setPlay] = React.useState("");

  React.useEffect(() => {
    dispatch(getActions.getAudioAC(audioBookId));
    dispatch(getActions.getReviewAC(audioBookId));
    // dispatch(libraryActions.getReviewAC(audioBookId));
  }, []);

  return (
    <React.Fragment>
      <Wrap>
        <Player>
          <HeaderSt>
            <div>
              {audioDetail.title}
            </div>
            <span>
              저자: {audioDetail.author} / 크리에이터: {audioDetail.sellerName}
            </span>
          </HeaderSt>

          <ImgSt style={{ backgroundImage: `url(${audioDetail.bookImg})` }}>
            <div id='img_wrap'>
              <div id='img'>
                <img src={audioDetail.bookImg} />
              </div>
              <AudioPlayer
                showJumpControls={false}
                className='audio'
                autoPlay={false}
                src={play}
                volume={1}
                // progressUpdateInterval            
                // onListen={()=>{}}
                // ListenInterval
                onPlay={e => console.log("onPlay")}
              // other props here
              />
            </div>
          </ImgSt>
          <div id='name'>
            <span id='creatorname'>{audioDetail.sellerName}</span>&nbsp;&nbsp;
            <span id='fixname'>크리에이터</span>
          </div>
          <AudioCardSt>
            <SellerImg style={{ backgroundImage: (audioDetail.a ? `url(${audioDetail.Img})` : `url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZfKhY%2FbtrBqGLmp03%2Fd26IOo940K3zO0xLjTFMfK%2Fimg.png")`) }} />
            <ContentSt>
              <div id='preview'>
                <div>팔로잉 팔로우</div>
                <button
                  onClick={() => {
                    // history.push(`/audioModal/${category}/${bookId}/${item.audioBookId}`)
                  }}
                >팔로우 +</button>
              </div>
              <span id='contents'>
                {audioDetail.audioInfo}
              </span>
            </ContentSt>
          </AudioCardSt>
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
                <h4>{idx + 1}. Chapter{idx + 1}</h4>
                {/* <h3>Chapter{idx + 1}</h3> */}
                <PlayerSt onClick={() => {
                  setPlay(`${item.s3FileName}`)
                  console.log("paly상태", play)
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
          <h3>후기</h3>
          <span
            onClick={() => {
              history.push(`/reviewWrite/${category}/${bookId}/${audioBookId}`)
            }}
          >후기 등록하기</span>
        </div>
        {audioReview.length === 0 ?
          <AudioCardSt>
            후기가 없어요! 후기를 등록해주세요!
          </AudioCardSt>
          :
          null
        }
        <div id='reviewcard'>
          {audioReview && audioReview.map((item, idx) =>
            <AudioReview item={item} key={idx} />
          )}
        </div>
      </ReviewBox>

    </React.Fragment>
  )
}



const Wrap = styled.div`
    width: 1195px;
    margin: 0 auto;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: lightblue; */

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

const HeaderSt = styled.div`
    width: 464px;
    height: 56px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* background-color: yellow; */

    /* margin: 0 auto; */
    margin-top: 81px;
    margin-bottom: 26px;

    font-family: Pretendard;

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
    width: 500px;
    /* height: 789px; */
    /* background-color: red; */
  
    /* margin: 0 auto; */
    display: flex;
    flex-direction: column;
    
    /* position: relative; */

    font-family: Pretendard;
    font-weight: 400;
    font-style: normal;

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
const ImgSt = styled.div`
  width: 464px;
  height: 464px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-repeat : no-repeat;
  background-size : cover;
  border-radius: 20px;

  #img_wrap {
    width: 464px;
    height: 464px;
    /* background-image: url(detail.bookImg) */
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 20px;
  }
`

const AudioCardSt = styled.div`
  width: 464px;
  height: 180px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const SellerImg = styled.div`
  width: 150px;
  height: 150px;

  background-repeat : no-repeat;
  background-size : cover;
  
  border-radius: 15px;
  border: 1px solid #878787;
  
  cursor: pointer;
`

const ContentSt = styled.div`
  /* background-color: lightgray; */

  width: 297px;
  min-height: 64px;
  
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;

  cursor: pointer;

  #contents {
    margin-top: 10px;
    width: 100%;
    font-size: 12px;
    min-height: 100px;
  }

  #preview {
    width: 100%;
    height: 30px;
    /* background: yellow; */
    text-align: right;
    
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

      background: #FFFEFC;
      border: 1px solid #0C0A0A;
      border-radius: 10px;
    }
  }
`

const ListBox = styled.div`
  width: 590px;
  height: 100%;
  /* background-color: red; */

  /* margin: 0 auto; */

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;

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
    width: 590px;
    height: 750px;
    

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

    /* padding: 20px 0px; */

    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;

    #list {
      /* background-color: wheat; */

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      padding: 0px 20px;
           
      margin-bottom: 10px;

      border-top: 1px solid gray;
      border-bottom: 1px solid gray;

      h4 {
        width: 400px;
        font-weight: 400;
        font-size: 20px;
      }

      h3 {
        width: 400px;
        /* background-color: rebeccapurple; */
      
        font-size: 35px;
      }
/* 
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
      } */
    }
  }
`

const PlayerSt = styled.div`
  /* background-color: #EAEAEA; */

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
  /* background-color: green; */

  width: 1195px;
  margin: 0 auto;
  
  display: flex;
  flex-direction: column;

  /* border-radius: 20px; */

  #reviewbox {
    display: flex;
    flex-direction: row;
    align-items: center;

    h3 {
      font-size: 25px;
      margin-right: 10px;
    }

    span {
      font-size: 18px;
      color: #707070;
      cursor: pointer;
    }
  }

  #reviewcard {
    /* background-color: aqua; */
    /* display: flex; */
    flex-direction: row;
    justify-content: left;

    margin-bottom: 100px;
    overflow-x: scroll;

  }
`

export default AudioPlay;