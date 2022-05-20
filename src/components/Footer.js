import React from 'react';
import Grid from '../elements/Grid';
import styled from 'styled-components';

const Footer = () => {
  return (
    <React.Fragment>
      <hr style={{ width: "98%", border: "1px solid lightgray" }} />
      <Grid>
        <FooterSt>
          <div>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLSf4EEoK4iAInYa6WSKKHjGxSI9d0URR5Ib6dEd0SCqy17tgCA/viewform'>1:1 문의</a> &nbsp;| &nbsp;
            <span>이용안내</span> &nbsp; | &nbsp;
            <span
              onClick={() => {
                window.open('https://www.instagram.com/_eyagi_/')
              }}
            >인스타그램</span> &nbsp; | &nbsp;
            <span
              onClick={() => {
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSf4EEoK4iAInYa6WSKKHjGxSI9d0URR5Ib6dEd0SCqy17tgCA/viewform')
              }}
            >만족도 조사</span>
          </div>
          <br />
          송은혜(BE) 김승균(BE) 권윤주(BE) 최지은(FE) 권효빈(FE) 이아영(DE) 서지윤(DE)<br /><br />
          {/* 마켓컬리에서 판매되는 상품 중에는 마켓컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.<br/>
          마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.<br/><br/> */}
          © TEAM EYAGI. ALL RIGHTS RESERVED
        </FooterSt>
      </Grid>
    </React.Fragment>
  )
}

const FooterSt = styled.ul`
  background-color: #FFFFFC;
  height: 120px;
  text-align: center;
  padding: 30px;
  font-size: 13px;
  color: gray;

  div {
    font-size: 25px;
    padding: 0px 0px 20px 0px;

    a {
      color: gray;
      text-decoration: none;
      
      :hover {
        cursor: pointer;
        color: purple;
      }
    }
  }
`
export default Footer;