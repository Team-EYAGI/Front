import React, { useEffect } from "react";
import styled from "styled-components";


function Join(props) {
  const {
    enterRoom,
    click
  } = props;

  return (
        <button 
        className={((click == false) ? "hide" : "")} 
        onClick={enterRoom}>문의시작!</button>
  );
}


export default Join;