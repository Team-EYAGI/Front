import React from "react";
import styled from "styled-components";
import { Text } from "../elements/Index";
import { history } from "../redux/configureStore";

const SearchBookCard = (props) => {

  return (
    <React.Fragment>
        <Wrap>
          <Body
            onClick={() => {
              history.push(`/bookdetail/${props.item.category}/${props.item.bookId}`)
            }}>
            <ImageBox>
            <img
              style={{ width: "100%", height: "100%" }}
              src="http://image.kyobobook.co.kr/images/book/large/786/l9791190238786.jpg"
            />
            </ImageBox> 
              <h3 style={{ fontSize: "16px" }}>
                오늘부터 1일
              </h3>
            <Text margin="0px">지은이</Text>
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

  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Body = styled.div`
  width: 220px;

  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;

  h3 {
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
`

const ImageBox = styled.div`
  border: 1px solid lightgray;
  box-shadow: 0 0 2px gray;

  width: 220px;
  height: 300px;
`

export default SearchBookCard;
