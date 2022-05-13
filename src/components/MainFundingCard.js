import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { BsPlayFill } from "react-icons/bs";
import { Text } from "../elements/Index";

const MainFundingCard = (props) => {

  const mainFunding = props.item
  // console.log("메인펀딩 프롭스", mainFunding)

  return (
    <React.Fragment>
      <Wrap>
        <Body>
          <ImgSt style={{ backgroundImage: `url(${mainFunding.bookImg})` }}>
            <div id='img_wrap'>
              <div id='img'>
                <BsPlayFill id='icon' color="white" size="20px"/>
                <img src={mainFunding.bookImg}/>
              </div>
            </div>
          </ImgSt>
          <h3 style={{ fontSize: "16px" }}>
           {mainFunding.bookTitle}
          </h3>
          <Text margin="0px 0px 0px 10px">{mainFunding.sellerName}</Text>
        </Body>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  height: 200px;
  margin: 10px;
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
  width: 190px;
  height: 190px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat : no-repeat;
  background-size : cover;
  background: #EFEFEF;
  border-radius: 10px;

  #img_wrap {
    width: 190px;
    height: 190px;

    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
  
  #img {
    width: 100px;
    /* height: 162px; */
    /* background-color: gray; */

    #icon {
      position : absolute;
      left: 88px;
      top: 80px;
      background-color: #000000;
      border-radius: 50px;
      padding: 1px 1px 1px 2px;
      /* border: 1px solid black; */
    }

    img {
      width: 100%;
      height: 100%;    
    }
  }
`


export default MainFundingCard;