import React from 'react';
import MainFundingCard from './MainFundingCard';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import useSWR from "swr";
import fetcher from "../shared/Fetcher";
import Spinner from '../elements/Spinner';

const MainFundingList = () => {

  // 메인 펀딩 리스트 가져오기
  const { data, error } = useSWR(process.env.REACT_APP_BASE_URL + `/main/fund`, fetcher)
    
  if (error) {
    return <div>ERROR...</div>
  }
  if (!data) {
    return <Spinner/>
  }

  return (
    <React.Fragment>
      <Wrap>
        <span style={{ fontSize: "20px", fontWeight: "700" }}>오디오 펀딩</span>
        <span
          style={{ fontSize: "16px" }}
          id="plus"
          onClick={() => {
            history.push(`/funding`)
          }}
        >더 보러가기</span>
      </Wrap>
      <Bottom>
        
        {data.map((item, idx) => (
          <MainFundingCard key={idx} item={item} />
        ))}
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
  border-bottom: 2px solid #000000;

  span {
    margin: 0px 10px 15px 21px;
    font-weight: 400;
  }

  #plus:hover {
    cursor: pointer;
    color: #D05943;
  }
`

const Bottom = styled.div`
  width: 1100px;
  margin: 0 auto;
  
  display: flex;
  justify-content: left;
`

export default MainFundingList;