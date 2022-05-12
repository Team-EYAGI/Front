import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as requestActions } from "../redux/modules/audio";
import { actionCreators as getActions } from "../redux/modules/book";
import { useBeforeunload } from "react-beforeunload";

const RequestWrite = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params)
  const bookId = params.bookId
  const bookRequestId = params.bookRequestId
  // console.log("북아이디",bookRequestId)

  // 리덕스에 저장된 책 상세페이지 정보 불러오기
  const detail = useSelector((state) => state.book.detail_book);
  // console.log(detail)

    // 새로고침 경고 알럿
    useBeforeunload((event) => event.preventDefault());

  const is_edit = bookRequestId ? true : false; 

  // 오디오북 Post 요청을 보내기 위해 필요한 정보 (제목, 이유)
  const title = `"${detail.title}" 오디오북을 요청합니다.`
  const [contents, setContents] = React.useState(is_edit ? "요청 이유를 수정해주세요" : "");

  React.useEffect(() => {
    dispatch(getActions.getBookDetailAC(bookId));
  }, []);

  return (
   <React.Fragment>
      <Wrap>
        <HeaderSt>
          <p>오디오북 요청하기</p>          
        </HeaderSt>
        <BookInfoSt>
          <ImgSt>
            <div id='img_wrap'>
              <div id='img'>
                <img src={detail.bookImg}/>
              </div>
              <div>
              <p>{detail.title}</p>
              <h3>{detail.author}</h3>
            </div>
            </div>
          </ImgSt>
          <ContentSt>
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
                onClick={() => {
                  if(contents.length < 10) {
                    window.alert ("최소 10자 이상 입력해주세요!")
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
                onClick={() => {
                  if(contents.length < 10) {
                    window.alert ("최소 10자 이상 입력해주세요!")
                    return;
                  }
                  dispatch(requestActions.addRequestAC(bookId, title, contents));
                }}
              >등록하기</button>
            </div>
            }
          </ContentSt>
        </BookInfoSt>
      </Wrap>
    </React.Fragment>
  )
}


const Wrap = styled.div`
  width: 1200px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderSt = styled.div`
  width: 1200px;
  margin: 40px 0px 0px 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 26px;  
`

const BookInfoSt = styled.div`

  width: 1200px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ImgSt = styled.div`
  
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
    justify-content: center;
    align-items: center;
    
    /* background: #FFFFFF; */
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

const ContentSt = styled.div`

  width: 464px;
  height: 582px;

  display: flex;
  flex-direction: column;
  align-items: center;

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
      /* margin-bottom: 40px; */

      background: #0C0A0A;
      color: #FFFFFF;
      border-radius: 10px;

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;

      :hover {
        cursor: pointer;
        background: #0C0A0A;
        color: #FFFFFF;
        border: 1px solid #0C0A0A;

        box-shadow: 3px 3px 3px 3px gray;
      }
    }
  
`
export default RequestWrite;