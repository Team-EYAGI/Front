import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import Spinner from "../elements/Spinner";

const LoadingPage = () => {

  const params = useParams();
  const result = params.result;
  const bookId = params.bookId;
  const category = params.category;

  return (
    <React.Fragment>
      <Wrap>
        {result === "success" ?
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
          :
          result === "failed" ?
          <Content>
            <p>등록 실패!</p>
            <span>파일 확장자를 다시 한 번 확인해주세요!</span>
            <div>
              <button
                onClick={() => {
                  history.push(`/audioWrite/${category}/${bookId}`)
                }}
              >다시 등록하기</button>
            </div>
          </Content>
          :
          <Content>
            <p>파일을 등록중입니다. 조금만 기다려주세요!</p>
            <div id="spinner">
              <Spinner/>
            </div>
          </Content>
        }
      </Wrap>
    </React.Fragment>
  )
}


const Wrap = styled.div`
  /* background-color: lightblue; */

  width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderSt = styled.div`
  width: 1200px;
  margin: 80px 0px 60px 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 26px;  
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

  #spinner {
    width: 60px;
    margin-bottom: 130px;
    margin-top: -100px;
  }
`

export default LoadingPage;