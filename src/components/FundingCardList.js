import styled from 'styled-components';
import React from 'react';
import MainCategoryBookCard from '../components/MainCategoryBookCard';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FundingCard from './FundingCard';

const FundingCardList = () => {
  const history = useHistory();
  const params = useParams();
  console.log(params)


  return (
    <React.Fragment>
      <Wrap>
        <FundingCard/>
        <FundingCard/>
        <FundingCard/>
        <FundingCard/>
        <FundingCard/>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  width: 1440px;
  margin-top: 20px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const HeaderSt = styled.div`
  width: 100%;
  height: 60px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-bottom: 20px;
  
  & span {
    font-size: 20px;
    margin: 20px 10px;
    cursor: pointer;

    :hover {
      color: gray;
    }
  }
`

const GenreSt = styled.h3`
  border: 2px solid black;
  border-radius: 20px;
  box-sizing: border-box;
  width: 140px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #333333;
  margin: 20px 10px 0px 10px;

  /* @media screen and (max-width: 1000px) {
    :last-child {
      display: none;
    }
  }

  @media screen and (max-width: 800px) {
    :nth-child(4) {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    :nth-child(3) {
      display: none;
    }
  } */

  cursor: pointer;
  :hover {
    /* background-color: #f49a28; */
    /* color: white; */
    border: 1px solid gray;
    box-shadow: 0 0 3px black;
  }

`;


export default FundingCardList;