import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as getActions } from "../redux/modules/fund";
import { useParams } from "react-router-dom";
import Like from "../components/Like";
import { history } from "../redux/configureStore";
import { BsPlayCircle } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { Text } from "../elements/Index";

const FundingCard = (props) => {
  let fundingHeartState = props.fundcard.myHeart;
  const fundingcard = props.fundcard;
  const fundId = fundingcard.fundId;
  const dispatch = useDispatch();


  const authority = localStorage.getItem("seller");


  return (
    <React.Fragment>
      <Wrap>
        <Body>
          <ImgSt
            onClick={() => {
              history.push(`/fundingDetail/${fundId}`);
            }}
            style={{ backgroundImage: `url(${fundingcard.bookImg})` }}
          >
            <div id="img_wrap">
              <div id="img">
                {fundingcard.successFunding === true && (
                  <FcApproval id="crown" size="40px" />
                )}

                <BsPlayCircle
                  id="icon"
                  color="#FFFFFF"
                  size="30px"
                  onClick={() => {
                    history.push(`/fundingDetail/${fundId}`);
                  }}
                />
                <img alt="책 이미지" src={fundingcard.bookImg} />
                {/* <FundHeart
                ChangeLike={ChangeLike}
                fundHeartBool={fundHeartBool}
              /> */}
                {fundingHeartState === false ? (
                  <AiOutlineHeart id="heart" size="40px" />
                ) : (
                  <AiFillHeart id="fillHeart" size="40px" />
                )}
              </div>
            </div>
          </ImgSt>
          <h3 style={{ fontSize: "16px" }}>{fundingcard.bookTitle}</h3>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Text margin="0px 0px 0px 10px">{fundingcard.sellerName}</Text>
          {authority === "ROLE_ADMIN" &&

          <Text
                color="gray"
                margin="0px"
                onClick={() => {
                  if (fundId) {
                    dispatch(getActions.deleteFundingAC(fundId));
                  }
                }}
              >삭제</Text>
}
              </div>
        </Body>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  height: 340px;
  margin: 12px 12px 0px 12px;
  :hover {
    transform: scale(0.95);
  }
`;

const Body = styled.div`
  width: 100%;

  cursor: pointer;

  h3 {
    width: 175px;

    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    margin-left: 10px;
    margin-bottom: 10px;
  }
`;

const ImgSt = styled.div`
  width: 250px;
  height: 250px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background: #efefef;
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
      position: absolute;
      left: 108px;
      top: 110px;
      background: rgba(76, 76, 76, 0.7);
      border-radius: 50px;
      padding: 1px;
      /* border: 1px solid black; */
    }

    #crown {
      position: absolute;
      left: 10px;
      top: 10px;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 2px 10px 10px 2px;
    }

    #heart {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: #efefef;
    }

    #fillHeart {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: #efefef;
    }
  }
`;

export default FundingCard;
