import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function FundHeart(props) {
  const {
    ChangeLike,
    fundHeartBool
  } = props;
  console.log(props);

  return (
    <React.Fragment>
      {fundHeartBool === true ?
        <AiOutlineHeart id="heart" size="40px"               
          onClick={ChangeLike}
        />
        :
        <AiFillHeart              
          id='fillHeart'
          size="40px"
          onClick={ChangeLike}
        />
      }
    </React.Fragment>
  );
}

export default FundHeart;