import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

const MainSellerCard = (props) => {

  const creator = props.item;
  console.log(creator)

  return (
    <React.Fragment>
      <Wrap>
        <Body
          onClick={() => {
            history.push(`/sellerProfile/${creator.id}/audiobook`)
          }}>
          <ImageBox>
            <img
              style={{ width: "100%" }}
              src={creator ? creator.userImage : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTB2Sn%2FbtrB4PINn6v%2FpPKEkCp0WIdi5JI9NGvzrk%2Fimg.png"}
            />
          </ImageBox>
          <h3 style={{ fontSize: "16px" }}>
            {creator ? creator.username : "이름 없음"}
          </h3>
        </Body>
      </Wrap>
    </React.Fragment>
  )
}

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
  width: 190px;
  height: 190px;
  border-radius: 100px;
  background-color: azure;
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


export default MainSellerCard;