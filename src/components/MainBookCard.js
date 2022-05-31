import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const BookCard = (props) => {

  return (
    <React.Fragment>
      <DivSt
        onClick={() => {
          history.push(`/bookdetail/${props.item.category}/${props.item.bookId}`)
        }}>
        <CardSt>
          <ImageSt>
            <img
              style={{ width: "100%", height: "100%"  }}
              alt="책 이미지"
              src={props.item.bookImg}
            />
          </ImageSt>
          <NameSt>
            <h3>{props.item.title}</h3>
            <br/>
            <span>{props.item.author}</span>
          </NameSt>
        </CardSt>
      </DivSt>
    </React.Fragment>
  );
};


const DivSt = styled.div`
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: center;

  :hover {
      transform: scale(0.95);
      cursor: pointer;
    }
`;

const CardSt = styled.div`
  width: 200px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 9px;
`;

const ImageSt = styled.div`
  /* background-color: black; */
  width: 200px;
  height: 310px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  img {
    border: 1px solid lightgray;
    border-radius: 2px 10px 10px 2px;
  }
`;

const NameSt = styled.div`
  float: left;
  
  h3 {
    width: 180px;
    /* float: left; */
    margin-top: 15px;
    margin-left: 10px;

    font-size: 16px;
    text-align: left;

    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }

  span {
    float: left;
    margin-top: -30px;
    margin-left: 10px;
    font-size: 16px;
  }
`;



export default BookCard;
