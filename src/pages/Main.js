import React from 'react';
import styled from 'styled-components';
import MainAdBanner from '../components/MainAdBanner';
import MainBookList from '../components/MainBookList';
import MainCategoryBookList from '../components/MainCategoryBookList';
import MainSellerList from '../components/MainSellerList';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/book";
import MainFundingList from '../components/MainFundingList';

const Main = () => {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(getActions.getMainAC());
    dispatch(getActions.getMainCategoryAC());
    dispatch(getActions.getMainFundingAC());
    dispatch(getActions.getMainCreatorAC());
  }, []);

  const main = useSelector((state) => state.book.main);
  const mainCategory = useSelector((state) => state.book.main_category);
  const mainFunding = useSelector((state) => state.book.main_funding);
  const mainCreator = useSelector((state) => state.book.main_creator);

  return (
    <React.Fragment>
      <SliderWrap>
        <MainAdBanner/>
      </SliderWrap>
      <FunddingWrap>
        <MainFundingList mainFunding={mainFunding}/>
      </FunddingWrap>
      <BookListWrap>
        <MainBookList main={main}/>
      </BookListWrap>
      <SellerWrap>
        <MainSellerList mainCreator={mainCreator}/>
      </SellerWrap>
      <CategoryWrap>
        <MainCategoryBookList mainCategory={mainCategory}/>
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
  width: 100%;
  max-height: 450px;
  height: 100%;

  position: relative;

  margin-top: 100px;
  margin: 0 auto;
`

export default Main;