import React, { useEffect } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

// var stompClient = null;
// let sockjs = new SockJS("http://54.180.115.121/chatting");
// stompClient = Stomp.over(sockjs);

function Join(props) {
  const {
    enterRoom
  } = props;

  return (
        <button onClick={enterRoom}>문의시작!</button>
  );
}


export default Join;