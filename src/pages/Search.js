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
      <HeaderSt>
        총 {bookInfo ? bookInfo.length : 0}건의 도서가 검색되었습니다.
      </HeaderSt>
      <Wrap>
        {bookInfo && bookInfo.map((item, idx) =>
          <SearchBookCard key={idx} item={item} />
        )
        }
      </Wrap>
      <HeaderSt>
        총 {authorInfo ? authorInfo.length : 0}명의 작가가 검색되었습니다.
      </HeaderSt>
      <Wrap>
        {authorInfo && authorInfo.map((item, idx) =>
          <SearchBookCard key={idx} item={item} />
        )
        }
      </Wrap>
      <HeaderSt>
        총 {userInfo ? userInfo.length : 0}명의 크리에이터가 검색되었습니다.
      </HeaderSt>
      <Wrap>
        {userInfo && userInfo.map((item, idx) =>
          <SearchBookCard key={idx} item={item} />
        )
        }
      </Wrap>
    </React.Fragment>
  )
}

const HeaderSt = styled.div`
  width: 1200px;
  height: 16px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  position: relative;
  margin-top: 60px;
  margin-bottom: 40px;
  
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
  /* background-color: red; */
`

const Wrap = styled.div`
  width: 1200px;
  /* background-color: yellow; */
  min-height: 440px;

  margin-top: 20px;
  margin: auto;
  flex-wrap: wrap;

  display: flex;
  justify-content: left;
  align-items: center;
`


export default Search;