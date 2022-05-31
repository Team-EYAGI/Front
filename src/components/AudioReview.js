import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { history } from '../redux/configureStore';
import { actionCreators as reviewActions } from "../redux/modules/audio";
import { useDispatch } from 'react-redux';

const AudioReview = (props) => {

  const dispatch = useDispatch();

  const params = useParams();
  const bookId = params.bookId
  const audioBookId = params.audioBookId
  const category = params.category
  const commentId = props.item.commentId

  // 로그인한 유저네임과 리뷰를 작성한 유저네임을 비교하여 수정, 삭제 버튼 활성화
  const username = localStorage.getItem("username");
  const reviewUsername = props.item.username

  const [clickRequest, setClickRequest] = useState(false);

  const deleteReview = () => {
    // 리뷰를 삭제할 때 commentId를 찾아 삭제할 예정
    dispatch(reviewActions.deleteReviewAC(commentId))
    history.replace(`/audioPlay/${category}/${bookId}/${audioBookId}`)
  }

  return (
    <React.Fragment>
      <ListBox
      onClick={() => {
        setClickRequest(!clickRequest);
      }}
      >
        <div id="listbox">
          <Body>
            <div id='bodytitle'>
              <h3 style={{ fontSize: "16px" }}>
                {props.item.username}
              </h3>
              <h4>
                {props.item.createdAt.split("T")[0]}
              </h4>
            </div>
            <div id='bodytitle'>
              <h4>
                {props.item.title}
              </h4>
              {username == reviewUsername ?
                <div>
                  <span onClick={() => { history.push(`/reviewWrite/${category}/${bookId}/${audioBookId}/${commentId}`) }}>수정</span>
                  <span onClick={deleteReview}>삭제</span>
                </div>
                :
                null
              }
            </div>
          </Body>
        </div>
      </ListBox>
      {clickRequest && (
        <ReviewDetail>
          <ReviewWrap>
            <ReviewContent>
              {props.item.content}
            </ReviewContent>
          </ReviewWrap>
        </ReviewDetail>
      )}
    </React.Fragment>
  )
}

const ReviewDetail = styled.div`
  min-height: 80px;
  padding: 10px;
  background-color: #F6F6F6;

  display: flex;
  flex-direction: row;
`

const ReviewWrap = styled.div`
  width: 1000px;
`

const ReviewContent = styled.p`
  margin: 12px 0px 20px 0px;
  text-align: left;
`

const ListBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 87px;
  border-bottom: 0.5px solid #000000;

  #listbox {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px;
  }

  cursor: pointer;
`
const Body = styled.div`
  width: 100%;

  :hover {
      transform: scale(0.99);
      cursor: pointer;
    }

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #8E8E8E;
  }

  h4 {
    font-weight: 400;
    font-size: 16px;
    color: #000000;
  }

  h5 {
    padding: 2px 5px;
    font-weight: 300;
    font-size: 14px;
    color: #FFFFFF;
    background-color: #000000;
    border-radius: 5px;
  }

  span {
    font-weight: 500;
    font-size: 14px;
    color: #8E8E8E;
    margin-right: 3px;
    margin-left: 5px;

    :hover {
      color: #000000;
      cursor: pointer;
    }
  }

  #bodytitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 24px;
    margin-bottom: 10px;
  }
`

export default AudioReview;