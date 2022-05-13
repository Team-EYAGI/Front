import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// 리덕스 관련
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
    dispatch(requestActions.deleteRequestAC(bookRequestId))
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
          {props.item.createdAt.split('오전')[0]}
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


          {/* <HelpWrap>
            <HelpButton
            //  onClick={() => {
            //    dispatch(reviewActions.helpReviewAC(itemId, commentId))
            //  }}
           >
              도움이 돼요&nbsp;1
            </HelpButton>
          </HelpWrap> */}
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

  cursor: pointer;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin: 0px 10px;

  font-weight: 500;
  font-size: 16px;

  color: #000000;

`;

const RequestDetail = styled.div`
  padding: 10px;
  background-color: #F6F6F6;
`

const DetailWrap = styled.div`
  width: 1000px;
`

const RequestComment = styled.p`
  margin: 12px 0px 20px 210px;
  line-height: 16px;
  text-align: left;
`

const ButtonWrap = styled.div`
  text-align: right;
`

const EditButton = styled.button`
  padding: 0px 15px;
  min-width: 105px;
  margin-right: 2px;
  height: 30px;
  font-size: 12px;
  font-weight: 300;
  line-height: 28px;
  color: #5f0080;
  border: 1px solid #5f0080;
  background: none;
  cursor: pointer;
`

const DeleteButton = styled.button`
  padding: 0px 15px;
  min-width: 105px;
  margin-right: 2px;
  height: 30px;
  font-size: 12px;
  font-weight: 300;
  line-height: 28px;
  color: #5f0080;
  border: 1px solid #5f0080;
  background: none;
  cursor: pointer;
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