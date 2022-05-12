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

  const audioBookList = props.detail ? props.detail.audio : null
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
                history.push(`/login`)
                return;
              } else {
                history.push(`/requestWrite/${bookId}`)
              }
            }}>새 오디오북 요청하러가기</button>
        </AudioCardSt1>
        {audioBookList && audioBookList.length === 0 ?
          <AudioReviewNone>
            아직 참여한 크리에이터가 없어요! 새 오디오북을 요청해볼까요?
          </AudioReviewNone>
          :
          null
        }
        <CardWrap>
          {audioBookList && audioBookList.map((item, idx) => (
            <AudioCardSt key={idx}>
              <ImgSt>
                <img src={item.sellerImg ? item.sellerImg : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZfKhY%2FbtrBqGLmp03%2Fd26IOo940K3zO0xLjTFMfK%2Fimg.png"} />
              </ImgSt>
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
                  <span>{item.createdAt.split('오후')[0]}</span>
                </div>
              </ContentSt>
            </AudioCardSt>
          ))}
        </CardWrap>
      </Wrap>
    </React.Fragment>
  )
}

const AudioReviewNone = styled.div`
  width: 1100px;
  min-height: 200px;
  

  /* background-color: purple; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* background-color: aliceblue; */
  flex-wrap: wrap;

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

  width: 536px;
  height: 130px;
  
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

  width: 125px;
  height: 125px;
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

const ContentSt = styled.div`
  /* background-color: lightgray; */

  width: 375px;
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

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 10px;

      background: #F9F7F4;
      border: 1px solid #000000;
      border-radius: 10px;

      :hover {
        background: #0C0A0A;
        border: 1px solid #000000;
        color: #FFFFFF;
      }
    }
  }
`

export default AudioBookList;