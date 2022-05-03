import styled from 'styled-components';
import React from 'react';
import MainCategoryBookCard from '../components/MainCategoryBookCard';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const CategoryBookList = (props) => {
  const history = useHistory();
  const params = useParams();
  console.log(params)

  const selfBook = props.selfBook;

  const [genre, setGenre] = React.useState([
    "자기계발",
    "소설",
    "시･에세이",
    "유･아동",
    "경제",
  ])

  return (
    <React.Fragment>
      <HeaderSt>
         {genre.map((item, idx) => (
           <GenreSt
            // 카테고리 클릭 시 각 카테고리 페이지로 이동
            onClick={() => {
              history.push(`/book/${item}`);
            }}
            key={idx}
            size="20"
            color="white"
          >
            {item}
          </GenreSt>
          ))}
        </HeaderSt>
      <Wrap>
        {selfBook && selfBook.map((item, idx) => (
          <MainCategoryBookCard key={idx} item={item}/>
        ))}
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  width: 1440px;

  padding-top: 100px;
  margin: 0 auto;
  
  display: flex;
  justify-content: space-around;

  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const HeaderSt = styled.div`
  width: 100%;
  height: 60px;

  margin: auto;
  
  display: flex;
  flex-direction: row;
  
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
  
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
  width: 140px;
  height: 40px;

  border: 2px solid gray;
  border-radius: 20px;
  box-sizing: border-box;

  margin: 20px 10px 50px 10px;

  text-align: center;
  line-height: 40px;
  color: #333333;

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
    border: 1px solid gray;
    box-shadow: 0 0 3px black;
  }
`


export default CategoryBookList;