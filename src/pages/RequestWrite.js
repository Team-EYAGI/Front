import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import useSWR from "swr"
import fetcher from "../shared/Fetcher"
import Spinner from '../elements/Spinner';
import { useParams } from 'react-router-dom';
import { useBeforeunload } from "react-beforeunload";

import { useDispatch } from 'react-redux';
import { actionCreators as requestActions } from "../redux/modules/audio";


const RequestWrite = (props) => {
  const dispatch = useDispatch();

  // 새로고침 경고 알럿
  useBeforeunload((event) => event.preventDefault());

  const params = useParams();
  const bookId = params.bookId
  const bookRequestId = params.bookRequestId

  // 수정페이지인지 아닌지 확인
  const is_edit = bookRequestId ? true : false;

  // 오디오북 Post 요청을 보내기 위해 필요한 정보 (제목, 이유)
  const [contents, setContents] = React.useState(is_edit ? "요청 이유를 수정해주세요" : "");

  // 책 상세페이지 정보 가져오기
  const { data, error } = useSWR(process.env.REACT_APP_BASE_URL + `/book/detail/${bookId}`, fetcher)

  if (error) {
    return <div>ERROR...</div>
  }
  if (!data) {
    return <Spinner/>
  }

  const title = `"${data.title}" 오디오북을 요청합니다.`

  return (
    <React.Fragment>
      <Wrap>
        <Header>
          <p>오디오북 요청하기</p>
        </Header>
        <BookInfo>
          <ImgBox>
            <div id='img_wrap'>
              <div id='img'>
                <img src={data.bookImg} alt="책 이미지"/>
              </div>
              <div>
                <p>{data.title}</p>
                <h3>{data.author}</h3>
              </div>
            </div>
          </ImgBox>
          <Content>
            <div>
              <p>요청이유</p>
              <textarea
                type="text"
                minLength="10"
                maxLength="100"
                defaultValue={contents}
                placeholder='요청 이유와 바라는 점을 최소 10자 이상 100자 이내로 입력해주세요.'
                onChange={(e) => {
                  setContents(e.target.value)
                }}
              />
            </div>
            {is_edit ?
              <div>
                <button
                  id='uploadBtn'
                  disabled={contents === ""}
                  onClick={() => {
                    if (contents.length < 10) {
                      Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: '최소 10자 이상 입력해주세요!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      return;
                    }
                    dispatch(requestActions.editRequestAC(bookRequestId, title, contents));
                  }}
                >수정하기</button>
              </div>
              :
              <div>
                <button
                  id='uploadBtn'
                  disabled={contents === ""}
                  onClick={() => {
                    if (contents.length < 10) {
                      Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        text: '최소 10자 이상 입력해주세요!',
                        showConfirmButton: false,
                        timer: 1500,
                        color: "#000000",
                      })
                      return;
                    }
                    dispatch(requestActions.addRequestAC(bookId, title, contents));
                  }}
                >등록하기</button>
              </div>
            }
          </Content>
        </BookInfo>
      </Wrap>
    </React.Fragment>
  )
}


const Wrap = styled.div`
  width: 1200px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  width: 1200px;
  margin: 40px 0px 0px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-weight: 700;
  font-size: 26px;  
`

const BookInfo = styled.div`
  width: 1200px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ImgBox = styled.div`
  width: 50%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #img_wrap {
    width: 464px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    border: 1px solid #E4E4E4;
    border-radius: 10px;

    p {
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 10px;
      color: #000000;
    }

    h3 {
      text-align: center;
      font-weight: 400;
      font-size: 14px;
      color: #525252;
      margin: 10px 0px 40px 0px;
    }
  }
  
  #img {
    margin-top: 40px;
    width: 120px;
    min-height: 100px;

    img {
      width: 100%;

      border: 1px solid lightgray;
      border-radius: 2px 10px 10px 2px;
    }
  }
`

const Content = styled.div`

  width: 464px;
  height: 582px;

  display: flex;
  flex-direction: column;

  p {
    width: 100%;
    font-weight: 700;
    font-size: 20px;
    color: #000000;
    line-height: 100%;
    margin-top: 36px;
  }

  h5 {
    width: 100%;
    margin: 0px 5px 3px 0px;
    font-weight: 300;
    text-align: right;
    :hover {
      color: purple;
      text-decoration: underline;
      cursor: pointer;
    }
  }

    textarea {
      width: 423px;
      height: 100px;
      margin-bottom: 92px;
      resize: none;
      padding: 20px;

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 15px;

      background: #FFFFFF;
      border: 1px solid #E4E4E4;
      border-radius: 10px;
    }

    #uploadBtn {
      width: 464px;
      height: 60px;


      background: #0C0A0A;
      color: #FFFFFF;
      border-radius: 10px;

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;

      cursor: pointer;

      :disabled {
        background: #F4F4F4;
        color: #8E8E8E;
        border: 1px solid #E4E4E4;
        cursor: auto;
      }
    }
  
`
export default RequestWrite;