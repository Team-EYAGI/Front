import React from 'react';
import styled from 'styled-components';
import BookCard from '../components/BookCard';
import { useParams } from "react-router-dom";

import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/book";


// 카테고리 북 페이지
const Book = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params)
  const categoryName = params.category

  // 각 카테고리별 도서 목록 가져오기
  const novel = useSelector((state) => state.book.category_novel);
  const poem = useSelector((state) => state.book.category_poem);
  const self = useSelector((state) => state.book.category_self);
  const economy = useSelector((state) => state.book.category_economy);
  const kids = useSelector((state) => state.book.category_kids);
  // console.log("소설", novel)
  // console.log("시", poem)
  // console.log("키즈", kids)

  React.useEffect(() => {
    if (categoryName === "자기계발") {
      dispatch(getActions.getSelfAC());
    } else if (categoryName === "소설") {
      dispatch(getActions.getNovelAC());
    } else if (categoryName === "시･에세이") {
      dispatch(getActions.getPoemAC());
    } else if (categoryName === "유･아동") {
      dispatch(getActions.getKidsAC());
    } else {
      dispatch(getActions.getEconomyAC());
    }
  }, []);

  // 카테고리 버튼
  const [category, setCategory] = React.useState([
    "자기계발",
    "소설",
    "시･에세이",
    "유･아동",
    "경제",
  ])


  const [btn, setBtn] = React.useState([])

  return (
    <React.Fragment>
      <HeaderSt>
         {category.map((item, idx) => (
           <GenreSt

            key={idx}
            onClick={(e) => {
              history.push(`/book/${item}`);
              if (item === "자기계발") {
                setBtn("자기계발")
                dispatch(getActions.getSelfAC());
              } else if (item === "소설") {
                setBtn("소설")
                dispatch(getActions.getNovelAC());
              } else if (item === "시･에세이") {
                setBtn("시･에세이")
                dispatch(getActions.getPoemAC());
              } else if (item === "유･아동") {
                setBtn("유･아동")
                dispatch(getActions.getKidsAC());
              } else {
                setBtn("경제")
                dispatch(getActions.getEconomyAC());
              }
            }}
            size="20"
            // style={{  color: (category.find((i) => i == btn))
            //     ? "#E8E8E8"
            //     : "#0361FB"
            // }}
            
              value={item[0]}
          >
            {item}
          </GenreSt>
          ))}
        </HeaderSt>
      <Wrap>
      {categoryName === "소설" ? novel.map((item, idx) => (
        <BookCard key={idx} item={item}/>
      ))
      :
      categoryName === "시･에세이" ? poem.map((item, idx) => (
        <BookCard key={idx} item={item}/>))
      : 
      categoryName === "자기계발" ? self.map((item, idx) => (
        <BookCard key={idx} item={item}/>))
      :
      categoryName === "경제" ? economy.map((item, idx) => (
        <BookCard key={idx} item={item}/>))
      :
      categoryName === "유･아동" ? kids.map((item, idx) => (
        <BookCard key={idx} item={item}/>))
      :
      null
      }
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  width: 1100px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const HeaderSt = styled.div`
  width: 1100px;
  height: 60px;
  margin: 0 auto;

  margin-top: 20px;
  margin-bottom: 80px;

  display: flex;
  justify-content: center;
`

const GenreSt = styled.h3`
  width: 100px;
  height: 30px;

  margin: 20px 10px 0px 10px;

  padding-bottom: 9px;
  background: #FFFFFF;
  border: 1px solid #D3D3D3;
  border-radius: 100px;
  
  font-weight: 400;
  font-size: 16px;

  text-align: center;
  line-height: 40px;
  color: #767676;

  cursor: pointer;
  :hover {
    background: #0C0A0A;
    color: #FFFFFF;
  }
`


export default Book;