import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements/Index";

const FundingCard = (props) => {
  return (
    <React.Fragment>
        <Wrap>
          <Body>
            <ImageBox>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201905/24/a1c39528-3fb9-4125-a8b6-8a1a4ca19cf4.jpg"
            />
            </ImageBox> 
            <Text size="18px" bold margin="10px 0px 10px 0px">책 제목</Text>            
            <Text margin="0px">저자명</Text>
            <Text size="18px" bold margin="10px 0px 10px 0px">판매자 ID</Text>
            <Text size="18px" bold margin="10px 0px 10px 0px">내용</Text>
            <Text size="18px" bold margin="10px 0px 10px 0px">좋아요 수</Text>
          </Body>
        </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gray;
  padding: 4px;
`

const ImageBox = styled.div`
  width: 260px;
  height: 320px;
`

export default FundingCard;
