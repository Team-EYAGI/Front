import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements/Index';
import { history } from '../redux/configureStore';
import { IoHeart } from "react-icons/io5";
import { BsFillPlayFill } from "react-icons/bs";
import "../styles/modal.css"
import AudioPlayer from "react-h5-audio-player";
import { useParams } from 'react-router-dom';

const AudioBookList = (props) => {
  const params = useParams();

  const bookId = props.detail.bookId
  const category = params.category

  const audioBookList = props.detail.audio
  console.log("리스트", audioBookList)

  const is_login = localStorage.getItem("is_login");

  return (
    <React.Fragment>
      <Wrap>
        <AudioCardSt1>
          <span id="title">
            참여한 크리에이터
          </span>
          <button
            onClick={() => {
              if (!is_login) {
                window.alert("로그인 후 이용 가능합니다!");
                return;
              } else {
                history.push(`/requestWrite/${bookId}`)
              }
            }}>새 오디오북 요청하러가기</button>
        </AudioCardSt1>
        <CardWrap>
          {audioBookList && audioBookList.map((item, idx) => (
            <AudioCardSt key={idx}>
              <ImgSt style={{ backgroundImage: (audioBookList.a ? `url(${audioBookList.Img})` : `url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZfKhY%2FbtrBqGLmp03%2Fd26IOo940K3zO0xLjTFMfK%2Fimg.png")`)}}/>
              <ContentSt>
                <div id='preview'>
                  <button
                    onClick={() => {
                      history.push(`/audioModal/${category}/${bookId}/${item.audioBookId}`)
                    }}
                  >1분 미리듣기 ▶</button>
                </div>
                <span id="name">{item.sellerName}</span>
                <span id='contents'>
                  {item.contents}
                </span>
                <div id='preview'>
                  <span>00.00.00</span>
                </div>
              </ContentSt>
            </AudioCardSt>
          ))}

          <AudioCardSt>
            <ImgSt />
            <ContentSt>
              <div id='preview'>
                <button>1분 미리듣기 ▶</button>
              </div>
              <span id="name">크리에이터 이름</span>
              <span id='contents'>
                내용이 들어간다?내용이 들어간다?내용이 들어간다?
                내용이 들어간다?내용이 들어간다?내용이 들어간다?
                내용이 들어간다?내용이 들어간다?내용이 들어간다?
                내용이 들어간다?내용이 들어간다?내용이 들어간다?
              </span>
              <div id='preview'>
                <span>00.00.00</span>
              </div>
            </ContentSt>
          </AudioCardSt>
        </CardWrap>
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

  /* background-color: aliceblue; */
  flex-wrap: wrap;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;

  #title {
    /* width: 100%; */
    float: left;
    font-size: 22px;
    font-weight: bold;
    /* background-color: rebeccapurple; */
    
  }

  button {
    height: 50px;
    background: none;

    border: none;
    border-radius: 20px;
    font-size: 14px;
    color: #000000;
    cursor: pointer;
  }
`

const CardWrap = styled.div`
  /* background-color: rebeccapurple; */
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  /* background-color: aliceblue; */
  flex-wrap: wrap;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

const AudioCardSt1 = styled.div`
  /* background-color: #F4F4F4; */

  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  padding: 3px 0px;
  margin: 24px 0px 0px 0px;

  border-bottom: 2px solid black;

  button {
    font-family: Pretendard;
    font-weight: 400;
    font-style: normal;   
  }
`

const AudioCardSt = styled.div`
  /* background-color: #F4F4F4; */

  width: 586px;
  height: 180px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  
  border-bottom: 0.5px solid #000000;

  margin: 0px 3px;
  padding: 30px 4px;
`

const ImgSt = styled.div`
  /* background-color: #C4C4C4; */

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

  width: 405px;
  min-height: 64px;
  
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;

  cursor: pointer;

  #name {
    width: 100%;
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 700;
    padding-bottom: 5px;
  }

  #contents {
    width: 100%;
    font-size: 12px;
    min-height: 64px;
  }

  #preview {
    width: 100%;
    /* background: yellow; */
    text-align: right;

    button {
      width: 104px;
      height: 34px;

      font-family: 'Noto Sans CJK KR';
      font-style: normal;
      font-weight: 500;
      font-size: 10px;

      background: #F9F7F4;
      border: 1px solid #000000;
      border-radius: 10px;
    }
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