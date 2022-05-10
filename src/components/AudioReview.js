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
  // console.log("오디오 리뷰 아이디 받아야함", props.item)

  const params = useParams();
  // console.log(params)
  const bookId = params.bookId
  const audioBookId = params.audioBookId
  const category = params.category
  const commentId = props.item.commentId
  // console.log(commentId)

  const username = localStorage.getItem("username");
  const reviewUsername = props.item.username

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
                {props.item.username}
              </h3>
              <div>
                <button onClick={() => { history.push(`/reviewWrite/${category}/${bookId}/${audioBookId}/${commentId}`) }}>수정</button>
                <button onClick={deleteReview}>X</button>
              </div>
            </div>

            <span>
              {props.item.title}
            </span>
            {/* <hr />
            <Text margin="0px">{props.item.content}</Text> */}
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

  /* background-color: rebeccapurple; */

  font-family: 'Pretendard';
  font-style: normal;
  /* background-color: rebeccapurple; */


  border-bottom: 0.5px solid #000000;

  #listbox {
    
    display: flex;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    margin: 10px;
    /* background-color: burlywood; */

    h3 {
      font-weight: 500;
      font-size: 16px;
      color: #8E8E8E;
    }

    span {
      font-weight: 400;
      font-size: 16px;
      color: #000000;

    }
    /* background-color: rebeccapurple; */
  }
`


const Body = styled.div`
  width: 100%;
  /* background-color: yellow; */
  h3 {
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }

  span {
    /* background-color: red; */
  }

  #bodytitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 24px;
    /* background-color: white; */
    margin-bottom: 10px;
  }
`

export default AudioReview;