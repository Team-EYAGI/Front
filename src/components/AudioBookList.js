import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements/Index';
import { history } from '../redux/configureStore';
import { IoHeart } from "react-icons/io5";
import { BsFillPlayFill } from "react-icons/bs";
import "../styles/modal.css"
import AudioPlayer from "react-h5-audio-player";

import music1 from '../music/미리듣기 (online-audio-converter.com).wav';
import music2 from '../music/어반 자카파(urban zakapa)-커피를 마시고 (reprise).mp3';
import { useParams } from 'react-router-dom';

const AudioBookList = (props) => {
  const params = useParams();

  const bookId = props.detail.bookId
  const category = params.category

  const audioPreDtoList = props.detail.audioPreDtoList
  console.log("리스트", audioPreDtoList)

  const is_login = localStorage.getItem("is_login");

  return (
    <React.Fragment>
      <Wrap>
        <AudioCardSt1>
        <span id="title">
          오디오북 목록
        </span>
        <button
            onClick={() => {
              if(!is_login) {
                window.alert("로그인 후 이용 가능합니다!");
                return;
              } else {
                history.push(`/requestWrite/${bookId}`)
              }
            }}>새 오디오북 요청하러가기</button>
        </AudioCardSt1>
        {audioPreDtoList && audioPreDtoList.map((item, idx) => (
          <AudioCardSt key={idx}>
          <ImgSt/>
          <ContentSt
            onClick={()=> {
              history.push(`/audioPlay/${category}/${bookId}/${item.audioBookId}`)
            }}
          >
            <span id="name">{item.sellerName}</span>
            <span id='contents'>
              {item.contents}
            </span>
          </ContentSt>
          <PlayerSt 
            onClick={() => {
              history.push(`/audioModal/${category}/${bookId}/${item.audioBookId}`)
            }}
            // onClick={openModal}  
          >
            <BsFillPlayFill style={{width: "54px", height: "50px"}}/>
            <span>01:00</span>
          </PlayerSt>
          <HeartSt>
            <IoHeart style={{width: "44px", height: "40px"}}/>
            <span>{item.totalHeart}</span>
          </HeartSt>
        </AudioCardSt>
        ))}
  
        <AudioCardSt>
          <ImgSt/>
          <ContentSt>
            <span id="name">크리에이터 이름</span>
            <span id='contents'>
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?

            </span>
          </ContentSt>
          <PlayerSt 

          >
            <BsFillPlayFill style={{width: "54px", height: "50px"}}/>
            <span>click</span>
          </PlayerSt>
          <HeartSt>
            <IoHeart style={{width: "44px", height: "40px"}}/>
            <span>1</span>
          </HeartSt>
        </AudioCardSt>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #title {
    /* width: 100%; */
    float: left;
    font-size: 30px;
    font-weight: bold;
    background-color: rebeccapurple;
  }

  button {
    width: 300px;
    height: 50px;

    border-radius: 20px;
    font-size: 20px;

    cursor: pointer;
  }
`

const AudioCardSt1 = styled.div`
  /* background-color: #F4F4F4; */

  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  border-radius: 20px;
  /* padding: 43px 0px; */
  margin: 24px 0px 0px 0px;

  p {
    font-size: 30px;
  }
`

const AudioCardSt = styled.div`
  background-color: #F4F4F4;

  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  
  border-radius: 20px;
  padding: 43px 0px;
  margin: 24px 0px;
`

const ImgSt = styled.div`
  background-color: #C4C4C4;

  width: 97px;
  height: 97px;
  
  border-radius: 50px;
  border: 1px solid #878787;
  
  cursor: pointer;
`

const ContentSt = styled.div`
  background-color: lightgray;

  width: 692px;
  min-height: 110px;
  
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;

  cursor: pointer;

  #name {
    width: 100%;
    font-size: 20px;
    margin-bottom: 5px;
    font-weight: 700;
    padding-bottom: 5px;
  }

  #contents {
    width: 100%;
    font-size: 16px;
  }
`

const PlayerSt = styled.div`
  background-color: #EAEAEA;

  width: 120px;
  height: 120px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  border-radius: 20px;
  
  cursor: pointer;

  span {
    font-size: 15px;

    display: flex;
    justify-content: center;
    
    margin-top: 5px;
  }
`

const HeartSt = styled.div`
  background-color: #EAEAEA;

  width: 120px;
  height: 120px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  border-radius: 20px;
  
  cursor: pointer;

  span {
    font-size: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    margin-top: 5px;
  }
`

export default AudioBookList;