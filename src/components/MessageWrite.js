import React from 'react'
import { useState } from "react";
import styled from "styled-components";
import { useRef } from "react";
import Swal from 'sweetalert2';

const MessageWrite = (props) => {
  const { sendMessage } = props;  // 메세지 보내기 stomp 함수

  // 보낼 메세지 텍스트
  const now_message = useRef();
  const msg = now_message.current;

  const [new_message, setMessage] = useState("");
  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  // 메세지 보내기 버튼 클릭 시 실행 될 함수
  const sendMessageBtn = () => {
    // 빈 문자열 일 경우
    if (new_message === "" || new_message === " ") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '문의 내용을 입력해주세요!',
        showConfirmButton: false,
        timer: 1000
      })
      return;
    }
    sendMessage(msg.defaultValue);  //메세지 실제로 보내기
    setMessage("");  // input 비우기
  };

  const handleEvent = (e) => { 
    if (e.nativeEvent.isComposing) { return; } 
    if (e.key !== "Enter") { 
      return; } 
      sendMessage(msg.defaultValue);
      setMessage("");
  };

  return (
    <React.Fragment>
      <Wrap>
        <textarea onChange={changeMessage} value={new_message} ref={now_message} onKeyDown={handleEvent}/>
        <button className="set" onClick={sendMessageBtn}>전송</button>
      </Wrap>
    </React.Fragment>
  )
}
const Wrap = styled.div`
`
export default MessageWrite;