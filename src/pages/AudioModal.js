import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as getActions } from "../redux/modules/book";
import { useBeforeunload } from "react-beforeunload";


const AudioModal = (props) => {

  const dispatch = useDispatch();

  // 새로고침 경고 알럿
  useBeforeunload((event) => event.preventDefault());

  const params = useParams();
  const bookId = params.bookId
  const audioBookId = params.audiobookId
  const category = params.category

  // 로그인한 사용자인지 확인
  const is_login = localStorage.getItem("is_login");

  // 책 상세페이지 가져오기
  const detail = useSelector((state) => state.book.detail_book);
  console.log("디테일", detail)

  // 책 상세페이지 속 오디오북 리스트(배열)를 가져옴
  // 파람스의 audioBookId와 배열의 audioBookId가 같은 것을 찾아 preview에 넣어줌 
  // file 정보가 있을 때만 find 함수 실행
  const files = detail.audio;
  const preview = files ? files.find((p) => p.audioBookId == audioBookId) : null;

  React.useEffect(() => {
    dispatch(getActions.getBookDetailAC(bookId));
  }, []);

  return (
    <ModalBack>
      {preview ?
        <ModalBox>
          <div style={{ width: "700px" }}>
            <GoBack>
              <button onClick={() => history.goBack()}>X</button>
            </GoBack>

            <PlayerImg style={{ backgroundImage: `url(${detail.bookImg})` }}>
            <div id='img_wrap'>
              <Img>
                <img style={{ width: "100%", height: "100%" }}
                  src={detail.bookImg}
                />
              </Img>

              {detail.title} / {preview.audioBookId}번 오디오북
              <AudioPlayer
                className='audio'
                autoPlay={false}
                src={preview.previewFile}
                volume={1}
                timeFormat={"mm:ss"}
                defaultCurrentTime={"00:00"}
                // progressUpdateInterval            
                // onListen={()=>{}}
                // ListenInterval
                onPlay={e => console.log("onPlay")}
              // other props here
              />
              </div>
            </PlayerImg>

            {/* <Modal open={modalOpen} close={closeModal} /> */}
          </div>
          <div>
            <button
              id="morebtn"
              onClick={() => {
                if (!is_login) {
                  window.alert("로그인 후 이용 가능합니다!");
                  history.push(`/login`)
                  return;
                } else {
                  history.push(`/audioPlay/${category}/${bookId}/${audioBookId}`)
                }
              }}>더 듣기</button>
          </div>
        </ModalBox>
        :
        null
      }

    </ModalBack>
  );
};

export default AudioModal;

const ModalBox = styled.div`
  position: absolute;
  top: calc(25vh - 100px);
  left: calc(40vw - 150px);
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  width: 550px;
  height: 550px;
  flex-direction: column;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  color: white;

  #morebtn {
    width: 100px;
    height: 30px;
    margin-bottom: 15px;
    background-color: #FFFEFC;
    border: 1px solid #000000;
    border-radius: 10px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;

    :hover {
      background-color: #000000;
      border: 1px solid #FFFEFC;
      color: white;

      cursor: pointer;
    }
  }
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);

  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  color: white;
`;

const GoBack = styled.div`
  width: 600px;
  height: 60px;

  button {
    width: 30px;
    height: 30px;
    float: right;
    border: 1px solid gray;
    border-radius: 5px;
    background: none;
  }
`;

const PlayerImg = styled.div`
  width: 350px;
  height: 350px;
  margin: 0 auto;

  background-color: #F4F4F4;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
  border-radius: 30px;

  background-repeat : no-repeat;
  background-size : cover;

  #img_wrap {
    width: 350px;
    height: 350px;

    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);
    border-radius: 30px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    /* background-color: red; */
  }

  .audio {
      width: 100%;
      height: 80px;
      border-radius: 30px;
      background: none;
      border: none;

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

const Img = styled.div`
  width: 140px;

  margin: 0 auto;
  margin-top: 20px;


  display: flex;
  flex-direction: row;
  align-items: center;
`
