import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { Text } from '../elements/Index';
import { BsFillPlayFill } from "react-icons/bs";
import { actionCreators as reviewActions } from "../redux/modules/audio";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AudioReview = (props) => {

  const dispatch = useDispatch();
  console.log("오디오 리뷰 아이디 받아야함", props.item)

  const params = useParams();
  // console.log(params)
  const bookId = params.bookId
  const audioBookId = params.audioBookId
  const category = params.category
  const commentId = props.item.commentId
  // console.log(commentId)

  const username = localStorage.getItem("username");
  const reviewUsername = props.item.username
  // console.log(username, reviewUsername)

  const deleteReview = () => {
    // 리뷰를 삭제할 때 commentId를 찾아 삭제할 예정
    dispatch(reviewActions.deleteReviewAC(commentId))
    history.replace(`/audioPlay/${category}/${bookId}/${audioBookId}`)
  }
  return (
    <React.Fragment>
      <ListBox>
        <div id="listbox">
          {/* {username === reviewUsername ?
            <div>
              <button onClick={() => { history.push(`/reviewWrite/${category}/${bookId}/${audioBookId}/${commentId}`) }}>수정</button>
              <button onClick={deleteReview}>X</button>
            </div>
            :
            null
          } */}

          <Body>
            <div id='bodytitle'>
              <h3 style={{ fontSize: "16px" }}>
                {props.item.title}
              </h3>
              <h5>
                {props.item.username}
              </h5>
            </div>
            <div id='bodytitle'>
              <h4>
                {props.item.content}
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
    </React.Fragment>
  )
}

const ListBox = styled.div`
  display: flex;
  flex-direction: row;


  height: 87px;

  border-bottom: 0.5px solid #000000;

  #listbox {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    margin: 10px;
  }
`


const Body = styled.div`
  width: 100%;

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