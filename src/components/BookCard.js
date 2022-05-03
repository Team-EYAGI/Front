import React from "react";
import styled from "styled-components";
import { Text } from "../elements/Index";
import { history } from "../redux/configureStore";

const CategoryBookCard2 = (props) => {

  return (
    <React.Fragment>
      <Wrap>
        <Body
          onClick={() => {
            history.push(`/bookdetail/${props.item.category}/${props.item.bookId}`)
          }}>
          <ImageBox>
          <img
            style={{ width: "100%" }}
            src={props.item.bookImg}
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
  height: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 10px;

  
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Body = styled.div`
  width: 220px;
  
  cursor: pointer;

  h3 {
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
`

const ImageBox = styled.div`
  width: 220px;
  height: 300px;
  /* box-shadow: 0 0 2px gray; */

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  img {
  border: 1px solid lightgray;
  border-radius: 5px;

  }
`

export default CategoryBookCard2;
