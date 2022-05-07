import React from 'react';
import MainSellerCard from './MainSellerCard';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

const MainSellerList = () => {
  return (
    <React.Fragment>
      <Wrap>
        <span>Best Seller</span>
      </Wrap>
      <Bottom>
        <MainSellerCard />
        <MainSellerCard />
        <MainSellerCard />
        <MainSellerCard />
        <MainSellerCard />
        <MainSellerCard />
      </Bottom>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  margin: 60px 240px 40px 240px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

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

export default MainSellerList;