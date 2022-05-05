import React from "react";
import styled from "styled-components";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {BsFillPlayFill} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/fund";

import { useParams } from 'react-router-dom';


const FundingCard = (props) => {
  console.log(props.fundcard)

const fundingcard = props.fundcard
    return (
    <React.Fragment>
      <Wrap>
        <Player>
          <PlayerImg>
            <Img>
              <img style={{ width: "100%", height: "100%"}}
                src={fundingcard.bookImg}
              />
            </Img>
            <AudioPlayer             
              className='audio' 
              autoPlay={false} 
              src={fundingcard.fundFile}
              volume={1}
              // progressUpdateInterval            
              // onListen={()=>{}}
              // ListenInterval
              onPlay={e => console.log("onPlay")}
              // other props here
            />
          </PlayerImg>
          <h3>{fundingcard.bookTitle}</h3>
          <h4>저자 : {fundingcard.author}</h4>
          {/* <h5>크리에이터 : 크리에이터 이름</h5> */}
          <h3>{fundingcard.sellerName}</h3>
          <div id='creator'>
          {fundingcard.content}
          </div>
        </Player>
        
      </Wrap>
    

    </React.Fragment>
    ) }
    
  const Wrap = styled.div `
    width: 1440px;
    position: relative;
    margin: 0 auto;
    display: flex;
    background-color: lightblue;
  `
    
    const Player = styled.div`
    width: 464px;
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
      width: 464px;
      float: left;
      margin: 27px 0px 16px 0px;
      font-size: 25 px;
    }

    h4 {
      width: 464px;
      float: left;
      margin: 0px 0px 16px 0px;
      font-size: 16px;
      font-weight: 300;
    }

    h5 {
      width: 464px;
      float: left;
      margin: 0px 0px 16px 0px;
      font-size: 16px;
      font-weight: 300;
    }

    #creator {
      width: 464px;
      height: 227px;
      background-color: #F4F4F4;
      border-radius: 15px;
    }

    /* 오디오 플레이어 커스텀 */
    .audio {
      width: 100%;
      border-radius: 20px;
      background-color: black;

      div {
        background : "white";
          color : white;
      }

      div.rhap_progress-filled {
        background-color : white;
      }

      button {
        color : white;
      }
    }
    `

const PlayerImg = styled.div `
  width: 464px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #F4F4F4;
  padding-bottom: 30px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Img = styled.div`
  background-color: gray;

  width: 268px;
  height: 340px;
  margin: 0 auto;
  margin-top: 62px;
  margin-bottom: 30px;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`


export default FundingCard;
