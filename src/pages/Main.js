import React from 'react';
import styled from 'styled-components';
import MainAdBanner from '../components/MainAdBanner';
import MainBookList from '../components/MainBookList';
import MainCategoryBookList from '../components/MainCategoryBookList';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/book";

const Main = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getActions.getMainAC());
    dispatch(getActions.getMainCategoryAC());
  }, []);

  const main = useSelector((state) => state.book.main);
  const mainCategory = useSelector((state) => state.book.main_category);

  console.log(main)
  console.log(mainCategory)


  return (
    <React.Fragment>
      <SliderWrap>
        <MainAdBanner/>
      </SliderWrap>
      <Wrap>
        <MainBookList main={main}/>
      </Wrap>
      <Wrap>
        <MainCategoryBookList mainCategory={mainCategory}/>
      </Wrap>
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

  margin: 0 auto;
  margin-bottom: 20px;
  
  position: relative;
  
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', sans-serif;
`

export default Main;