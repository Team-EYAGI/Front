import React, { useState } from "react";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as getActions } from "../redux/modules/fund";

import { useParams } from "react-router-dom";

const FundingCard = (props) => {
  console.log(props.fundcard);
  const dispatch = useDispatch();
  const [fundHeartBool, setFundHeartBool] = useState(true)

  const addLike = () => {
    //로그인후가능한거넣기

    if (fundHeartBool == false){
      setFundHeartBool(true)
      dispatch(getActions.addLikeDB(fundHeartBool, fundingcard.fundId)); 
    }else{
      setFundHeartBool(false)
      dispatch(getActions.addLikeDB(fundHeartBool, fundingcard.fundId)); 
    }
  }

  const fundingcard = props.fundcard;
  const fundId = fundingcard.fundId;
  console.log(fundId)


  return (
    <React.Fragment>
      <Wrap>
        <Player>
          <h3>{fundingcard.bookTitle}</h3>
          <h4>{fundingcard.author}</h4>
          <PlayerImg>
            <ImgSt style={{ backgroundImage: `url(${fundingcard.bookImg})` }}>
              <div id="img_wrap">
                <div id="img">
                  <img src={fundingcard.bookImg} />
                </div>
                <AudioPlayer
              className="audio"
              autoPlay={false}
              src={fundingcard.fundFile}
              volume={1}
              // progressUpdateInterval
              // onListen={()=>{}}
              // ListenInterval
              onPlay={(e) => console.log("onPlay")}
              // other props here
            />
              </div>              
            </ImgSt>
            
          </PlayerImg>         
          <Info>
            <div id="Sell">{fundingcard.sellerName}</div>
            <div className="heart">목표</div>
            <div className="heart"
            onClick={addLike}
            >하트</div>
            {/* 온클릭 이벤트 : 좋아요 누르면 채워진 하트, 좋아요 취소하면 비워진 하트 기능
          {(like && (
            <AiFillHeart
              size="28"
              style={{ margin: "8px" }}
              onClick={delLike}
              color="red"
            />
          )) || (
              <AiOutlineHeart
                size="28"
                style={{ margin: "8px" }}
                onClick={addLike}
              />
            )} */}
          </Info>
          <div id="creator">{fundingcard.content}</div>
        </Player>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 390px;
  height: 645px;
  position: relative;
  /* margin: 0 auto; */
  display: flex;
  background: #FFFFFF;
  border: 1px solid #EAEAEA;  
  border-radius: 15px;
  margin-bottom: 41px;
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 18px;
`;

const Player = styled.div`
  width: 342px;
  /* background-color: red; */

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  padding-bottom: 30px; 
  font-weight: 500;
  font-style: normal;
  font-family: 'Pretendard';
  

  h3 {
    width: 200px;
    float: left;
    margin: 17px 0px 7px 0px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h4 {
    width: 200px;
    float: left;
    margin: 0px 0px 16px 0px;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8E8E8E;
  }

  h5 {
    width: 200px;
    float: left;
    margin: 0px 0px 16px 0px;
    font-size: 16px;
    font-weight: 300;
  }

  #creator {
    width: 322px;
    height: 141px;
    border-radius: 10px;
    border: 1px solid #C4C4C4;
    padding: 10px;
  }

  /* 오디오 플레이어 커스텀 */
  .audio {
    width: 100%;
    height: 80px;
    border-radius: 20px;
    background: none;

    div {
      background: "white";
      color: white;
    }

    div.rhap_progress-filled {
      background-color: white;
    }

    button {
      color: white;
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: stretch; */
  /* background-color: purple; */
  margin: 16px 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  #Sell {
    /* background-color: yellow; */
    border: 1px solid gray;
    border-radius: 10px;
    width: 158px;
    height: 60px;
    /* float: left; */
    /* padding: 10px; */
    /* margin: 17px 0px 16px 0px; */
    font-size: 15 px;
    text-align: center;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .heart {
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
  }

  #heart{
    background-color: white;
    border: 1px solid gray;
    border-radius: 10px;
    width: 80px;
    float: left;
    padding: 10px;
    margin: 17px 0px 16px 0px;
    font-size: 15 px;
    text-align: center;
    vertical-align: middle;
  }
`;

const PlayerImg = styled.div`
  width: 342px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* background-color: yellow; */
  /* padding-bottom: 30px; */
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const ImgSt = styled.div`
  width: 342px;
  height: 342px;
  /* background-color: gray; */
  /* background-image: ; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;

  #img_wrap {
    width: 342px;
    height: 342px;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
  }

  #img {
    width: 148px;
    height: 224px;
    background-color: gray;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default FundingCard;
