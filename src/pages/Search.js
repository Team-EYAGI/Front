import React from 'react'
import styled from 'styled-components';
import SearchBookCard from '../components/SearchBookCard';
import SearchSellerCard from '../components/SearchSellerCard';
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
        {bookInfo && (bookInfo.length !== 0) ?
          <Body>
            {bookInfo && bookInfo.map((item, idx) =>
              <SearchBookCard key={idx} item={item} />
            )
            }
          </Body>
          :
          <Empty>
            <span>
              검색된 도서가 없네요!
            </span>
          </Empty>
        }
        <Header>
          총 {authorInfo ? authorInfo.length : 0}명의 작가가 검색되었습니다.
        </Header>

        {authorInfo && (authorInfo.length !== 0) ?
          <Body>
            {authorInfo && authorInfo.map((item, idx) =>
              <SearchBookCard key={idx} item={item} />
            )
            }
          </Body>
          :
          <Empty>
            <span>
              검색된 작가가 없네요!
            </span>
          </Empty>
        }

        <Header>
          총 {userInfo ? userInfo.length : 0}명의 크리에이터가 검색되었습니다.
        </Header>

        {userInfo && (userInfo.length !== 0) ?
          <Body>
            {userInfo && userInfo.map((item, idx) =>
              <SearchSellerCard key={idx} item={item} />
            )
            }
          </Body>
          :
          <Empty>
            <span>
              검색된 크리에이터가 없네요!

            </span>
          </Empty>
        }

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
  min-height: 250px;

  margin-top: 20px;
  margin: 0 auto;
  flex-wrap: wrap;

  display: flex;

`

const Empty = styled.div`
  width: 1000px;
  min-height: 150px;

  margin-top: 20px;
  margin: 0 auto;
  flex-wrap: wrap;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    background-color: #F4F4F4;
    text-align: center;
    width: 200px;
    padding: 10px 5px;
    border-radius: 5px;
  }
`

export default Search;