import React from "react";
import styled from "styled-components";
import { Text } from "../elements/Index";
import { history } from "../redux/configureStore";

const MyPageAudioBook = (props) => {
// console.log(props.item)

  return (
    <React.Fragment>
            <Wrap>
        <Body>
          <ImageBox
            onClick={() => {
              history.push(`/bookdetail/${props.item.category}/${props.item.bookId}`)
            }}
          >
            <img
              style={{ width: "100%" }}
              src={props.item.bookImg}
            />
          </ImageBox>
          <h3 style={{ fontSize: "16px" }}>
            {props.item.title}
          </h3>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text margin="0px">{props.item.author}</Text>
            <Text color="gray" margin="0px">삭제</Text>
          </div>
        </Body>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  /* height: 410px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0px 7px 40px 7px;

  
  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

const Body = styled.div`
  width: 180px;

  /* background-color: red; */
  margin-top: 10px;
  
  h3 {
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
`

const ImageBox = styled.div`
  width: 180px;
  height: 260px;
  /* box-shadow: 0 0 2px gray; */

  background-color: purple;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 2px 10px 10px 2px;

  img {
  border: 1px solid lightgray;
  border-radius: 2px 10px 10px 2px;
  cursor: pointer;
  }

  button {
    position: absolute;
    
  }
`

export default MyPageAudioBook;
