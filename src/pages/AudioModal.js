import React from "react";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import { useBeforeunload } from "react-beforeunload";
import { BsXSquare } from "react-icons/bs";
import useSWR from "swr"
import fetcher from "../shared/Fetcher"
import Spinner from '../elements/Spinner';

import { useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
import Swal from 'sweetalert2';


const AudioModal = (props) => {
  // 새로고침 경고 알럿
  useBeforeunload((event) => event.preventDefault());

  const params = useParams();
  const bookId = params.bookId
  const audioBookId = params.audiobookId
  const category = params.category

  // 로그인한 사용자인지 확인
  const is_login = localStorage.getItem("is_login");

  // 책 상세페이지 가져오기
  const { data, error } = useSWR(process.env.REACT_APP_BASE_URL + `/book/detail/${bookId}`, fetcher)

  if (error) {
    return <div>ERROR...</div>
  }
  if (!data) {
    return <Spinner />
  }

  console.log(data)

  // 책 상세페이지 속 오디오북 리스트(배열)를 가져옴
  // 파람스의 audioBookId와 배열의 audioBookId가 같은 것을 찾아 preview에 넣어줌 
  // file 정보가 있을 때만 find 함수 실행
  const files = data.audio;
  const preview = files ? files.find((p) => p.audioBookId == audioBookId) : null;

  return (
    <ModalBack>
      {preview ?
        <ModalBox>
          <div style={{ width: "700px" }}>
            <GoBack>
              <BsXSquare id="icon" onClick={() => history.goBack()} size="30px" />
            </GoBack>
            <PlayerImg style={{ backgroundImage: `url(${data.bookImg})` }}>
              <div id='img_wrap'>
                <Img>
                  <img style={{ width: "100%" }}
                    src={data.bookImg}
                    alt="책 이미지"
                  />
                </Img>

                {data.title.split("(")[0]} / {preview.sellerName}
                <AudioPlayer
                  className='audio'
                  autoPlay={false}
                  src={preview.previewFile}
                  volume={1}
                  timeFormat={"mm:ss"}
                  defaultCurrentTime={"00:00"}
                  showJumpControls={false}
                />
              </div>
            </PlayerImg>
          </div>
          <div>
            <button
              id="morebtn"
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
                  history.push(`/audioPlay/${category}/${bookId}/${audioBookId}`)
                }
              }}>더 들으러 가볼까요?</button>
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
  margin: 11vh auto;
  background-color: #FFFEFC;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  width: 550px;
  height: 550px;
  flex-direction: column;
  

  #morebtn {
    width: 200px;
    height: 40px;
    margin-bottom: 15px;
    background-color: #FFFEFC;
    border: 1.5px solid #000000;
    border-radius: 10px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;

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

  font-weight: 400;
  color: white;
  z-index: 5;
`;

const GoBack = styled.div`
  width: 600px;
  height: 60px;

  #icon {
    color: #000000;
    margin-top: 5px;
    float: right;
    cursor: pointer;
  }
`;

const PlayerImg = styled.div`
  width: 350px;
  height: 360px;
  margin: 0 auto;

  background-color: #F4F4F4;
  border-radius: 30px;

  background-repeat : no-repeat;
  background-size : cover;

  #img_wrap {
    width: 350px;
    height: 360px;

    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);
    border-radius: 30px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .audio {
      width: 100%;
      height: 80px;
      border-radius: 30px;
      background: none;
      box-shadow: none;
    
      .rhap_progress-indicator {
      background: #FFFFFF;
    }
    
    .rhap_volume-indicator {
      background: #FFFFFF;
    }
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

  img {
    width: 100%;
    border-radius: 2px 10px 10px 2px;
  }
`
