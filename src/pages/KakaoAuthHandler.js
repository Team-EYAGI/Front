// 리다이렉트될 화면
// OAuth2RedirectHandeler.js
import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
// import Spinner from "../elements/Spinner";
import { useEffect } from "react";
import axios from "axios";
import { actionCreators as userAction } from "../redux/modules/user";
// import { setToken, delToken} from "../shared/token";
import { useHistory } from "react-router-dom";
import Spinner from "../elements/Spinner";
import styled from "styled-components";

const KakaoAuthHandler = (props) => {
  const dispatch =useDispatch();
  const history =useHistory();

  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code)

  React.useEffect(() => {
    dispatch(userAction.kakaoLoginAC(code));
  }, []);

  return (
    <Wrap>
      <Spinner/>
    </Wrap>
  )
};

const Wrap = styled.div`
  margin-top: 50px;
  min-height: 1100px;
`

export default KakaoAuthHandler;