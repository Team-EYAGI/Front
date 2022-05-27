import React from "react";
import styled from "styled-components";
import MainSellerCard from "../components/MainSellerCard";

const SellerCardList = (props) => {

  const creatorList = props.creatorList;
  return (
    <React.Fragment>
      <AudioHeader>크리에이터 목록</AudioHeader>
      <Wrap>
        {creatorList.map((item, idx) => (
          <MainSellerCard key={idx} item={item} />
        ))}
      </Wrap>
    </React.Fragment>
  );
};

const AudioHeader = styled.div`
  width: 1100px;
  height: 60px;

  margin: 50px auto 10px auto;
  display: flex;
  align-items: center;
`;

const Wrap = styled.div`
  width: 1100px;
  min-height: 300px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

export default SellerCardList;
