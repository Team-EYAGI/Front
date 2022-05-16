import React from "react";
import { useBeforeunload } from "react-beforeunload";
import styled from "styled-components";
import { BsXSquare } from "react-icons/bs";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as reviewActions } from "../redux/modules/audio";



const ReviewWirte = (props) => {
 
  const dispatch = useDispatch();

  // 새로고침 경고 알럿
  useBeforeunload((event) => event.preventDefault());

  const params = useParams();
  const category = params.category;
  const bookId = params.bookId;
  const audioBookId = params.audioBookId;
  const commentId = params.commentId;

  const audioReview = useSelector((state) => state.audio.review_list);

  // 수정하기
  const is_edit = commentId ? true : false;

  // 수정하는 페이지인 경우 commentId를 비교
  let _review = is_edit ? audioReview.find((p) => p.commentId == commentId) : null;

  const [title, setTitle] = React.useState(_review ? _review.title : "");
  const [content, setContent] = React.useState(_review ? _review.content : "");

  return (
    <ModalBack>
      <ModalBox>
        <div style={{ width: "700px" }}>
          <GoBack>
            <BsXSquare id="icon" onClick={() => history.goBack()} size="30px" />
          </GoBack>
        </div>
        <Content>
          <div>
            <p>후기 작성하기</p>
            <h3>제목 |</h3>
            <input
              maxLength='30'
              type="text"
              defaultValue={title}
              placeholder="제목을 30자 이내로 작성해주세요."
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
            <h3>내용 |</h3>
            <textarea
              maxLength='80'
              type="text"
              defaultValue={content}
              placeholder="내용을 80자 이내로 작성해주세요."
              onChange={(e) => {
                setContent(e.target.value)
              }}
            />
          </div>

          {is_edit ?
            <div>
              <button
                disabled={title === "" || content === ""}
                onClick={() => {
                  if (title === "" || content === "") {
                    window.alert("내용을 모두 입력해주세요!")
                    return;
                  }
                  dispatch(reviewActions.editReviewAC(
                    category,
                    bookId,
                    audioBookId,
                    title,
                    content,
                    commentId,
                  ));
                }}
              >수정하기</button>
            </div>
            :
            <div>
              <button
                disabled={title === "" || content === ""}
                onClick={() => {
                  if (title === "" || content === "") {
                    window.alert("내용을 모두 입력해주세요!")
                    return;
                  }
                  dispatch(reviewActions.addReviewAC(
                    category,
                    bookId,
                    audioBookId,
                    title,
                    content,
                  ));
                }}
              >등록하기</button>
            </div>
          }
        </Content>
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

const Content = styled.div`

  width: 90%;
  height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* align-items: center; */

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-weight: 700;
      font-size: 25px;
      margin-bottom: 30px;
    }

    h3 {
      font-size: 20px;
      width: 97%;
      margin: 30px 0px 0px 0px;
      font-weight: 700;
    }

    input {
      width: 91%;
      margin-top: 10px;
      padding: 20px;

      resize: none;
      background-color: #FFFFFF;
      border: 1px solid #C4C4C4;
      border-radius: 10px;

      font-size: 14px;
      font-family: Pretendard;
      font-weight: 400;
      font-style: normal;
    }

    textarea {
      width: 91%;
      margin-top: 10px;
      padding: 20px;

      resize: none;
      background: #FFFFFF;
      border: 1px solid #C4C4C4;
      border-radius: 10px;

      font-size: 14px;
      font-family: Pretendard;
      font-weight: 400;
      font-style: normal;
    }

    button {
      width: 342px;
      height: 60px;
      margin: 40px 0px;

      background: #0C0A0A;
      color: #FFFFFF;
      border-radius: 10px;

      font-size: 20px;
      font-family: Pretendard;
      font-weight: 700;
      font-style: normal;

      cursor: pointer;

      :disabled {
        background: #F4F4F4;
        color: #8E8E8E;
        border: 1px solid #E4E4E4;
        cursor: auto;
      }
    }
  }
`

export default ReviewWirte;