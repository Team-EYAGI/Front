import React from 'react';
import styled from 'styled-components';
import MainAdBanner from '../components/MainAdBanner';
import MainBookList from '../components/MainBookList';
import MainCategoryBookList from '../components/MainCategoryBookList';
import MainSellerList from '../components/MainSellerList';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/book";
import { actionCreators as userActions } from "../redux/modules/user";
import MainFundingList from '../components/MainFundingList';

const Main = () => {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(getActions.getMainAC());
    dispatch(getActions.getMainCategoryAC());
  }, []);

  const main = useSelector((state) => state.book.main);
  const mainCategory = useSelector((state) => state.book.main_category);


  return (
    <React.Fragment>
      <SliderWrap>
        <MainAdBanner/>
      </SliderWrap>
      <SellerWrap>
        <MainSellerList/>
      </SellerWrap>
      <Wrap>
        <MainBookList main={main}/>
      </Wrap>
      <FunddingWrap>
        <MainFundingList/>
      </FunddingWrap>
      <CategoryWrap>
        <MainCategoryBookList mainCategory={mainCategory}/>
      </CategoryWrap>
    </React.Fragment>
  )
}

const SliderWrap = styled.div`
  width: 1920px;
  height: 400px;
  position: relative;
  margin: 0 auto;
`

// 메인의 크기는 1440px로 고정
const Wrap = styled.div`
  width: 1440px;
  height: 650px;

  /* background-color: aqua; */


  margin: 0 auto;
  margin-bottom: 20px;
  
  position: relative;
  
  display: flex;
  flex-direction: column;
`

const CategoryWrap = styled.div`
  width: 1932px;
  height: 650px;

  /* background-color: aqua; */


  margin: 0 auto;
  margin-bottom: 20px;
  
  position: relative;
  
  display: flex;
  flex-direction: column;
`

const SellerWrap = styled.div`
  width: 1920px;
  height: 400px;

  /* background-color: aqua; */

  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  
  position: relative;
  
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', sans-serif;
`

const FunddingWrap = styled.div`
  width: 1920px;
  height: 500px;

  /* background-color: aqua; */

  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  
  position: relative;
  
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', sans-serif;
`

export default Main;