import React from "react";
import styled from "styled-components";
import { Text } from "../elements/Index";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as libraryActions } from "../redux/modules/mypage";
import { FcApproval } from "react-icons/fc";
import Swal from 'sweetalert2';

const MyPageAudioBook = (props) => {
  const dispatch = useDispatch();

  const params = useParams();
  const category = params.category;

  const bookId = props.item.bookId;
  const audioBookId = props.item.audioBookId;
  const fundId = props.item.fundId;

  const is_session = localStorage.getItem("is_login");

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
                  Swal.fire({
                    text: "로그인 후 이용 가능합니다!",
                    icon: "warning",
                    confirmButtonText: "로그인하러가기",
                    confirmButtonColor: '#0C0A0A',
                  }).then(result => {
                    if (result.isConfirmed) {
                      history.push(`/login`)
                    }
                  })
                  return;
                }
                history.push(`/audioPlay/${props.item.category}/${props.item.bookId}/${props.item.audioBookId}`)
              } else if (category === "myFunding" || category === "funding") {
                history.push(`/fundingDetail/${fundId}`)
              }
            }}
          >
            <img
              alt="책 이미지"
              style={{ width: "100%" }}
              src={props.item.bookImg}
              className={props.item?.successFunding === true ? 'img' : 'none'}
            />

          </ImageBox>
          <h3 style={{ fontSize: "16px" }}>
            {category === `myFunding` || category === "myAudio" ? props.item.bookTitle : props.item.title}
          </h3>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text margin="0px">
              {props.item.author}
              {props.item.sellerName ? `(${props.item.sellerName})` : null}
            </Text>
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

          {props.item?.successFunding === true &&
            <Success>
              <span
                onClick={() => {
                  history.push(`/audioWrite/${props.item?.category}/${props.item?.bookId}`)
                }}
              > 오디오북 등록하기&nbsp;<FcApproval id="success" size='20px'/> </span>
            </Success>
          }
        </Body>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
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

  .none {
    border: 1px solid lightgray;
    border-radius: 2px 10px 10px 2px;
    cursor: pointer;
  }

  .img {
    /* border: 5px solid yellowgreen;
    border-radius: 2px 10px 10px 2px;
    cursor: pointer; */
    border: 1px solid lightgray;
    border-radius: 2px 10px 10px 2px;
    cursor: pointer;
  }

  button {
    position: absolute;
  }

`

const Success = styled.div`
  display: flex;
  flex-direction: row;
  
  margin-top: 10px;

  span {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #0C0A0A;
    color: #ffffff;
    border-radius: 5px;
    padding: 3px 0px;

    cursor: pointer;
  }
`

export default MyPageAudioBook;
