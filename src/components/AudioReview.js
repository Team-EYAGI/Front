import React from 'react';
import styled from 'styled-components';
import { BsFillPlayFill } from "react-icons/bs";

const AudioReview = (props) => {
  return (
    <React.Fragment>
      <ListBox>
          <div id='listname'>
            <h3>후기</h3>
          </div>
          <div>
            카드 목록
          </div>
      </ListBox>
    </React.Fragment>
  )
}

const ListBox = styled.div`
  width: 1310px;
  background-color: yellow;

  margin: 0 auto;

  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;

  #listname {
    display: flex;
    flex-direction: row;
    align-items: center;

    h3 {
      font-size: 25px;
      margin-right: 10px;
    }

    span {
      font-size: 18px;
      color: #707070;
    }
  }

  #listbox {
    width: 708px;
    height: 652px;

    padding: 44px 46px;

    border: 1px solid gray;
    border-radius: 20px;

    #list {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      
      margin-bottom: 10px;

      h3 {
        font-size: 20px;
      }
    }
  }
`

const PlayerSt = styled.div`
  background-color: #EAEAEA;

  width: 50px;
  height: 50px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  border-radius: 20px;
  
  cursor: pointer;
`


export default AudioReview;