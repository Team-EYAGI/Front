import React from 'react';
import styled from 'styled-components';
import eyagiService from '../src_assets/eyagiService.jpg';

const ServiceGuide = () => {
  return (
    <React.Fragment>
      <Wrap>
        <img src={eyagiService} alt="이용안내"/>
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

  img {
    width: 100%;
  }
`

export default ServiceGuide;