import React from 'react';
import MainFundingCard from './MainFundingCard';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

const MainFundingList = () => {
  return (
    <React.Fragment>
      <Wrap>
        <span>오디오 펀딩</span>
        <span
          id="plus"
          onClick={() => {
            history.push(`/funding`)
          }}
        >더 보기 ></span>
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

  margin: 60px 240px 40px 240px;

  font-size: 30px;
  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;

  span {
    font-size: 20px;
    margin: 0px 20px;
    /* background-color: rebeccapurple; */     
  }

  #plus:hover {
    cursor: pointer;
    color: violet; 
  }
`

const Bottom = styled.div`
  width: 1440px;
  margin: 0 auto;
  
  display: flex;
  justify-content: space-around;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

export default MainFundingList;