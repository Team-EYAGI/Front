import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { BsXSquare } from "react-icons/bs";

const Loading = (props) => {
  return (
    <ModalBack>
      <ModalBox>
        <div style={{ width: "700px" }}>
          <GoBack>
            <BsXSquare id="icon" onClick={() => history.goBack()} size="30px" />
          </GoBack>
        </div>
        <ContentSt>
          <p>등록이 완료되었습니다!</p>

          <div>
            <button
            onClick={() => {
              history.push('/mypage/listen')
            }}
            >마이페이지로 이동하기</button>
          </div>

        </ContentSt>
      </ModalBox>
    </ModalBack>
  );
};



const ModalBox = styled.div`
  position: absolute;
  top: calc(25vh - 100px);
  left: calc(40vw - 150px);
  background-color: #FFFEFC;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  width: 550px;
  height: 550px;
  flex-direction: column;
`

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`

const GoBack = styled.div`
  width: 600px;

  #icon {
    margin-top: 20px;
    float: right;
    cursor: pointer;
  }
`

const ContentSt = styled.div`

  width: 90%;
  height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  #file {
    width: 85%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #F4F4F4;
    border: 1px solid #E4E4E4;
    border-radius: 10px;
    margin-bottom: 10px;

    #addbtn {
      margin: 8px 14px 8px 0px;
      cursor: pointer;
    }

    span {
      width: 400px;
      font-weight: 400;
      font-size: 16px;
      color: #525252;

      margin: 10px 0px 8px 11px;
      white-space: nowrap;
      overflow:hidden;
      text-overflow: ellipsis;
    }
  }

  p {
      font-weight: 700;
      font-size: 25px;
      /* margin: 0px 0px 23px 0px; */

      margin-bottom: 30px;
    }

    
    button {
      width: 342px;
      height: 60px;
      margin: 40px 0px;

      border-radius: 10px;
      background-color: #000000;
      color: #FFFFFF;
      /* box-shadow: 2px 2px 2px 2px gray; */

      font-size: 20px;
      font-family: Pretendard;
      font-weight: 700;
      font-style: normal;
      cursor: pointer;

      :hover {
        box-shadow: 2px 2px 2px 2px gray;
      }
    }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export default Loading;