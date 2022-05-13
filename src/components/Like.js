import React, { useState } from "react";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as getActions } from "../redux/modules/fund";

import { useParams } from "react-router-dom";

const Like = (props) => {
    // console.log(props)
    const likeCnt = props.fundingcard.likeCnt
    console.log(likeCnt)
    const fundId = props.fundingcard.fundId
  const dispatch = useDispatch();
  const [fundHeartBool, setFundHeartBool] = useState(true);
  const like = useSelector((state)=> state.fund.likeCnt);
  console.log(like)


  const addLike = () => {
    //로그인후가능한거넣기

    if (fundHeartBool == false) {
      setFundHeartBool(true);
      dispatch(getActions.addLikeDB(fundHeartBool, fundId));
    } else {
      setFundHeartBool(false);
      dispatch(getActions.addLikeDB(fundHeartBool, fundId));
    }
  };
  return (
    <React.Fragment>
      <Wrap
      onClick={addLike}
      ><AiOutlineHeart /> {likeCnt}개</Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  /* background-color: yellowgreen; */
  border: 1px solid gray;
  border-radius: 10px;
  width: 85px;
  height: 60;
  /* float: left; */
  /* margin: 17px 0px 16px 0px; */
  font-size: 15 px;
  text-align: center;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Like;
