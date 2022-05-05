import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as getActions } from "../redux/modules/book";
import { actionCreators as addActions } from "../redux/modules/audio";



const ReviewWirte = (props) => {

  const dispatch = useDispatch();

  const params = useParams();
  console.log(params)
  const category = params.category;
  const bookId = params.bookId;
  const audioBookId = params.audioBookId;
  const newCommentId = params.newCommentId;

  // 로그인한 사용자인지 확인
  const is_login = localStorage.getItem("is_login");

  const is_edit = newCommentId ? true : false;

  const [title, setTitle] = React.useState(is_edit ? "요청 이유를 수정해주세요" : "");
  const [content, setContent] = React.useState(is_edit ? "요청 이유를 수정해주세요" : "");

  return (
    <ModalBack>
      <ModalBox>
        <div style={{ width: "700px" }}>
          <GoBack>
            <button onClick={() => history.goBack()}>X</button>
          </GoBack>
        </div>
        <div>
          <input
            type="text"
            placeholder="제목"
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <input
            type="text"
            placeholder="내용"
            onChange={(e) => {
              setContent(e.target.value)
            }}
          />
        </div>
        <div>
          <button
            onClick={() => {
              dispatch(addActions.addReviewAC(
                category,
                bookId,
                audioBookId,
                title,
                content));
            }}>후기 등록</button>
        </div>
      </ModalBox>
    </ModalBack>
  );
};

export default ReviewWirte;

const ModalBox = styled.div`
  position: absolute;
  top: calc(25vh - 100px);
  left: calc(40vw - 200px);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 750px;
  height: 700px;
  flex-direction: column;
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const GoBack = styled.div`
  height: 60px;

  button {
    width: 30px;
    height: 30px;
    float: right;
    border: 1px solid gray;
    border-radius: 5px;
    background: none;
  }
`;

const PlayerImg = styled.div`
  width: 464px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #F4F4F4;
  padding-bottom: 30px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Img = styled.div`
  background-color: gray;

  width: 268px;
  height: 340px;
  margin: 0 auto;
  margin-top: 62px;
  margin-bottom: 30px;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`