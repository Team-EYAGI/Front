import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements/Index";
import { history } from "../redux/configureStore";

const CategoryBookCard = (props) => {
  return (
    <React.Fragment>
        <Wrap onClick={() => {history.push(`/bookdetail/${props.item.category}/${props.item.bookId}`)}}>
          <ImageBox>
            <img
              style={{ width: "100%" }}
              src={props.item.bookImg}
            />
            </ImageBox> 
            <TextBox>
              <Text id="text" size="18px" bold margin="10px 0px 10px 0px">{props.item.title}</Text>
              <Text margin="0px">{props.item.author}</Text>
            </TextBox>
        </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 250px;
  margin: 10px;
  padding: 4px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;


  cursor: pointer;
`

const ImageBox = styled.div`
  width: 250px;
  height: 310px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  img {
    border: 1px solid lightgray;
    border-radius: 5px;
  }

`

const TextBox = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
`

export default CategoryBookCard;
