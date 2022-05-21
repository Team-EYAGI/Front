import React from "react";
import styled from "styled-components";
import { Text } from "../elements/Index";
import { history } from "../redux/configureStore";

const SearchSellerCard = (props) => {
  return (
    <React.Fragment>
         <Wrap>
        <Body
          onClick={() => {
            history.push(`/sellerProfile/${props.item.sellerId}/audiobook`)
          }}>
          <ImageBox>
            <img
              style={{ width: "100%" }}
              alt="크리에이터 이미지"
              src={props.item.sellerImg ? props.item.sellerImg : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTB2Sn%2FbtrB4PINn6v%2FpPKEkCp0WIdi5JI9NGvzrk%2Fimg.png"}
            />
          </ImageBox>
          <h3 style={{ fontSize: "16px" }}>
            {props.item.username}
          </h3>
        </Body>
      </Wrap>
    </React.Fragment>
  );
};


const Wrap = styled.div`
  height: 200px;
  margin: 10px;
`

const Body = styled.div`
  width: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  cursor: pointer;

  h3 {
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
`

const ImageBox = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 100px;

  overflow: hidden;
  border: 1px solid #878787;
  box-shadow: 0 0 2px gray;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  img {
    width:100%;
    height:100%;
    object-fit:cover;
  }
`

export default SearchSellerCard;
