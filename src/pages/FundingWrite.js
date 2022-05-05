import React, { useRef } from 'react'
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as fundActions } from "../redux/modules/fund";
import { actionCreators as getActions } from "../redux/modules/book";


const FundingWrite = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params)

  const bookId = params.bookId

  console.log(bookId)

  const detail = useSelector((state) => state.book.detail_book);
  console.log(detail)
    // upload라는 훅 생성
    const fileInput = useRef();

   // 인풋을 대신 클릭해주기 위한 함수
   const handleClick = () => {
    fileInput.current.click();
  };

  const [content, setContent] = React.useState("")
  const [file, setFile] = React.useState("")
  // console.log(contents)

  // 파일 선택하기
  const selectFile = (e) => {
    setFile(e.target.files[0])
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);

  };

  // 오디오 추가하기
  const addFunding = () => {
    // const userId = getCookie("userId")
    let file = fileInput.current.files[0];
    console.log(file)

    if(file === null) {
      window.alert("파일을 추가해주세요.")
      return;
    }
    // 리뷰를 추가할 때 addReviewAc로 정보를 넘긴다.
    dispatch(fundActions.addFundingAC({
        information: { content: content },
        file,
        bookId,
      })
    )
    // history.replace(`/detail/${itemId}`)
  }

  React.useEffect(() => {
    dispatch(getActions.getBookDetailAC(bookId));
  }, []);


  return (
    <React.Fragment>
       <Wrap>
        <HeaderSt>
          <p>펀딩 등록</p>          
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
                
                maxLength='30'
                type='text'
                placeholder='내용을 입력해주세요.' 
                onChange={(e) => {
                  setContent(e.target.value)
                }}
              />
            </div>
            <div id='file'>
              <button id='addbtn' onClick={handleClick}>파일 추가</button>
              <span>{file.name}</span>
            </div>
            <input 
                type="file" 
                accept="audio/wav audio/mp3" 
                multiple 
                ref={fileInput}
                style={{display: 'none'}} 
                onChange={selectFile}
              />
          
            <div>
              <button
                id='uploadBtn'
                onClick={addFunding}
              >등록하기</button>
            </div>

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

export default FundingWrite;