import React, { useState } from 'react'
import styled from 'styled-components';
import MainBookCard from '../components/MainBookCard';
import { Grid, Text } from "../elements/Index";
import { history } from '../redux/configureStore';


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

// Import Swiper styles
// import "swiper/css";
import "swiper/css/pagination";
import "../styles/slide.css";

const BookList = (props) => {
  console.log("메인 프롭스", props.main)
  const bookList = props.main

  return (
    <React.Fragment>
      <Div>
        <span>추천도서</span>
        <span
            id="plus"
            onClick={() => {
              history.push(`/book/자기계발`);

            }}
          >더보기 ></span>
      </Div>
      <Swiper
        slidesPerView={5}
        spaceBetween={0}
        slidesPerGroup={5}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true
        }}
        autoplay={{ delay: 1000 }}
        navigation={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        <DivSt>
          {/* bookList를 받아와 map 돌려 붙여넣기 */}
          {bookList && bookList.map((item, idx) => (
          <SwiperSlide key={idx}><MainBookCard key={item.bookId} item={item}/></SwiperSlide>
          ))}
        </DivSt>
      </Swiper>
    </React.Fragment>
  )
}

const Div = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 60px;
  margin-bottom: 40px;

  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;

  span {
    font-size: 20px;
    margin: 0px 20px;
    /* background-color: rebeccapurple; */     
  }

  #plus:hover {
    cursor: pointer;
    color: violet; 
  }
`

const DivSt = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
`

export default BookList;