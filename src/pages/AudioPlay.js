import React, {useRef} from 'react';
import styled from 'styled-components';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {BsFillPlayFill} from 'react-icons/bs';
import AudioReview from '../components/AudioReview';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/book";


import music1 from '../music/미리듣기 (online-audio-converter.com).wav';
import music2 from '../music/어반 자카파(urban zakapa)-커피를 마시고 (reprise).mp3';
import { useParams } from 'react-router-dom';

const AudioPlay = (props) => {
  const params = useParams();
  const bookId = params.bookId

  const dispatch = useDispatch();
  // dispatch(getActions.getBookDetailAC(84));

  // const detail = useSelector((state) => state.book.detail_book);
  // console.log("받은 데이타", detail) 

  // const [hello, setHello] = React.useState(detail.bookImg);
  // console.log("데이터 담기나?", hello)

  const song = [music1, "https://image8292.s3.ap-northeast-2.amazonaws.com/audioPreview/6fcceb46-8243-4abb-8b0e-ac76544db800.wav", 'https://image8292.s3.ap-northeast-2.amazonaws.com/audio/aa9a17e7-21f2-49ca-83c8-b25afda16a23.wav']
  // 막혀 있는 부분
  const [music, setMusic] = React.useState(song);
  const [play, setPlay] = React.useState(song[0]);
  console.log("음악", music)

  React.useEffect(() => {
    dispatch(getActions.getBookDetailAC(bookId));
  }, []);

  // 오디오 플레이어에 접근하기 위한 훅
  const playBtnClick = useRef();

  // const play = () => {
  //   // console.log(music)
    
  //   // 오디오 플레이어에 접근해서 어떻게 실행을 시켜줘야하는지 고민 필요...
  //   // src부분을 어떻게 갈아끼워야할까...?
  //   // console.log(playBtnClick.current.audio.current.src)
  // }
  
  // console.log(playBtnClick)

    return (
    <React.Fragment>
      <HeaderSt>
          책 제목 > 오디오 듣기
      </HeaderSt>
      <Wrap>
        <Player>
          <PlayerImg>
            <Img>
              <img style={{ width: "100%", height: "100%"}}
                src='http://image.kyobobook.co.kr/images/book/large/232/l9788901232232.jpg'
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
          <h3>책 제목입니다.</h3>
          <h4>저자 : 저자 이름</h4>
          {/* <h5>크리에이터 : 크리에이터 이름</h5> */}
          <h3>크리에이터</h3>
          <div id='creator'>
            <button>1</button>
            <button>2</button>
          </div>
        </Player>
        <ListBox>
          <div id='listname'>
            <h3>목차</h3>
            <span>2개 챕터</span>
          </div>
          <div id='listbox'>

          {/* 플레이리스트 목록 map */}
          {song && song.map((item, idx) => (
            <div key={idx} id='list'>
              <h4>{idx + 1}</h4>
              <h3>{item}</h3>
              <PlayerSt onClick={() => {
                setPlay(`${item}`)
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