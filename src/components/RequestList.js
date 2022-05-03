import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// 리덕스 관련
import { history } from "../redux/configureStore";


const RequestList = (props) => {

  const [clickRequest, setClickRequest] = useState(false);

  return (
    <React.Fragment>
      <OneComment
        onClick={() => {
          setClickRequest(!clickRequest);
        }}
      >
        <CommentData
          style={{
            width: "55px",
            textAlign: "center",
            paddingRight: "18px",
            // backgroundColor: "red"
          }}
        >
          {props.item.bookRequestId}
        </CommentData>
        <CommentData
          style={{
            paddingLeft: "50px",
            paddingRight: "250px",
            width: "750px",
            textAlign: "left",
            // backgroundColor: "yellow"
          }}
        >
          {props.item.title}
        </CommentData>
        <CommentData
          style={{
            width: "215px",
            textAlign: "center",
            // backgroundColor: "green"
          }}
        >
          {props.item.userEmail}
        </CommentData>
        <CommentData
          style={{
            paddingRight: "14px",
            width: "200px",
            textAlign: "center",
          }}
        >
          {props.item.modifiedAt}
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
          <div style={{display: "flex", flexDirection: "row", justifyContent: "right", alignItems: "right"}}>
          <ButtonWrap>
            <EditButton
              // onClick={() => {
              //   history.push(`/reviewWrite/${itemId}/${commentId}`)
              // }}
            >
              수정
            </EditButton>
          </ButtonWrap>
          <ButtonWrap>
            <DeleteButton
              // onClick={deleteReview}
            >
              삭제
            </DeleteButton>
          </ButtonWrap>
        </div>
    
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
`;

const RequestDetail = styled.div`
  padding: 10px;
  background-color: #e4e4e4;
`

const DetailWrap = styled.div`
  width: 1000px;
`

const RequestComment = styled.p`
  margin: 12px 0px 20px 115px;
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