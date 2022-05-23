import React from 'react';
import styled from 'styled-components';
import eyagiService from '../src_assets/eyagiService.jpg';
import { history } from '../redux/configureStore';

const ServiceGuide = () => {
  return (
    <React.Fragment>
      <Wrap>
        <img src={eyagiService} alt="이용안내"/>
        <span
          onClick={() => {
            history.push(`/`)
          }}
        >메인으로 바로가기</span>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  width: 1100px;
  min-height: 1000px;

  margin-top: 20px;
  margin: 0 auto;
  flex-wrap: wrap;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    width: 500px;
    height: 100px;

    background: #0C0A0A;
    color: #ffffff;
    margin: 50px 0px 30px 0px;
    border: 1px solid #0C0A0A;
    border-radius: 10px;
    font-size: 40px;
    font-family: Pretendard;
    font-weight: 400;
    font-style: normal;

    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      cursor: pointer;
      transform: scale(0.95);
    }
  }

  img {
    width: 100%;
  }
`

export default ServiceGuide;