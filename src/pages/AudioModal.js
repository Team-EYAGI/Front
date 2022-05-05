import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as getActions } from "../redux/modules/book";



// import CloseIcon from "@mui/icons-material/Close";
// import ShareIcon from "@mui/icons-material/Share";
// import { actionCreators as postActions } from "../redux/modules/post";

// import { Text, Grid, Input, Button } from "../elements/index";

const AudioModal = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params)
  const bookId = params.bookId
  // console.log("북아이디",bookId)
  const audioBookId = params.audiobookId
  const detail = useSelector((state) => state.book.detail_book);
  console.log("디테일", detail)
  const hello = detail.audioPreDtoList

  const previewFile = hello.find((p) => p.audioBookId == audioBookId)
  console.log(previewFile)
  
  React.useEffect(() => {
    dispatch(getActions.getBookDetailAC(bookId));
  }, []);

  return (
    <ModalBack>
      <ModalBox>
        <div style={{ width: "700px" }}>  
        <GoBack>
          <button onClick={() => history.goBack()}>X</button>       
        </GoBack>    
        <PlayerImg>
            <Img>
              <img style={{ width: "100%", height: "100%"}}
                src={detail.bookImg}
              />
            </Img>

            ddd
            <AudioPlayer
              className='audio' 
              autoPlay={false} 
              src={previewFile.previewFile}
              volume={1}
              // progressUpdateInterval            
              // onListen={()=>{}}
              // ListenInterval
              onPlay={e => console.log("onPlay")}
              // other props here
            />
          </PlayerImg>

          {/* <Modal open={modalOpen} close={closeModal} /> */}
        </div>
        <div>
          <button onClick={() => history.push(`/audioPlay/${bookId}/${audioBookId}`)}>더 듣기</button>
        </div>
      </ModalBox>
    </ModalBack>
  );
};

export default AudioModal;

const ModalBox = styled.div`
  position: absolute;
  top: calc(25vh - 100px);
  left: calc(40vw - 200px);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 750px;
  height: 700px;
  flex-direction: column;
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const GoBack = styled.div`
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