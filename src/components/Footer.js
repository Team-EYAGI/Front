import React from 'react';
import Grid from '../elements/Grid';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

const Footer = () => {
  return (
    <React.Fragment>
      <Wrap>
      <hr style={{ width: "98%", border: "1px solid lightgray" }} />
      <Grid>
        <FooterSt>
          <div>
            {/* <span>1:1 문의</span> &nbsp;| &nbsp; */}
            <span
              onClick={() => {
                history.push(`/serviceGuide`)
              }}
            >이용안내</span> &nbsp; | &nbsp;
            <span
              onClick={() => {
                window.open('https://www.instagram.com/_eyagi_/')
              }}
            >인스타그램</span> &nbsp; | &nbsp;
            <span
              onClick={() => {
                window.open('https://forms.gle/2rjuVCkyRtyE17ND8')
              }}
            >오류 제보</span>  &nbsp; | &nbsp;
                        <span
              onClick={() => {
                window.open('https://forms.gle/WzzkXjWKnGXXgKix6')
              }}
            >만족도 조사</span>
          </div>
          <br />
          송은혜(BE) 김승균(BE) 권윤주(BE) 최지은(FE) 권효빈(FE) 이아영(DE) 서지윤(DE)<br /><br />
          © TEAM EYAGI. ALL RIGHTS RESERVED
        </FooterSt>
      </Grid>
      </Wrap>

    </React.Fragment>
  )
}


const Wrap = styled.div`
  background-color: #FFFFFC;
  margin-top: 100px;
  min-width: 1200px;
`
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

   span {
      color: gray;
      text-decoration: none;
      
      :hover {
        cursor: pointer;
        color: #0C0A0A;
      }
    }
  }
`
export default Footer;