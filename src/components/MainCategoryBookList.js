import styled from 'styled-components';
import React from 'react';
import MainCategoryBookCard from '../components/MainCategoryBookCard';
import { history } from '../redux/configureStore';
import useSWR from "swr";
import fetcher from "../shared/Fetcher";
import Spinner from '../elements/Spinner';

const CategoryBookList = () => {

  const [category, setCategory] = React.useState([
    "자기계발",
    "소설",
    "시･에세이",
    "아동･가정",
    "경제",
  ])

  // 메인 카테고리별 도서 리스트 가져오기
  const { data, error } = useSWR(process.env.REACT_APP_BASE_URL + `/category`, fetcher)
    
  if (error) {
    return <div>서비스 점검중</div>
  }
  if (!data) {
    return <Spinner/>
  }

  return (
    <React.Fragment>
      <Wrap>
        <span style={{ fontSize: "20px", fontWeight: "700" }}>카테고리별 도서</span>
        <span
          style={{ fontSize: "16px" }}
          id="plus"
          onClick={() => {
            history.push(`/book/자기계발`)
          }}
        >카테고리 전체보기</span>
      </Wrap>
      <HeaderSt>
        {category.map((item, idx) => (
          <GenreSt
            // 카테고리 클릭 시 각 카테고리 페이지로 이동
            onClick={() => {
              history.push(`/book/${item}`);
            }}
            key={idx}
            style={{ 
              backgroundColor: idx === 0 ? "#0C0A0A" : "#FFFFFF",
              color: idx === 0 ? "#FFFFFF" : "#767676",
              border : idx === 0 ? "1px solid #0C0A0A" : "1px solid #D3D3D3"
            }}
          >
            {item}
          </GenreSt>
        ))}
      </HeaderSt>
      <Body>
        {data.map((item, idx) => (
          <MainCategoryBookCard key={idx} item={item} />
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
    color: #D05943;
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
  border-radius: 100px;

  text-align: center;
  line-height: 40px;

  font-size: 16px;
  :hover {
      transform: scale(0.95);
      cursor: pointer;
    }
`


export default CategoryBookList;