import React from "react";
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

  const fundingcard = props.fundcard;
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
              </div>
            </ImgSt>
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
          </PlayerImg>
          {/* <h5>크리에이터 : 크리에이터 이름</h5> */}
          <Info>
            <h4>{fundingcard.sellerName}</h4>
            <h4>목표</h4>
            <AiOutlineHeart id="heart"/>
          </Info>
          <div id="creator">{fundingcard.content}</div>
        </Player>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 450px;
  position: relative;
  margin: 0 auto;
  display: flex;
  background-color: lightblue;
  border: 1px solid gray;
  border-radius: 25px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-style: normal;
  font-size: 18px;
`;

const Player = styled.div`
  width: 380px;
  background-color: red;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  padding-bottom: 30px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;

  h3 {
    width: 200px;
    float: left;
    margin: 27px 0px 16px 0px;
    font-size: 25 px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h4 {
    width: 200px;
    float: left;
    margin: 0px 0px 16px 0px;
    font-size: 16px;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h5 {
    width: 200px;
    float: left;
    margin: 0px 0px 16px 0px;
    font-size: 16px;
    font-weight: 300;
  }

  #creator {
    width: 300px;
    height: 167px;
    background-color: #f4f4f4;
    border-radius: 15px;
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
  align-items: stretch;

  h4 {
    background-color: white;
    border: 1px solid gray;
    border-radius: 10px;
    width: 80px;
    float: left;
    padding: 10px;
    margin: 17px 0px 16px 0px;
    font-size: 15 px;
  }

  /* h2 {
    background-color: white;
    border: 1px solid gray;
    border-radius: 10px;
    width: 100px;
    float: left;
    margin: 17px 0px 16px 0px;
    font-size: 15 px;
  } */

  #heart{
    background-color: white;
    border: 1px solid gray;
    border-radius: 10px;
    width: 80px;
    float: left;
    padding: 10px;
    margin: 17px 0px 16px 0px;
    font-size: 15 px;
  }
`;

const PlayerImg = styled.div`
  width: 380px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #f4f4f4;
  padding-bottom: 30px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const ImgSt = styled.div`
  width: 386px;
  height: 386px;
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
    width: 386px;
    height: 386px;

    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
  }

  #img {
    width: 190px;
    height: 278px;
    background-color: gray;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default FundingCard;
