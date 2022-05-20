import React, { useState } from "react";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as getActions } from "../redux/modules/fund";

import { useParams } from "react-router-dom";

const Like = (props) => {
    const likeCnt = props.fundingcard.likeCnt
    const fundId = props.fundingcard.fundId
  const dispatch = useDispatch();
  const [fundHeartBool, setFundHeartBool] = useState(true);
  const like = useSelector((state)=> state.fund.likeCnt);



  const addLike = () => {
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
      ><AiOutlineHeart id="icon"  size="40px"/>  <h4>{likeCnt}</h4></Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  width: 90px;
  height: 90px;
  font-size: 15 px;
  text-align: center;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    width: 100%;
  }

  #icon {
    margin-top: 15px;   
  }
`;

export default Like;
