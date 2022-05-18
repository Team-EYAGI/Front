import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as getActions } from "../redux/modules/fund";
import FundingCard from "../components/FundingCard";
import FundingWrite from "../pages/FundingWrite";
import Like from "../components/Like";

const FundingDetail = () => {
  const params = useParams();
  const fundId = params.fundingId;

  const dispatch = useDispatch();
  const [fundHeartBool, setFundHeartBool] = useState(true);

  // const addLike = () => {
  //   if (fundHeartBool == false){
  //     setFundHeartBool(true)
  //     dispatch(getActions.addLikeDB(fundHeartBool, fundingcard.fundId));
  //   }else{
  //     setFundHeartBool(false)
  //     dispatch(getActions.addLikeDB(fundHeartBool, fundingcard.fundId));
  //   }
  // }

  // const fundingcard = props.fundcard;
  // const fundId = fundingcard.fundId;

  const funding = useSelector((state) => state.fund.fund_list);
  console.log(funding);
  const fundingDetail = funding
    ? funding.find((p) => p.fundId == fundId)
    : null;
    console.log(fundingDetail)

  const player = useRef();

  // useEffect(() => {
  //   player.current.audio.current.pause();
  // }, [fundingDetail]);

  useEffect(() => {
    dispatch(getActions.getFundingAC());
  }, []);

  return (
    <React.Fragment>
      { fundingDetail ? 
      <Wrap>
        <Player>
          {/* 책 정보 */}
          <h3>{fundingDetail.bookTitle}</h3>
          <h4>{fundingDetail.author}</h4>
          <PlayerImg>
            <ImgSt
            style={{ backgroundImage: `url(${fundingDetail.bookImg})` }}
            >
              <div id="img_wrap">
                <div id="img"><img src={fundingDetail.bookImg} /></div>
                {/* 오디오 플레이어 */}
                <AudioPlayer
                  className="audio"
                  autoPlay={false}
                  src={fundingDetail.fundFile}
                  volume={1}
                  showJumpControls={false}
                  ref={player}
                  onPlay={(e) => console.log("onPlay")}
                />
              </div>
            </ImgSt>
          </PlayerImg>
          {/* 펀딩정보 */}
          <Info>
            <div id="Sell">{fundingDetail.sellerName}</div>
            <div className="heart">
              목표 <br /> {fundingDetail.fundingGoals}개
            </div>
            <Like fundingcard="" />
          </Info>
          <div id="creator">{fundingDetail.content}</div>
        </Player>
      </Wrap>
      :
      null
    }
      
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 464px;
  height: 800px;
  position: relative;
  display: flex;
  background: #ffffff;
  border: none;
  border-radius: 15px;
  margin: auto;
  font-style: normal;
  font-size: 18px;
`;

const Player = styled.div`
  width: 464px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 30px;
  font-weight: 500;
  font-style: normal;

  h3 {
    width: 464px;
    height: 50px;
    float: left;
    margin: 15px 0px 0px 0px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h4 {
    width: 190px;
    float: left;
    margin: 0px 0px 15px 0px;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8e8e8e;
  }

  h5 {
    width: 190px;
    float: left;
    margin: 0px 0px 16px 0px;
    font-size: 16px;
    font-weight: 300;
  }

  #creator {
    width: 444px;
    height: 140px;
    border-radius: 10px;
    border: 1px solid #c4c4c4;
    padding: 10px;
  }

  /* 오디오 플레이어 커스텀 */
  .audio {
    width: 100%;
    height: 80px;
    border-radius: 20px;
    background: none;
    box-shadow: none;

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
  margin: 16px 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  #Sell {
    border: 1px solid gray;
    border-radius: 10px;
    width: 277px;
    height: 60px;
    margin-right: 5px;
    font-size: 15 px;
    text-align: center;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .heart {
    border: 1px solid gray;
    border-radius: 10px;
    width: 85px;
    height: 60;
    margin-right: 5px;
    font-size: 15 px;
    text-align: center;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PlayerImg = styled.div`
  width: 464px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const ImgSt = styled.div`
  width: 464px;
  height: 342px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;

  #img_wrap {
    width: 464px;
    height: 342px;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 30px;
  }

  #img {
    width: 149px;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  img {
    width: 100%;
    border-radius: 2px 10px 10px 2px;
  }
`;

export default FundingDetail;
