import React from 'react';
import Grid from '../elements/Grid';
import styled from 'styled-components';

const Footer = () => {
  return (
    <React.Fragment>
      <hr style={{width: "98%", border: "1px solid lightgray"}}/>
      <Grid>
        <FooterSt>
          마켓컬리에서 판매되는 상품 중에는 마켓컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.<br/>
          마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.<br/><br/>
          © KURLY CORP. ALL RIGHTS RESERVED
        </FooterSt>
      </Grid>
    </React.Fragment>
  )
}

const FooterSt = styled.ul`
  background-color: #F2F2F2;
  height: 100px;
  text-align: center;
  padding: 30px;
  font-size: 10px;
  color: gray;
`
export default Footer;