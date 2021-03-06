import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Swal from 'sweetalert2';

import { history } from "../redux/configureStore";
import { actionCreators as requestActions } from "../redux/modules/audio";


const RequestList = (props) => {
  const dispatch = useDispatch();

  const bookId = props.item.bookId
  const userName = localStorage.getItem("username");
  const thisUserName = props.item.userName;

  const bookRequestId = props.item.bookRequestId

  const [clickRequest, setClickRequest] = useState(false);

  const deleteRequest = () => {
    Swal.fire({
      // title: "알림",
      text: "삭제하면 되돌릴 수 없습니다. 삭제하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니오",
      confirmButtonColor: '#0C0A0A',
      cancelButtonColor: '#0C0A0A',
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(requestActions.deleteRequestAC(bookRequestId))
      } else {
        return;
      }
    });
    history.replace(`/request`)
  }

  return (
    <React.Fragment>
      <OneComment
        onClick={() => {
          setClickRequest(!clickRequest);
        }}
      >
        <CommentData
          style={{
            width: "217px",
            textAlign: "center",
            color: "#8E8E8E"
          }}
        >
          {props.item.userName}
        </CommentData>
        <CommentData
          style={{
            paddingLeft: "50px",
            paddingRight: "250px",
            width: "750px",
            textAlign: "left",
          }}
        >
          {props.item.title}
        </CommentData>

        <CommentData
          style={{
            paddingRight: "14px",
            width: "200px",
            textAlign: "center",
          }}
        >
          {props.item.createdAt.split("T")[0]}
        </CommentData>
      </OneComment>
      {clickRequest && (
        <RequestDetail>
          <DetailWrap>
            <RequestComment>
              {props.item.contents}
            </RequestComment>
          </DetailWrap>

          {/* 쿠키에 저장된 userId와 user의 값 비교 */}
          {userName == thisUserName ?
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "right", alignItems: "right" }}>
              <ButtonWrap>
                <EditButton
                  onClick={() => {
                    history.push(`/requestWrite/${bookId}/${bookRequestId}`)
                  }}
                >
                  수정
                </EditButton>
              </ButtonWrap>
              <ButtonWrap>
                <DeleteButton
                  onClick={deleteRequest}
                >
                  삭제
                </DeleteButton>
              </ButtonWrap>
            </div>
            :
            null
          }
        </RequestDetail>
      )}
    </React.Fragment>
  );
};

const OneComment = styled.div`
  color: #4c4c4c;
  display: flex;

  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;

  font-weight: 400;
  font-size: 15px;

`;

const CommentData = styled.div`
  padding: 25px 0px 23px 0;


  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin: 0px 10px;

  font-weight: 500;
  font-size: 16px;

  color: #000000;

  :hover {
      transform: scale(0.99);
      cursor: pointer;
    }

`;

const RequestDetail = styled.div`
  padding: 10px;
  background-color: #F6F6F6;

  display: flex;
  flex-direction: row;
`

const DetailWrap = styled.div`
  width: 1000px;
`

const RequestComment = styled.p`
  margin: 12px 0px 20px 205px;
  text-align: left;
`

const ButtonWrap = styled.div`
  text-align: right;
`

const EditButton = styled.button`
  padding: 0px;
  min-width: 25px;
  margin: 12px 15px 0px 0px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;

  color: #000000;
  border: none;
  background: none;

  :hover {
    cursor: pointer;
    color: #D05943;
  }
`

const DeleteButton = styled.button`
  padding: 0px;
  min-width: 25px;
  margin: 12px 37px 0px 0px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;

  color: #000000;
  border: none;
  background: none;

  :hover {
    cursor: pointer;
    color: #D05943;
  }
`

const HelpWrap = styled.div`
  text-align: right;
  margin-bottom: 5px;
`

const HelpButton = styled.button`
  padding: 0px 15px;
  min-width: 105px;
  height: 30px;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 28px;
  color: #5f0080;
  border: 1px solid #5f0080;
  background: none;
  cursor: pointer;
`

export default RequestList;