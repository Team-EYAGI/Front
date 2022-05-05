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
          <ImgSt>
            <div id='img_wrap'>
              <div id='img'>
                <img src={detail.bookImg}/>
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

  width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const HeaderSt = styled.div`
  width: 1200px;
  margin: 137px 0px 80px 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  font-size: 40px;
  
  p {
    margin: 0px 0px 23px 0px;
  }
`

const BookInfoSt = styled.div`
  /* background-color: greenyellow; */

  width: 1200px;

  padding-bottom: 80px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ImgSt = styled.div`
  /* background-color: gray; */
  
  width: 50%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #img_wrap {
    width: 586px;
    height: 582px;
    background-color: #F4F4F4;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }
  
  #img {
    width: 294px;
    height: 440px;
    background-color: gray;

    img {
      width: 100%;
      height: 100%;    
    }
  }
`

const ContentSt = styled.div`
  /* background-color: red; */

  width: 50%;
  height: 582px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  #file {
    background-color: #e4e4e4;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    border-radius: 20px;

    button {
      background-color: #F4F4F4;

      width: 100px;
      height: 50px;
      border-radius: 20px;
      border: none;

      font-size: 18px;
      font-weight: bold;
      font-family: noto-sans-cjk-kr, sans-serif;
      font-style: normal;
      cursor: pointer;
    }

    span {
      width: 400px;
      font-size: 17px;
      float: left;
      margin-left: 10px;
      /* background-color: yellow; */
      white-space: nowrap;
      overflow:hidden;
      text-overflow: ellipsis;
    }
  }


  div {
    /* background-color: gray; */
    width: 1000px;
    

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 20px;
      font-weight: bold;

      span {
        font-size: 40px;
      }
    }

    textarea {
      width: 600px;
      margin-top: 30px;
      padding: 30px;

      resize: none;

      border-radius: 20px;

      font-size: 20px;
      font-weight: bold;
      font-family: noto-sans-cjk-kr, sans-serif;
      font-style: normal;
    }

    #uploadBtn {
      width: 342px;
      height: 80px;
      margin-bottom: 40px;

      border: none;
      border-radius: 20px;
      background-color: #F4F4F4;

      font-size: 20px;
      font-weight: bold;
      font-family: noto-sans-cjk-kr, sans-serif;
      font-style: normal;
      cursor: pointer;
    }
  }
`
export default RequestWrite;