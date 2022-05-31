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
              alt="책 이미지"
              style={{ width: "100%", height: "100%" }}
              src={props.item.bookImg}
            />
          </ImageBox>
          <h3>
            {props.item.title}
          </h3>
          <Text margin="0px">{props.item.author}</Text>
        </Body>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`

  height: 380px;
  margin: 12.5px;

  :hover {
      transform: scale(0.95);
    }

`

const Body = styled.div`
  width: 100%;

  h3 {
    width: 195px;

    font-size: 14px;
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
    margin: 12px 0px 5px 0px;
  }
`

const ImageBox = styled.div`
  width: 195px;
  height: 280px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  

  img {
    border: 1px solid lightgray;
    border-radius: 2px 10px 10px 2px;
    cursor: pointer;
  }
`

export default BookCard;
