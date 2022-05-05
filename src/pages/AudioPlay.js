import React, {useRef} from 'react';
import styled from 'styled-components';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {BsFillPlayFill} from 'react-icons/bs';
import AudioReview from '../components/AudioReview';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/audio";


import music1 from '../music/미리듣기 (online-audio-converter.com).wav';
import music2 from '../music/어반 자카파(urban zakapa)-커피를 마시고 (reprise).mp3';
import { useParams } from 'react-router-dom';

const AudioPlay = (props) => {
  const params = useParams();
  // console.log(params)
  const bookId = params.bookId
  const audioBookId = params.audioBookId

  const dispatch = useDispatch();

  const audioDetail = useSelector((state) => state.audio.audio_list);
  console.log("받은 데이타", audioDetail) 

  const playList = audioDetail.audioFileDtoList
  console.log(playList)

  // const [hello, setHello] = React.useState(detail.bookImg);
  // console.log("데이터 담기나?", hello)

  const song = [music1, "https://image8292.s3.ap-northeast-2.amazonaws.com/audio/13238855-f56f-4885-96aa-2c923eca85ff.wav", "https://image8292.s3.ap-northeast-2.amazonaws.com/audio/608889b2-b7db-4f9b-85aa-00bf20f91e53.wav"]
  // 막혀 있는 부분
  const [music, setMusic] = React.useState(song);
  const [play, setPlay] = React.useState("");
  // console.log("음악", play)

  React.useEffect(() => {
    dispatch(getActions.getAudioAC(audioBookId));
  }, []);

  // 오디오 플레이어에 접근하기 위한 훅
  const playBtnClick = useRef();

    return (
    <React.Fragment>
      <HeaderSt>
          {audioDetail.title} > 오디오 듣기
      </HeaderSt>
      <Wrap>
        <Player>
          <PlayerImg>
            <Img>
              <img style={{ width: "100%", height: "100%"}}
                src={audioDetail.bookImg}
              />
            </Img>
            <AudioPlayer
              ref={playBtnClick}
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
          </PlayerImg>
          <h3>{audioDetail.title}</h3>
          <h4>저자 : {audioDetail.author}</h4>
          {/* <h5>크리에이터 : 크리에이터 이름</h5> */}
          <h3>{audioDetail.sellerName}</h3>
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
              <h3>{item.s3FileName}</h3>
              <PlayerSt onClick={() => {
                setPlay(`${item.s3FileName}`)
                console.log("paly상태", play)}}>
                <BsFillPlayFill id='playbtn'/>
              </PlayerSt>
            </div>
          ))}
          </div>
      </ListBox>
      </Wrap>
      <ReviewBox>
        <AudioReview/>
      </ReviewBox>

    </React.Fragment>
    ) }
    
  const Wrap = styled.div `
    width: 1440px;
    position: relative;
    margin: 0 auto;
    display: flex;
    background-color: lightblue;
  `
  
  const HeaderSt = styled.div `
    width: 1440px;
    height: 27px;
    /* background-color: red; */
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 0 auto;
    margin-top: 81px;
    margin-bottom: 18px;

    font-family: noto-sans-cjk-kr,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    `
    
    const Player = styled.div`
    width: 464px;
    background-color: red;
    
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    position: relative;
    padding-bottom: 30px;
    font-family: noto-sans-cjk-kr, sans-serif;
    font-weight: 400;
    font-style: normal;

    h3 {
      width: 464px;
      float: left;
      margin: 27px 0px 16px 0px;
      font-size: 25 px;
    }

    h4 {
      width: 464px;
      float: left;
      margin: 0px 0px 16px 0px;
      font-size: 16px;
      font-weight: 300;
    }

    h5 {
      width: 464px;
      float: left;
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
      border-radius: 20px;
      background-color: black;

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

const PlayerImg = styled.div `
  width: 464px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #F4F4F4;
  padding-bottom: 30px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Img = styled.div`
  background-color: gray;

  width: 268px;
  height: 340px;
  margin: 0 auto;
  margin-top: 62px;
  margin-bottom: 30px;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const ListBox = styled.div`
  width: 708px;

  margin: 0 auto;

  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;

  background-color: red;


  #listname {
    display: flex;
    align-items: center;

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
    height: 780px;

    overflow-y: scroll;
    ::-webkit-scrollbar {
    /* 세로 스크롤 넓이 */
    width: 8px;

    /* 가로 스크롤 높이 */
    height: 8px;

    border-radius: 6px;
    background: black;
    /* background: rgba(255, 255, 255, 0.4); */
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
    }

    padding: 44px 0px;

    border: 1px solid gray;
    border-radius: 20px;

    #list {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      padding: 0px 46px;
           
      margin-bottom: 10px;

      h3 {
        width: 550px;
        background-color: rebeccapurple;
      
        font-size: 20px;
      }
    }
  }

  #listbox::-webkit-scrollbar { width: 10px; }

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
  background-color: green;

  width: 1440px;
  margin: 0 auto;
  /* height: 50px; */
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  border-radius: 20px;
  
  cursor: pointer;
`

export default AudioPlay;