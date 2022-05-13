import React from 'react'
import styled from 'styled-components';
import SearchBookCard from '../components/SearchBookCard';
import { useDispatch, useSelector } from 'react-redux';

const Search = (props) => {

  const search = useSelector((state) => state.search.search_list);
  console.log(search)

  const bookInfo = search.book;
  console.log(bookInfo)

  const authorInfo = search.author;
  const userInfo = search.user;


  return (
    <React.Fragment>
      <Wrap>
        <HeaderSt>
          총 {bookInfo ? bookInfo.length : 0}건의 도서가 검색되었습니다.
        </HeaderSt>
        <Body>
          {bookInfo && bookInfo.map((item, idx) =>
            <SearchBookCard key={idx} item={item} />
          )
          }
        </Body>
        <HeaderSt>
          총 {authorInfo ? authorInfo.length : 0}명의 작가가 검색되었습니다.
        </HeaderSt>
        <Body>
          {authorInfo && authorInfo.map((item, idx) =>
            <SearchBookCard key={idx} item={item} />
          )
          }
        </Body>
        <HeaderSt>
          총 {userInfo ? userInfo.length : 0}명의 크리에이터가 검색되었습니다.
        </HeaderSt>
        <Body>
          {userInfo && userInfo.map((item, idx) =>
            <SearchBookCard key={idx} item={item} />
          )
          }
        </Body>
      </Wrap>
    </React.Fragment>
  )
}

const HeaderSt = styled.div`
  width: 1100px;
  height: 16px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  position: relative;
  margin-top: 60px;
  margin-bottom: 40px;
  
  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

const Wrap = styled.div`
  width: 1100px;
  min-height: 1000px;

  margin-top: 20px;
  margin: 0 auto;
  flex-wrap: wrap;

  display: flex;
  justify-content: left;
  align-items: center;
`

const Body = styled.div`
  width: 1000px;
  min-height: 240px;

  margin-top: 20px;
  margin: 0 auto;
  flex-wrap: wrap;

  display: flex;
  justify-content: left;
  align-items: center;
`


export default Search;