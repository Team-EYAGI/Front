import React from 'react';
import styled from 'styled-components';
import "../styles/modal.css"
import Swal from 'sweetalert2';

import { history } from '../redux/configureStore';
import { useParams } from 'react-router-dom';
import { actionCreators as deleteActions } from "../redux/modules/book";
import { useDispatch } from 'react-redux';


const AudioBookList = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const category = params.category;

  const bookId = props.detail.bookId;
  const audioBookList = props.detail ? props.detail.audio : null;

  // 로그인한 사용자인지 확인
  const is_login = localStorage.getItem("is_login");
  const authority = localStorage.getItem("seller");

  return (
    <React.Fragment>
      <Wrap>
        <AudioCardSt1>
          <span id="title">
            참여한 크리에이터(오디오북 목록)
          </span>
          <button
            onClick={() => {
              if (!is_login) {
                Swal.fire({
                  text: "로그인 후 이용 가능합니다!",
                  icon: "warning",
                  confirmButtonText: "로그인하러가기",
                  confirmButtonColor: '#0C0A0A',
                }).then(result => {
                  if (result.isConfirmed) {
                    history.push(`/login`)
                  }
                })
              } else {
                history.push(`/requestWrite/${bookId}`)
              }
            }}
          >새 오디오북 요청하러가기</button>
        </AudioCardSt1>
        {audioBookList && audioBookList.length === 0 ?
          <CreatorNone>
            아직 참여한 크리에이터가 없어요! 새 오디오북을 요청해볼까요?
          </CreatorNone>
          :
          null
        }
        <CardWrap>
          {audioBookList && audioBookList.map((item, idx) => (
            <AudioCardSt key={idx}>
              <ImgSt>
                <img
                  onClick={() => {
                    history.push(`/sellerProfile/${item.sellerId}/audiobook`)
                  }}
                  alt="크리에이터 이미지"
                  src={item.sellerImg ? item.sellerImg : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTB2Sn%2FbtrB4PINn6v%2FpPKEkCp0WIdi5JI9NGvzrk%2Fimg.png"} />
              </ImgSt>
              <ContentSt>
                <div id='preview'>
                  {authority === "ROLE_ADMIN" &&
                    <button
                      id="delete"
                      onClick={() => {
                        dispatch(deleteActions.deleteAudioBookAC(item.audioBookId));
                      }}
                    >X</button>
                  }
                  <button
                    id="listen"
                    onClick={() => {
                      if (!is_login) {
                        Swal.fire({
                          text: "로그인 후 이용 가능합니다!",
                          icon: "warning",
                          confirmButtonText: "로그인하러가기",
                          confirmButtonColor: '#0C0A0A',
                        }).then(result => {
                          if (result.isConfirmed) {
                            history.push(`/login`)
                          }
                        })
                      } else {
                        history.push(`/audioPlay/self/${bookId}/${item.audioBookId}`)
                      }
                    }}
                  >오디오북 바로가기
                  </button>
                  <button
                    id="listen"
                    onClick={() => {
                      history.push(`/audioModal/${category}/${bookId}/${item.audioBookId}`)
                    }}
                  >1분 미리듣기 ▶
                  </button>
                </div>
                <span id="name">{item.sellerName}</span>
                <span id='contents'>
                  {item.contents}
                </span>
                <div id='preview'>
                  <span>{item.createdAt.split("T")[0]}</span>
                </div>
              </ContentSt>
            </AudioCardSt>
          ))}
        </CardWrap>
      </Wrap>
    </React.Fragment>
  )
}

const CreatorNone = styled.div`
  width: 1100px;
  min-height: 200px;
  
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
  flex-wrap: wrap;

  #title {
    float: left;
    font-size: 22px;
    font-weight: bold;
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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  flex-wrap: wrap;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

const AudioCardSt1 = styled.div`
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
    font-weight: 700;
    font-style: normal;
    font-size: 17px;

    :hover {
      cursor: pointer;
      color: #D05943;
    } 
  }
`

const AudioCardSt = styled.div`
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
  width: 125px;
  height: 125px;
  border-radius: 15px;
  border: 1px solid #878787;
  
  overflow: hidden;

    img {
      width:100%;
      height:100%;
      object-fit:cover;

      cursor: pointer;
    }
`

const ContentSt = styled.div`
  width: 375px;
  min-height: 64px;
  
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;

  #delete {
    width: 34px;
    height: 34px;
    margin-right: 5px;

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
    cursor: pointer;

  }

  #preview {
    width: 100%;
    text-align: right;

    #listen {
      width: 104px;
      height: 34px;
      margin-right: 2px;

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