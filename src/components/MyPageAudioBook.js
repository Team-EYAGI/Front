import React from "react";
import styled from "styled-components";
import { Text } from "../elements/Index";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as libraryActions } from "../redux/modules/mypage";

const MyPageAudioBook = (props) => {
  // console.log(props.item)
  const dispatch = useDispatch();

  const params = useParams();
  const category = params.category

  const is_session = localStorage.getItem("is_login");

  const bookId = props.item.bookId;
  const audioBookId = props.item.audioBookId;

  return (
    <React.Fragment>
      <Wrap>
        <Body>
          <ImageBox
            onClick={() => {
              if (category === "likeBook") {
                history.push(`/bookdetail/${props.item.category}/${props.item.bookId}`)
              } else if (category === "listen" || category === "myAudio" || category === "audiobook") {
                if (category === "audiobook" && !is_session) {
                  window.alert("로그인 후 이용 가능합니다!")
                  history.push(`/login`)
                  return;
                }
                history.push(`/audioPlay/${props.item.category}/${props.item.bookId}/${props.item.audioBookId}`)
              } else if (category === "myFunding") {
                history.push(`/funding`)
              }
            }}
          >
            <img
              style={{ width: "100%" }}
              src={props.item.bookImg}
            />
          </ImageBox>
          <h3 style={{ fontSize: "16px" }}>
            {props.item.title}
          </h3>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text margin="0px">{props.item.author}</Text>
            {category === "audiobook" || category === "funding" || category === "myFunding" || category === "myAudio" ?
              null
              :
              <Text
                color="gray"
                margin="0px"
                onClick={() => {
                  if (bookId && audioBookId) {
                    dispatch(libraryActions.deleteAudioBookAC(audioBookId));
                  }
                  if (bookId && !audioBookId) {
                    dispatch(libraryActions.deleteLikeBookAC(bookId));
                  }
                }}
              >삭제</Text>
            }
          </div>
        </Body>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  /* height: 410px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0px 7px 40px 7px;

  
  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

const Body = styled.div`
  width: 170px;
  margin-top: 10px;
  
  h3 {
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
`

const ImageBox = styled.div`
  width: 170px;
  height: 260px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 2px 10px 10px 2px;

  img {
    border: 1px solid lightgray;
    border-radius: 2px 10px 10px 2px;
    cursor: pointer;
  }

  button {
    position: absolute;
  }
`

export default MyPageAudioBook;
