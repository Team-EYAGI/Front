import React from 'react'
import styled from 'styled-components';
import SearchBookCard from '../components/SearchBookCard';

import { useSelector } from 'react-redux';

const Search = (props) => {

  // 검색된 목록 가져오기
  const search = useSelector((state) => state.search.search_list);

  const bookInfo = search.book;
  const authorInfo = search.author;
  const userInfo = search.user;

  return (
    <React.Fragment>
      <Wrap>
        <Header>
          총 {bookInfo ? bookInfo.length : 0}건의 도서가 검색되었습니다.
        </Header>
        <Body>
          {bookInfo && bookInfo.map((item, idx) =>
            <SearchBookCard key={idx} item={item} />
          )
          }
        </Body>
        <Header>
          총 {authorInfo ? authorInfo.length : 0}명의 작가가 검색되었습니다.
        </Header>
        <Body>
          {authorInfo && authorInfo.map((item, idx) =>
            <SearchBookCard key={idx} item={item} />
          )
          }
        </Body>
        <Header>
          총 {userInfo ? userInfo.length : 0}명의 크리에이터가 검색되었습니다.
        </Header>
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

const Header = styled.div`
  width: 1100px;
  height: 16px;
  margin: 0 auto;

  margin-top: 60px;
  margin-bottom: 40px;
`

const Wrap = styled.div`
  width: 1100px;
  min-height: 1000px;

  margin-top: 20px;
  margin: 0 auto;
  flex-wrap: wrap;
`

const Body = styled.div`
  width: 1000px;
  min-height: 240px;

  margin-top: 20px;
  margin: 0 auto;
  flex-wrap: wrap;

  display: flex;
`


export default Search;