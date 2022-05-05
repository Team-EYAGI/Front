import React from 'react'
import styled from 'styled-components';
import SearchBookCard from '../components/SearchBookCard';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {

  const search = useSelector((state) => state.search.search_list);
  console.log(search)
  
  return (
    <React.Fragment>
        <HeaderSt>
          총 99,999건의 도서가 검색되었습니다.
        </HeaderSt>
      <Wrap>
        <SearchBookCard/>
        <SearchBookCard/>
        <SearchBookCard/>
        <SearchBookCard/>
        <SearchBookCard/>
        <SearchBookCard/>
        <SearchBookCard/>
        <SearchBookCard/>
        <SearchBookCard/>
        <SearchBookCard/>
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
  margin-top: 81px;
  margin-bottom: 18px;
  
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
  /* background-color: red; */
`

const Wrap = styled.div`
  width: 1200px;

  margin-top: 20px;
  margin: auto;
  flex-wrap: wrap;

  display: flex;
  justify-content: center;
  align-items: center;
`


export default Search;