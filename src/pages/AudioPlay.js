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
      <HeaderSt>
        {audioDetail.title} > 오디오 듣기
      </HeaderSt>
      <Wrap>
        <Player>
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
          <h3>{audioDetail.title}</h3>
          <h4>저자 : {audioDetail.author}</h4>
          <h3>크리에이터 : {audioDetail.sellerName}</h3>
          <div id='creator'>
            {audioDetail.audioInfo}
          </div>
        </Player>
        <ListBox>
          <div id='listname'>
            <h3>목차</h3>
            <span>2개 챕터</span>
          </div>
          <div id='listbox'>

            {/* 플레이리스트 목록 map */}
            {playList && playList.map((item, idx) => (
              <div key={idx} id='list'>
                <h4>{idx + 1}</h4>
                <h3>Chapter{idx + 1}</h3>
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
    width: 1440px;
    /* position: relative; */
    margin: 0 auto;
    display: flex;
    align-items: center;
    /* background-color: lightblue; */
  `

const HeaderSt = styled.div`
    width: 1440px;
    height: 27px;

    /* background-color: yellow; */

    margin: 0 auto;
    margin-top: 81px;
    margin-bottom: 18px;

    font-family: Pretendard;
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    `

const Player = styled.div`
    width: 464px;
    height: 100%;
    /* background-color: red; */
  
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    
    /* position: relative; */

    font-family: Pretendard;
    font-weight: 400;
    font-style: normal;

    h3 {
      width: 464px;
      /* float: left; */
      margin: 27px 0px 16px 0px;
      font-size: 25 px;
    }

    h4 {
      width: 464px;
      /* float: left; */
      margin: 0px 0px 16px 0px;
      font-size: 16px;
      font-weight: 300;
    }

    h5 {
      width: 464px;
      /* float: left; */
      margin: 0px 0px 16px 0px;
      font-size: 16px;
      font-weight: 300;
    }

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
    background: #F4F4F4;
    background : rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 20px;
  }
`

const ListBox = styled.div`
  width: 708px;

  margin: 0 auto;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;

  #listname {
    height: 30px;
    display: flex;
    align-items: center;
    background-color: white;

    h3 {
      font-size: 25px;
      margin-right: 10px;
    }

    span {
      font-size: 18px;
      color: #707070;
    }
  }

  #listbox {
    width: 708px;
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

    padding: 44px 0px;

    border: 1px solid gray;
    border-radius: 20px;

    #list {
      background-color: wheat;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      padding: 0px 40px;
           
      margin-bottom: 10px;
      margin-left: 10px;
      margin-right: 10px;

      border: 1px solid gray;
      border-radius: 5px;

      h4 {
        width: 20px;
        font-size: 25px;
      }

      h3 {
        width: 400px;
        /* background-color: rebeccapurple; */
      
        font-size: 35px;
      }
    }
  }
`

const PlayerSt = styled.div`
  background-color: #EAEAEA;

  width: 50px;
  height: 50px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  border-radius: 20px;
  
  cursor: pointer;
`

const ReviewBox = styled.div`
  /* background-color: green; */

  width: 1310px;
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

const AudioCardSt = styled.div`
  background-color: #F4F4F4;

  width: 100%;
  height: 100px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  
  border-radius: 20px;
  padding: 43px 0px;
  margin: 24px 0px;
`

export default AudioPlay;