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
    dispatch(getActions.getNovelAC());
    dispatch(getActions.getPoemAC());
    dispatch(getActions.getEconomyAC());
    dispatch(getActions.getKidsAC());
    dispatch(getActions.getSelfAC());
  }, []);

  // 카테고리 버튼
  const [category, setCategory] = React.useState([
    "자기계발",
    "소설",
    "시･에세이",
    "유･아동",
    "경제",
  ])

  return (
    <React.Fragment>
      <HeaderSt>
         {category.map((item, idx) => (
           <GenreSt
            key={idx}
            onClick={() => {
              history.push(`/book/${item}`);
            }}


            size="20"
            color="white"
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
  /* background-color: lightblue; */

  width: 1200px;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const HeaderSt = styled.div`
  width: 1200px;
  height: 60px;
  margin: 0 auto;

  margin-top: 20px;
  margin-bottom: 100px;

  display: flex;
  justify-content: center;
  /* align-items: center; */

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

const GenreSt = styled.h3`
  width: 140px;
  height: 40px;

  margin: 20px 10px 0px 10px;

  border: 2px solid black;
  border-radius: 20px;
  box-sizing: border-box;

  text-align: center;
  line-height: 40px;
  color: #333333;

  

  cursor: pointer;
  :hover {
    border: 1px solid gray;
    box-shadow: 0 0 3px black;
  }
`


export default Book;