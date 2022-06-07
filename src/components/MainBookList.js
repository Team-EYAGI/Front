import React from 'react'
import styled from 'styled-components';
import MainBookCard from '../components/MainBookCard';
import useSWR from "swr";
import fetcher from "../shared/Fetcher";
import Spinner from '../elements/Spinner';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

// Import Swiper styles
// import "swiper/css";
import "swiper/css/pagination";
import "../styles/slide.css";

const BookList = (props) => {

  // 메인 오디오북 리스트 가져오기
  const { data, error } = useSWR(process.env.REACT_APP_BASE_URL, fetcher)
    
  if (error) {
    return <div>서비스 점검중</div>
  }
  if (!data) {
    return <Spinner/>
  }

  return (
    <React.Fragment>
      <Wrap>
        <span style={{ fontSize: "20px", fontWeight: "700" }}>새로 등록된 오디오북</span>
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
          {data.map((item, idx) => (
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