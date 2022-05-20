import React from 'react'
import styled from 'styled-components';
import MainBookCard from '../components/MainBookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

// Import Swiper styles
// import "swiper/css";
import "swiper/css/pagination";
import "../styles/slide.css";

const BookList = (props) => {

  const bookList = props.main;

  return (
    <React.Fragment>
      <Wrap>
        <span style={{ fontSize: "20px", fontWeight: "700" }}>추천도서</span>
      </Wrap>
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
            <SwiperSlide key={idx}><MainBookCard key={item.bookId} item={item} /></SwiperSlide>
          ))}
        </DivSt>
      </Swiper>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 60px 0px 40px 0px;

  border-bottom: 2px solid #000000;

  span {
    margin: 0px 10px 15px 21px;
  }
`

const DivSt = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
`

export default BookList;