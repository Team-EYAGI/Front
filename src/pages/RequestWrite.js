import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as requestActions } from "../redux/modules/audio";
import { actionCreators as getActions } from "../redux/modules/book";

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
          <ImgSt style={{ backgroundImage: `url(${detail.bookImg})` }}>
            <div id='img_wrap'>
              <div id='img'>
                <img src={detail.bookImg} />
              </div>
            </div>
          </ImgSt>
          <ContentSt>
            <div>
              <p>"{detail.title}" 오디오북을 요청합니다.</p>
              <span>{detail.author}</span>
              <textarea
                defaultValue={contents}
                maxLength='30'
                type='text'
                placeholder='요청 코멘트를 30자 내로 입력해주세요. ex) 오디오북으로 듣고 싶어요!, 잔잔한 목소리로 듣고 싶어요!' 
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
                  dispatch(requestActions.editRequestAC(bookRequestId, title, contents));
                }}
              >수정하기</button>
            </div>
            :
            <div>
              <button
                id='uploadBtn'
                onClick={() => {
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
  /* background-color: lightblue; */

  width: 1100px;
  margin: 0 auto;
  padding-bottom: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

const HeaderSt = styled.div`
  width: 1100px;
  margin: 80px 0px 40px 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  font-size: 30px;
  
  p {
    margin: 0px 0px 23px 0px;
  }
`

const BookInfoSt = styled.div`

  width: 1100px;

  padding-bottom: 80px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ImgSt = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat : no-repeat;
  background-size : cover;
  border-radius: 30px;

  #img_wrap {
    width: 500px;
    height: 500px;

    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
  }
  
  #img {
    width: 210px;
    height: 350px;

    img {
      width: 100%;
      height: 100%;    
    }
  }
`

const ContentSt = styled.div`

  width: 50%;
  height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  div {
    width: 1000px;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-size: 20px;
      font-weight: bold;
    }

    textarea {
      width: 600px;
      margin-top: 30px;
      padding: 30px;

      resize: none;
      background-color: #FFFFFF;
      border-radius: 20px;

      font-size: 14px;
      font-family: Pretendard;
      font-weight: 400;
      font-style: normal;
    }

    button {
      width: 342px;
      height: 80px;
      margin-bottom: 40px;

      border-radius: 20px;
      background-color: #000000;
      color: #FFFFFF;
      box-shadow: 2px 2px 2px 2px gray;

      font-size: 20px;
      font-family: Pretendard;
      font-weight: 700;
      font-style: normal;
      cursor: pointer;

      :hover {
        box-shadow: 4px 4px 4px 4px gray;
      }
    }
  }
`
export default RequestWrite;