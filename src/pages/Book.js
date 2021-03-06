import React from 'react';
import styled from 'styled-components';
import BookCard from '../components/BookCard';
import { useParams } from "react-router-dom";

import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/book";
import InfinityScroll from "../shared/InfinityScroll";

// 카테고리 북 페이지
const Book = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const categoryName = params.category

  // 각 카테고리별 도서 목록 가져오기
  const novel = useSelector((state) => state.book.category_novel);
  const poem = useSelector((state) => state.book.category_poem);
  const self = useSelector((state) => state.book.category_self);
  const economy = useSelector((state) => state.book.category_economy);
  const kids = useSelector((state) => state.book.category_kids);

  const paging = useSelector((state) => state.book.paging);
  const is_loading = useSelector((state) => state.book.is_loading);

  // 카테고리 버튼
  const [category, setCategory] = React.useState([
    "자기계발",
    "소설",
    "시･에세이",
    "아동･가정",
    "경제",
  ])


  React.useEffect(() => {
    if (categoryName === "자기계발") {
      dispatch(getActions.clearCategory());
      dispatch(getActions.getSelfAC());
    } else if (categoryName === "소설") {
      dispatch(getActions.getNovelAC());
    } else if (categoryName === "시･에세이") {
      dispatch(getActions.getPoemAC());
    } else if (categoryName === "아동･가정") {
      dispatch(getActions.getKidsAC());
    } else {
      dispatch(getActions.getEconomyAC());
    }
    return () => {
      dispatch(getActions.clearCategory());
    }
  }, []);


  return (
    <React.Fragment>
     
      <HeaderSt>      
        {category.map((item, idx) => (
          <GenreSt
            key={idx}
            onClick={() => {
              dispatch(getActions.clearCategory());
              history.push(`/book/${item}`);
              if (item === "자기계발") {
                dispatch(getActions.getSelfAC());
              } else if (item === "소설") {
                dispatch(getActions.getNovelAC());
              } else if (item === "시･에세이") {
                dispatch(getActions.getPoemAC());
              } else if (item === "아동･가정") {
                dispatch(getActions.getKidsAC());
              } else {
                dispatch(getActions.getEconomyAC());
              }
            }}
            style={{
              backgroundColor: (categoryName === item) ? "#0C0A0A" : "#FFFFFF",
              color: (categoryName === item) ? "#FFFFFF" : "#767676",
              border: (categoryName === item) ? "1px solid #0C0A0A" : "1px solid #D3D3D3"
            }}
          >
            {item}
          </GenreSt>
        ))}        
      </HeaderSt>
      <BookInfo>
        <li>▶&nbsp;&nbsp;원하는 도서가 없다면 1 : 1 문의 하기에서 도서를 요청해보세요!</li>
      </BookInfo>
      <br />
      <Wrap>
        {categoryName === "소설" ?
          <InfinityScroll
            callNext={() => {
              dispatch(getActions.getNovelAC(paging.page));
            }}
            is_next={paging.page ? true : false}
            loading={is_loading}
          >
            {novel.map((item, idx) => (<BookCard key={idx} item={item} />))}
          </InfinityScroll>
          :
          categoryName === "시･에세이" ?
            <InfinityScroll
              callNext={() => {
                dispatch(getActions.getPoemAC(paging.page));
              }}
              is_next={paging.page ? true : false}
              loading={is_loading}
            >
              {poem.map((item, idx) => (<BookCard key={idx} item={item} />))}
            </InfinityScroll>
            :
            categoryName === "자기계발" ?
              <InfinityScroll
                callNext={() => {
                  dispatch(getActions.getSelfAC(paging.page));
                }}
                is_next={paging.page ? true : false}
                loading={is_loading}
              >
                {self.map((item, idx) => (<BookCard key={idx} item={item} />))}
              </InfinityScroll>
              :
              categoryName === "경제" ?
                <InfinityScroll
                  callNext={() => {
                    dispatch(getActions.getEconomyAC(paging.page));
                  }}
                  is_next={paging.page ? true : false}
                  loading={is_loading}
                >
                  {economy.map((item, idx) => (<BookCard key={idx} item={item} />))}
                </InfinityScroll>
                :
                categoryName === "아동･가정" ?
                  <InfinityScroll
                    callNext={() => {
                      dispatch(getActions.getKidsAC(paging.page));
                    }}
                    is_next={paging.page ? true : false}
                    loading={is_loading}
                  >
                    {kids.map((item, idx) => (<BookCard key={idx} item={item} />))}
                  </InfinityScroll>
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
  /* justify-content: center; */
  flex-wrap: wrap;
`

const HeaderSt = styled.div`
  width: 1100px;
  height: 60px;
  margin: 0 auto;

  margin-top: 20px;
  margin-bottom: 60px;

  display: flex;
  justify-content: center;
`
const BookInfo = styled.div`
  width: 1100px;
  margin: 0 auto;

  li {
    margin-bottom: 10px;
    padding: 0;
    display: flex;
    color: #8e8e8e;
    font-size: 15px;
    font-weight: 300;
    line-height: 18px;
    letter-spacing: 0px;
  }
`;

const GenreSt = styled.h3`
  width: 100px;
  height: 30px;

  margin: 20px 10px 0px 10px;

  padding-bottom: 9px;
  border: 1px solid #D3D3D3;
  border-radius: 100px;
  
  font-weight: 400;
  font-size: 16px;

  text-align: center;
  line-height: 40px;

  :hover {
      transform: scale(0.95);
      cursor: pointer;
    }
`


export default Book;