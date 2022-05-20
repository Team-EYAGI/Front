import React from "react";
import styled from "styled-components";
import FundingCard from "./FundingCard";
import InfinityScroll from "../shared/InfinityScroll";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as getActions } from "../redux/modules/fund";


const FundingCardList = (props) => {
  const dispatch = useDispatch();
  const fund = props.funding;
  // const heart = useSelector((state) => state.fund.heart);

  // const a = fund ? fund.find((p) => p.fundId !== heart.fund) : null
  // console.log("funding", a ? a.myHeart : null);
  // console.log(heart);

  // let b = a ? a.myHeart : null;

  // 무한스크롤
  const paging = useSelector((state) => state.fund.paging);
  const is_loading = useSelector((state) => state.fund.is_loading);
  return (
    <React.Fragment>
      <AudioHeader>오디오 펀딩  >  펀딩 리스트</AudioHeader>
      <Wrap>
        <InfinityScroll
          callNext={() => {
            console.log("callnext제발");
            dispatch(getActions.getNovelAC(paging.page));
          }}
          is_next={paging.page ? true : false}
          loading={is_loading}
        >
          {fund.map((item, idx) => (
            <FundingCard key={idx} fundcard={item}/>
          ))}
        </InfinityScroll>
      </Wrap>
    </React.Fragment>
  );
};

const AudioHeader = styled.div`
  width: 1200px;
  height: 60px;
  
  margin-top: 20px;
  margin-bottom: 20px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  `

const Wrap = styled.div`
  width: 1100px;
  margin-top: 20px;
  margin: 0 auto;
  height: 1000px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;

  overflow-y: scroll;
    ::-webkit-scrollbar {
     /* 세로 스크롤 넓이 */  
      width: 10px;

      /* 가로 스크롤 높이 */
      height: 8px;

      border-radius: 6px;
      background: black;
      background: rgba(255, 255, 255, 0.4);
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
    }
`;

export default FundingCardList;
