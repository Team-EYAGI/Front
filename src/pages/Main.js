import React from 'react';
import styled from 'styled-components';
import MainAdBanner from '../components/MainAdBanner';
import MainBookList from '../components/MainBookList';
import MainCategoryBookList from '../components/MainCategoryBookList';
import MainSellerList from '../components/MainSellerList';
import MainFundingList from '../components/MainFundingList';
import useSWR from "swr";
import fetcher from "../shared/Fetcher";


const Main = () => {

  // 쿠키
  const { data } = useSWR(process.env.REACT_APP_BASE_URL + `/cookie`, fetcher)

  return (
    <React.Fragment>
      <SliderWrap>
        <MainAdBanner/>
      </SliderWrap>
      <FunddingWrap>
        <MainFundingList/>
      </FunddingWrap>
      <BookListWrap>
        <MainBookList/>
      </BookListWrap>
      <SellerWrap>
        <MainSellerList/>
      </SellerWrap>
      <CategoryWrap>
        <MainCategoryBookList/>
      </CategoryWrap>
    </React.Fragment>
  )
}

// 메인의 크기는 1100px로 고정
const BookListWrap = styled.div`
  width: 1100px;
  height: 600px;
  position: relative;
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  margin-bottom: 20px;
`

const CategoryWrap = styled.div`
  width: 1100px;
  min-height: 550px;
  position: relative;
  display: flex;
  flex-direction: column;
  
  margin: 0 auto;
  margin-bottom: 20px;
`

const SellerWrap = styled.div`
  width: 1100px;
  height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
`

const FunddingWrap = styled.div`
  width: 1100px;
  height: 440px;
  position: relative;
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
`

const SliderWrap = styled.div`
  max-width: 1920px;
  min-width: 1200px;
  max-height: 450px;
  height: 100%;

  position: relative;

  margin-top: 100px;
  margin: 0 auto;
`

export default Main;