import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { BsPlayCircle } from "react-icons/bs";
import { Text } from "../elements/Index";

const MainFundingCard = (props) => {

  const mainFunding = props.item

  return (
    <React.Fragment>
      <Wrap>
        <Body>
          <ImgSt
            style={{ backgroundImage: `url(${mainFunding.bookImg})` }}
            onClick={() => {
              history.push(`/fundingDetail/${mainFunding.fundId}`)
            }}
          >
            <div id='img_wrap'>
              <div id='img'>
                <BsPlayCircle id='icon' color="#FFFFFF" size="30px"/>
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
  margin: 10px 15px;
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

    #icon {
      position : absolute;
      left: 81px;
      top: 80px;
      background: rgba(76, 76, 76, 0.7);
      border-radius: 50px;
      padding: 0px;
    }

    img {
      width: 100%;
      height: 100%;    
    }
  }
`


export default MainFundingCard;