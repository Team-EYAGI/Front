import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { IoHeart } from "react-icons/io5";
import { BsFillPlayFill } from "react-icons/bs";

const AudioBookList = (props) => {
  // console.log("오디오디테일", props)
  const bookId = props.detail.bookId
  console.log(bookId)
  return (
    <React.Fragment>
      <Wrap>
        <span>
          오디오북 목록
        </span>
        <AudioCardSt1>
          <p>아직 오디오북 목록이 없네요! 오디오북을 요청해볼까요?</p>
          <button onClick={() => {history.push(`/requestWrite/${bookId}`)}}>오디오북 요청하러가기</button>
        </AudioCardSt1>
        <AudioCardSt>
          <ImgSt/>
          <ContentSt>
            <span>크리에이터 이름</span>
            <span id='contents'>
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
            </span>
          </ContentSt>
          <PlayerSt
            onClick={()=> {
              history.push(`/audioPlay/${bookId}`)
            }}
          >
            <BsFillPlayFill style={{width: "54px", height: "50px"}}/>
            <span>click</span>
          </PlayerSt>
          <HeartSt>
            <IoHeart style={{width: "44px", height: "40px"}}/>
            <span>1</span>
          </HeartSt>
        </AudioCardSt>
        <AudioCardSt>
          <ImgSt/>
          <ContentSt>
            <span>크리에이터 이름</span>
            <span id='contents'>
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
              내용이 들어간다?내용이 들어간다?내용이 들어간다?
            </span>
          </ContentSt>
          <PlayerSt 
            onClick={()=> {
              history.push(`/audioPlay/${bookId}`)
            }}
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

  span {
    width: 100%;
    float: left;
    font-size: 30px;
    font-weight: bold;
  }
`

const AudioCardSt1 = styled.div`
  background-color: #F4F4F4;

  width: 100%;
  height: 200px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  border-radius: 20px;
  padding: 43px 0px;
  margin: 24px 0px;

  p {
    font-size: 30px;
  }

  button {
    width: 300px;
    height: 50px;

    border-radius: 20px;
    font-size: 20px;

    cursor: pointer;
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
  
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;

  span {
    font-size: 20px;
    margin-bottom: 5px;
  }

  #contents {
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