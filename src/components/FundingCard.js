import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as getActions } from "../redux/modules/fund";
import { useParams } from "react-router-dom";
import Like from "../components/Like";



const FundingCard = (props) => {
  const dispatch = useDispatch();
  const [fundHeartBool, setFundHeartBool] = useState(true)

  const addLike = () => {
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
  const player = useRef();

  useEffect(() => {
    player.current.audio.current.pause();
  }, [fundingcard]);

  return (
    <React.Fragment>
      <Wrap>
        <Player>
          {/* 책 정보 */}
          <h3>{fundingcard.bookTitle}</h3>
          <h4>{fundingcard.author}</h4>
          <PlayerImg>
            <ImgSt style={{ backgroundImage: `url(${fundingcard.bookImg})` }}>
              <div id="img_wrap">
                <div id="img">
                  <img src={fundingcard.bookImg} />
                </div>
                {/* 오디오 플레이어 */}
                <AudioPlayer
              className="audio"
              autoPlay={false}
              src={fundingcard.fundFile}
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
            <div id="Sell">{fundingcard.sellerName}</div>
            <div className="heart">목표 <br /> {fundingcard.fundingGoals}개</div>
            <Like fundingcard={fundingcard}/>
          </Info>
          <div id="creator">{fundingcard.content}</div>
        </Player>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 340px;
  height: 645px;
  position: relative;
  display: flex;
  background: #FFFFFF;
  border: 1px solid #EAEAEA;  
  border-radius: 15px;
  margin-bottom: 41px;
  margin-right: 20px;
  font-style: normal;
  font-size: 18px;
`;

const Player = styled.div`
  width: 310px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 30px; 
  font-weight: 500;
  font-style: normal;
  

  h3 {
    width: 390px;
    height: 50px;
    float: left;
    margin: 17px 0px 7px 0px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }

  h4 {
    width: 190px;
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
    width: 190px;
    float: left;
    margin: 0px 0px 16px 0px;
    font-size: 16px;
    font-weight: 300;
  }

  #creator {
    width: 290px;
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
    width: 158px;
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
  width: 310px;
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
  width: 310px;
  height: 342px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;

  #img_wrap {
    width: 310px;
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
    width: 130px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
    img {
      width: 100%;
      border-radius: 2px 10px 10px 2px;
  }
`;

export default FundingCard;
