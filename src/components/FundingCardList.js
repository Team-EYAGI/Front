import React from "react";
import styled from "styled-components";
import FundingCard from "./FundingCard";
import InfinityScroll from "../shared/InfinityScroll";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as getActions } from "../redux/modules/fund";

import { FcApproval } from "react-icons/fc";

const FundingCardList = (props) => {
  const dispatch = useDispatch();
  const fund = props.funding;

  // 무한스크롤
  // const paging = useSelector((state) => state.fund.paging);
  // const is_loading = useSelector((state) => state.fund.is_loading);
  return (
    <React.Fragment>
      <AudioHeader>오디오 펀딩 > 펀딩 리스트</AudioHeader>
      <FundingInfo>
        <li>▶ 원하는 펀딩이 있다면 펀딩 상세페이지에서 좋아요를 눌러주세요!</li>
        <li>▶ 목표가 달성되면 해당 크리에이터의 오디오북을 들을 수 있어요.</li>

        <li>
          ▶ <FcApproval size="20px" /> 표시가 있는 카드는 펀딩이 완료된
          카드예요!
        </li>
      </FundingInfo>
      <Wrap>
        {fund.map((item, idx) => (
          <FundingCard key={idx} fundcard={item} />
        ))}
      </Wrap>
    </React.Fragment>
  );
};

const AudioHeader = styled.div`
  width: 1100px;
  height: 60px;

  margin: 50px auto 10px auto;
  position: relative;
  display: flex;
  align-items: center;
`;

const FundingInfo = styled.div`
  width: 1100px;
  /* background-color: red; */
  margin: 0 auto;
  /* position: relative; */
  /* display: flex; */
  /* align-items: center; */
  li {
    /* background-color: green; */
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

const Wrap = styled.div`
  width: 1100px;
  margin-top: 20px;
  margin: 0 auto;
  min-height: 1000px;

  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

export default FundingCardList;
