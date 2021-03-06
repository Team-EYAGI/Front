import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import Spinner from "../elements/Spinner";

const Loading = (props) => {
  const params = useParams();

  return (
    <ModalBack>
      <ModalBox>
        {params.result === "success" ?
          <Content>
            <p>등록이 완료되었습니다!</p>
            <div>
              <button
                onClick={() => {
                  history.push('/mypage/listen')
                }}
              >마이페이지로 이동하기</button>
            </div>
          </Content>
          : params.result === "failed" ?
          <Content>
            <p>등록 실패!</p>
            <span> 잘못된 파일 형식입니다!</span>
            <div>
              <button
                onClick={() => {
                  history.push(`/addvoice`)
                }}
              >다시 등록하기</button>
            </div>
          </Content>
          :
          <Content>
            <p>등록중이니 조금만 기다려주세요!</p>
            <div id="spinner">
              <Spinner/>
            </div>
          </Content>
        }
      </ModalBox>
    </ModalBack>
  );
};


const ModalBox = styled.div`
  margin: 11vh auto;
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
  z-index: 5;
`

const Content = styled.div`

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

      margin-bottom: 30px;
    }

    
    button {
      width: 342px;
      height: 60px;
      margin: 40px 0px;

      border-radius: 10px;
      background-color: #000000;
      color: #FFFFFF;

      font-size: 20px;
      font-family: Pretendard;
      font-weight: 700;
      font-style: normal;
      cursor: pointer;
    }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #spinner {
    width: 60px;
    margin-bottom: 130px;
    margin-top: -100px;
  }
`

export default Loading;