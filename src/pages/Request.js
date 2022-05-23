import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RequestList from '../components/RequestList';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as requestActions } from "../redux/modules/audio";
import { history } from '../redux/configureStore';
import Pagination from '../shared/Pagination';

const Request = () => {
  const dispatch = useDispatch();

  const requestList = useSelector((state) => state.audio.request_list);
  const totalPages = useSelector((state) => state.audio.totalPages);

  // 페이지네이션
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(requestActions.getRequestAC(page));
  }, [page]);

  return (
    <React.Fragment>
      <Wrap>
        <RequestTitle>오디오북 요청하기</RequestTitle>
        <RequestInfo>
          <li>
            <div id='header' />
            이 공간은 듣고 싶은 오디오북에 대한 수요조사를 하는 공간입니다. 해당 게시판의 성격과 다른 글은
            사전동의 없이 담당 게시판으로 이동될 수 있습니다.
          </li>
          <li>
            <div id='header' />
            듣고 싶은 오디오북이 있다면 원하는 도서를 클릭하여 오디오북 요청서를 작성해주세요.
          </li>
        </RequestInfo>
        <RequestTable>
          <TableInfo>
            {/* 공통적인 InfoItem 속성을 제외한 부분만 inline 스타일 적용 */}
            <InfoItem style={{ width: "195px" }}>
              작성자
            </InfoItem>
            <InfoItem style={{ width: "1100px" }}>
              제목
            </InfoItem>
            {/* <InfoItem style={{ width: "200px" }}>
              작성자
            </InfoItem> */}
            <InfoItem style={{ width: "200px" }}>
              작성일
            </InfoItem>
          </TableInfo>
          {requestList && requestList.map((item, idx) => {
            // ReviewDetail 페이지에 item값을 props로 넘겨준다.
            return <RequestList key={idx} item={item} />
          })}
        </RequestTable>
        <ReveiwButtonWrap>
          <ReviewButton
            onClick={() => {
              history.push('/book/자기계발')
            }}>
            오디오북 요청 책 선택하기
          </ReviewButton>
        </ReveiwButtonWrap>
        <Pagination totalPages={totalPages} setPage={setPage}/>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 70px;
  padding-right: 40px;
  width: 1100px;
`

const RequestTitle = styled.h2`
  margin: 0;
  padding-bottom: 5px;
  color: #4c4c4c;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: 0px;
`

const RequestInfo = styled.ul`
  margin: 0;
  padding-left: 0;
  /* list-style-type: none; */
  & > li {
    padding: 0;
    display: flex;
    color: #8E8E8E;
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    letter-spacing: 0px;
  }

  #header {
    width: 4px;
    height: 4px;
    margin: 7px 8px 0px 0px;
    background-color: #514859;
    vertical-align: 2px;
   }
`

const RequestTable = styled.div`
  margin-top: 15px;
  border-top: 2px solid #666666;
  border-bottom: 1px solid #666666;
`

const TableInfo = styled.div`
  width: 100%;
  height: 65.8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
`

const InfoItem = styled.div`
  padding: 25px 0px 23px 0;
  color: #000000;
  font-size: 16px;
  line-height: 140%;
  font-weight: 500;
  letter-spacing: 0px;
  vertical-align: middle;
  text-align: center;
  margin: 0px 10px;
`

const ReveiwButtonWrap = styled.div`
  padding: 10px 0px;
  width: 100%;
  height: 95px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ReviewButton = styled.button`
  padding: 0;
  width: 200px;
  height: 30px;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
  font-size: 13px;

  line-height: 30px;
  color: #FFFFFF;
  background-color: #0C0A0A;
  border: 1px solid #0C0A0A;
  box-sizing: content-box;
  
  :hover {
      transform: scale(0.95);
      cursor: pointer;
    }
`

export default Request;