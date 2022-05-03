import React from 'react';
import styled from 'styled-components';

const MyPage = () => {
  return (
    <React.Fragment>
      <Wrap>
        <Menu>
          <Profile>
            <Img></Img>
            <div></div>
          </Profile>
          <div>

          </div>
          <button>

          </button>
        </Menu>
        <Body>

        </Body>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  /* background-color: lightblue; */
  padding-bottom: 30px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Menu = styled.div`
  width: 342px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  background-color: red;
  padding-bottom: 30px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Body = styled.div`
  width: 952px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  background-color: yellow;
  padding-bottom: 30px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Profile = styled.div`

`

const Img = styled.div`

`

export default MyPage;