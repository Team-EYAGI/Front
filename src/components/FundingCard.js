import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as getActions } from "../redux/modules/fund";
import { useParams } from "react-router-dom";
import Like from "../components/Like";
import { history } from '../redux/configureStore';
import { BsPlayCircle } from "react-icons/bs";
import { Text } from "../elements/Index";
import FundHeart from "../components/FundHeart";

const FundingCard = (props) => {
  console.log("펀딩카드 좋아요값" ,props)
  const dispatch = useDispatch();

  let fundingHeartState = props.fundcard.myHeart
  // let fundHeartBool = fundingHeartState === false ? true : false;
  let fundHeartBool2 = fundingHeartState === false ? true : false;

  const fundingcard = props.fundcard;
  const fundId = fundingcard.fundId;
  let [fundHeartBool ,setFundHeartBool] = React.useState(fundHeartBool2);

  const ChangeLike = () => {
    setFundHeartBool(fundHeartBool);
    if (fundHeartBool == false) {
      dispatch(getActions.addLikeDB(fundHeartBool, fundId))
      fundHeartBool = true;
    } else {
      dispatch(getActions.addLikeDB(fundHeartBool, fundId))
      fundHeartBool = false;
    }
  };
  

  return (
    <React.Fragment>
      <Wrap>
        <Body>
          <ImgSt         
          style={{ backgroundImage: `url(${fundingcard.bookImg})` }}>
            <div id='img_wrap'>
              <div id='img'>
              <BsPlayCircle
                id='icon'
                color="#FFFFFF"
                size="30px"
                onClick={() => {
                  history.push(`/fundingDetail/${fundId}`)
                }}
                />
                <img src={fundingcard.bookImg}
                onClick={() => {
                  history.push(`/fundingDetail/${fundId}`)
                }}/>
              <FundHeart
                ChangeLike={ChangeLike}
                fundHeartBool={fundHeartBool}
              />
              {/* {fundHeartBool === false ?
              <AiOutlineHeart id="heart" size="40px"               
                onClick={ChangeLike}
              />
              :
              <AiFillHeart              
                id='fillHeart'
                size="40px"
                onClick={ChangeLike}
              />
            } */}
              </div>
            </div>
          </ImgSt>
          <h3 style={{ fontSize: "16px" }}>
           {fundingcard.bookTitle}
          </h3>
          <Text margin="0px 0px 0px 10px">{fundingcard.sellerName}</Text>
        </Body>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  height: 200px;
  margin: 12px 12px 0px 12px;
  /* margin-right: 1px; */
  background-color: yellow;
`

const Body = styled.div`
  width: 100%;
  
  cursor: pointer;

  h3 {
    width: 175px;

    font-size: 14px;
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;

    margin-left: 10px;
    margin-bottom: 10px;

  }
`

const ImgSt = styled.div`
  width: 250px;
  height: 250px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat : no-repeat;
  background-size : cover;
  background: #EFEFEF;
  border-radius: 10px;

  #img_wrap {
    width: 250px;
    height: 250px;

    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
  
  #img {
    width: 130px;
    /* height: 162px; */
    /* background-color: gray; */

    #icon {
      position : absolute;
      left: 108px;
      top: 110px;
      background: rgba(76, 76, 76, 0.7);
      border-radius: 50px;
      padding: 1px 1px 1px 2px;
      /* border: 1px solid black; */
    }

    img {
      width: 100%;
      height: 100%;    
    }

    #heart {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: #EFEFEF;
  }

  #fillHeart {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: #EFEFEF;
  }
}
`

export default FundingCard;
