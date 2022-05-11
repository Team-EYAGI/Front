import React from 'react';
import MainSellerCard from './MainSellerCard';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

const MainSellerList = (props) => {

  const creator = props.mainCreator

  return (
    <React.Fragment>
      <Wrap>
        <span>오늘의 크리에이터</span>
      </Wrap>
      <Bottom>
      {creator && creator.map((item, idx) => (
          <MainSellerCard key={idx} item={item}/>
        ))}
      </Bottom>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  margin: 60px 0px 40px 0px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-size: 30px;
  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;

  /* background-color: yellow; */
  border-bottom: 2px solid #000000;

  span {
    font-size: 20px;
    font-weight: 700;
    margin: 0px 10px 15px 21px;
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

export default MainSellerList;