import React, { useEffect } from "react";
import styled from "styled-components";


function Join(props) {
  const {
    enterRoom
  } = props;

  return (
        <button onClick={enterRoom}>문의시작!</button>
  );
}


export default Join;