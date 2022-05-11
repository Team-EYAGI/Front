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

  const selfBook = props.mainCategory;

  const [genre, setGenre] = React.useState([
    "자기계발",
    "소설",
    "시･에세이",
    "유･아동",
    "경제",
  ])

  return (
    <React.Fragment>
            <Wrap>
        <span style={{fontSize: "20px", fontWeight: "700"}}>카테고리별 오디오북</span>
        <span
          style={{fontSize: "16px"}}
          id="plus"
          onClick={() => {
            history.push(`/funding`)
          }}
        >카테고리 전체보기</span>
      </Wrap>
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
      <Body>
        {selfBook && selfBook.map((item, idx) => (
          <MainCategoryBookCard key={idx} item={item}/>
        ))}
      </Body>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 60px 0px 0px 0px;

  font-size: 30px;
  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;

  border-bottom: 2px solid #000000;
  span {
    margin: 0px 10px 15px 21px;
    /* background-color: rebeccapurple; */     
  }

  #plus:hover {
    cursor: pointer;
    color: violet; 
  }
`

const Body = styled.div`
  width: 1100px;

  padding-top: 28px;
  margin: 0 auto;
  
  display: flex;
  justify-content: space-around;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

const HeaderSt = styled.div`
  width: 1100px;

  margin: 0 auto;
  
  display: flex;
  flex-direction: row;
  
  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;

`

const GenreSt = styled.h3`
  width: 100px;
  height: 30px;

  margin: 48px 7px 0px 0px;

  padding-bottom: 9px;
  background: #FFFFFF;
  border: 1px solid #D3D3D3;
  border-radius: 100px;

  text-align: center;
  line-height: 40px;
  color: #333333;

  font-size: 16px;
  cursor: pointer;
  :hover {
    border: 1px solid gray;
    box-shadow: 0 0 3px black;
  }
`


export default CategoryBookList;