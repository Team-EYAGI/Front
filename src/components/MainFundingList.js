import React from 'react';
import MainFundingCard from './MainFundingCard';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

const MainFundingList = () => {
  return (
    <React.Fragment>
      <Wrap>
        <span style={{fontSize: "20px", fontWeight: "700"}}>오디오 펀딩</span>
        <span
          style={{fontSize: "16px"}}
          id="plus"
          onClick={() => {
            history.push(`/funding`)
          }}
        >더 보러가기</span>
      </Wrap>
      <Bottom>
        <MainFundingCard />
        <MainFundingCard />
        <MainFundingCard />
        <MainFundingCard />
        <MainFundingCard />
      </Bottom>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 60px 0px 40px 0px;

  font-size: 30px;
  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;

  border-bottom: 2px solid #000000;
  span {
    margin: 0px 10px 15px 21px;
    font-weight: 400;

    /* background-color: rebeccapurple; */     
  }

  #plus:hover {
    cursor: pointer;
    color: violet; 
  }
`

const Bottom = styled.div`
  width: 1100px;
  margin: 0 auto;
  
  display: flex;
  justify-content: space-around;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

export default MainFundingList;