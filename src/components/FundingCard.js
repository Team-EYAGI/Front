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

const FundingCard = (props) => {
  // console.log("펀딩카드 좋아요값" ,props)
  const dispatch = useDispatch();

  const fundingHeartState = props.fundcard.myHeart

  // const addLike = () => {
  //   if (fundHeartBool == false) {
  //     setFundHeartBool(true);
  //     dispatch(getActions.addLikeDB(fundHeartBool, fundingcard.fundId));
  //   } else {
  //     setFundHeartBool(false);
  //     dispatch(getActions.addLikeDB(fundHeartBool, fundingcard.fundId));
  //   }
  // };

  const fundingcard = props.fundcard;
  const fundId = fundingcard.fundId;
  const fundHeartBool = fundingHeartState === false ? true : false;

  const [a, setA] = useState(fundingHeartState);

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
              {a === false ?
              <AiOutlineHeart id="heart" size="40px"               
                onClick={() => {
                  if(fundingHeartState === false) {
                    setA(true)
                    dispatch(getActions.addLikeDB(fundHeartBool, fundId));
                  } else {
                    setA(false)
                    dispatch(getActions.addLikeDB(fundHeartBool, fundId));
                  }


                }}
              />
              :
              <AiFillHeart              
                id='fillHeart'
                size="40px"
                onClick={() => {
                  if(fundingHeartState === false) {
                    setA(true)
                    dispatch(getActions.addLikeDB(fundHeartBool, fundId));
                  } else {
                    setA(false)
                    dispatch(getActions.addLikeDB(fundHeartBool, fundId));
                  }
                }}
              />
            }

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
  margin: 11px;
  /* margin-right: 1px; */
`

const Body = styled.div`
  width: 100%;
  /* background-color: rebeccapurple; */
  
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
