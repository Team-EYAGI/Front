import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

const MainFundingCard = () => {
  return (
    <React.Fragment>
      <Wrap>
        <Body>
          <ImageBox>
            <img
              style={{ width: "100%" }}
              src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZfKhY%2FbtrBqGLmp03%2Fd26IOo940K3zO0xLjTFMfK%2Fimg.png'
            />
          </ImageBox>
          <h3 style={{ fontSize: "16px" }}>
            펀딩 제목
          </h3>
        </Body>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  height: 200px;

  margin: 10px;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

const Body = styled.div`
  width: 200px;
  /* background-color: rebeccapurple; */

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
  background-color: azure;
  overflow: hidden;
  border: 1px solid #f4f4f4;
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


export default MainFundingCard;