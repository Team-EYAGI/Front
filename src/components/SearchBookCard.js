import React from "react";
import styled from "styled-components";
import { Text } from "../elements/Index";
import { history } from "../redux/configureStore";

const BookCard = (props) => {
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
              src={props.item.bookImg}
              alt="책 이미지"
            />
          </ImageBox>
          <h3 style={{ fontSize: "16px" }}>
            {props.item.title}
          </h3>
          <Text margin="0px">{props.item.author}</Text>
        </Body>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 10px 10px 20px 10px;

  :hover {
    transform: scale(0.95);
    cursor: pointer;
  }
`

const Body = styled.div`
  width: 180px;
  cursor: pointer;
  h3 {
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
`

const ImageBox = styled.div`
  width: 180px;
  height: 260px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

    img {
    border: 1px solid lightgray;
    border-radius: 5px;
  }
`

export default BookCard;
