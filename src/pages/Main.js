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
  }, []);

  const main = useSelector((state) => state.book.main);

  const bestBook = main.BestBook;
  const selfBook = main.self;

  console.log("추천도서", bestBook)
  console.log("자기계발", selfBook)

  return (
    <React.Fragment>
      <SliderWrap>
        <MainAdBanner/>
      </SliderWrap>
      <Wrap>
        <MainBookList bestBook={bestBook}/>
      </Wrap>
      <Wrap>
        <MainCategoryBookList selfBook={selfBook}/>
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