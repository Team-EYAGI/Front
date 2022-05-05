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

const GridSt = styled.div`
  /* background-color: green; */
  width: 100%;
  display: flex;
  flex-direction: row;
  font-family: 'Noto Sans KR', sans-serif;
`

const WrapSt = styled.div`
  /* background-color: yellow; */
  width: 700px;
  min-height: 350px;
  margin: auto;
  padding: 0px 0px 0px 70px;
`

const WrapSt1 = styled.div`
  /* background-color: yellow; */
  width: 900px;
  min-height: 350px;
  margin: auto;
`

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  
  button {
    width: 160px;
    height: 50px;
    margin: 10px 0px 10px 20px;
    border: 1px solid lightgray;
    background: white;
  }
`

const UlSt = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0px;
  padding-bottom: 2px;
  height: 33px;
  list-style-type: none;
`

const UlSt1 = styled.ul`
  display: flex;
  align-items: center;
  justify-content: left;
  /* margin: 2px; */
  padding: 30px 0px 0px 30px;
  padding-bottom: 2px;
  height: 33px;
  list-style-type: none;
  & li {
    margin-right: 10px;
  }
`

const BottomSt = styled.div`
  color: gray;
  padding: 0px 0px 30px 33px;
  a {
    text-decoration-line: none;
  }
`

const FooterSt = styled.ul`
  background-color: #F2F2F2;
  height: 50px;
  text-align: center;
  padding: 30px;
  font-size: 10px;
  color: gray;
`
export default Footer;