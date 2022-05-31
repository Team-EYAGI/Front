import React, { useRef } from "react";
import styled from "styled-components";
import Swal from 'sweetalert2';
import { useBeforeunload } from "react-beforeunload";
import { BsXSquare } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as voiceActions } from "../redux/modules/mypage";


const AddProfileVoice = (props) => {

  const dispatch = useDispatch();

  // 새로고침 경고 알럿
  useBeforeunload((event) => event.preventDefault());

  // 인풋창 접근
  const fileInput = useRef();

  // 인풋을 대신 클릭해주기 위한 함수
  const handleClick = () => {
    fileInput.current.click();
  };

  const [file, setFile] = React.useState("")

  // 파일 선택하기
  const selectFile = (e) => {
    setFile(e.target.files[0])
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
  };

  // 오디오 추가하기
  const addVoice = () => {
    let file = fileInput.current.files[0];
    let maxSize = 5 * 1024 * 1024;
		let fileSize = file.size;

		if(fileSize > maxSize){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '첨부파일 사이즈는 5MB 이내로 등록 가능합니다!',
      })
			return;
		}
    dispatch(voiceActions.addVoiceAC({ file })
    )
  }

  return (
    <ModalBack>
      <ModalBox>
        <div style={{ width: "700px" }}>
          <GoBack>
            <BsXSquare id="icon" onClick={() => history.push(`/mypage/listen`)} size="30px" />
          </GoBack>
        </div>
        <Content>
          <div>
            <p>내 목소리 등록하기</p>
            <div id='file'>
              <span>{file ? file.name : "가능한 파일 : wav, mp3, m4a"}</span>
              <BiSearch id='addbtn' onClick={handleClick} size="24px" />
            </div>
            <h5>최대 5MB의 파일만 등록 가능합니다.</h5>
            <div>
              <input
                type="file"
                accept="audio/wav, audio/mp3, audio/m4a"
                multiple
                ref={fileInput}
                style={{ display: 'none' }}
                onChange={selectFile}
              />
            </div>
          </div>
          <div>
            <button
              disabled={file === ""}
              onClick={addVoice}
            >등록하기</button>
          </div>
        </Content>
      </ModalBox>
    </ModalBack>
  );
};

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
`

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 5;
`

const GoBack = styled.div`
  width: 600px;

  #icon {
    margin-top: 20px;
    float: right;
    cursor: pointer;
  }
`

const Content = styled.div`

  width: 90%;
  height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  #file {
    width: 85%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #F4F4F4;
    border: 1px solid #E4E4E4;
    border-radius: 10px;
    margin-top: 30px;

    #addbtn {
      margin: 8px 14px 8px 0px;
      cursor: pointer;
    }

    span {
      width: 400px;
      font-weight: 400;
      font-size: 16px;
      color: #525252;

      margin: 10px 0px 8px 11px;
      white-space: nowrap;
      overflow:hidden;
      text-overflow: ellipsis;
    }
  }

  p {
      font-weight: 700;
      font-size: 25px;
      margin-bottom: 30px;
    }

    
    button {
      width: 342px;
      height: 60px;
      margin: 40px 0px;

      border-radius: 10px;
      background-color: #000000;
      color: #FFFFFF;

      font-size: 20px;
      font-family: Pretendard;
      font-weight: 700;
      font-style: normal;
      
      cursor: pointer;

      :disabled {
        background: #F4F4F4;
        color: #8E8E8E;
        border: 1px solid #E4E4E4;
        cursor: auto;
      }
    }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h5 {
    width: 85%;
    margin: 10px 5px 3px 0px;
    font-weight: 300;
    text-align: right;
  }
`

export default AddProfileVoice;