import React from 'react';
import Image from '../elements/Image';
import { history } from '../redux/configureStore';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../styles/slide.css";

// import required modules
import { Pagination, Autoplay } from "swiper";

const Slider = () => {
  return (
    <React.Fragment>
      {/* Swiper-autoplay-react + pagination 적용 */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {Image.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.src}
              alt={item.alt}
              onClick={() => {
                if(item.category === 'novel') {
                  history.push(`/bookdetail/novel/302`)
                }
              }}
              className={(item.category === 'novel') ? 'click': ''}
              />
          </SwiperSlide>
        ))}
      </Swiper>
    </React.Fragment>
  )
}


export default Slider;