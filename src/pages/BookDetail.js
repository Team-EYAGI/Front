import React from 'react'
import styled from 'styled-components';
import AudioBookList from '../components/AudioBookList';
import { history } from '../redux/configureStore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/book";

const BookDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params)
  const bookId = params.bookId
  const category = params.category
  // console.log("북아이디",bookId)

  // 로그인 확인과 셀러인지 아닌지를 확인하기 위함
  const is_login = localStorage.getItem("is_login");
  const seller = localStorage.getItem("seller");

  const detail = useSelector((state) => state.book.detail_book);
  // console.log("책 상세", detail)
  // console.log("책 상세", detail.audioPreDtoList)
  // console.log("제목", detail.title)

  React.useEffect(() => {
    dispatch(getActions.getBookDetailAC(bookId));
    return () => {
      console.log(detail)
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Wrap>
        <HeaderSt>
          <p>{detail.title}</p>
          <span>{detail.author}</span>

        </HeaderSt>
        <BookInfoSt>
          <ImgSt>
            <div id='img_wrap'>
              <div id='img'>
                <img src={detail.bookImg} />
              </div>
            </div>
          </ImgSt>
          <ContentSt>
            <div>
              <p>참여한 크리에이터</p>
              <p><span>11</span>명</p>
            </div>
            <div>
              {seller === "ROLE_SELLER" ?
                <>
                  <button
                    id="hello"
                    onClick={() => {
                      history.push(`/fundingWrite/${bookId}`)
                    }}>
                    펀딩 등록하기
                  </button>
                  <button
                    id="hi"
                    onClick={() => {
                      history.push(`/audioWrite/${category}/${bookId}`)
                    }}>
                    내 오디오 등록하기
                  </button>
                </>
                :
                null
              }
              <button
                onClick={() => {
                  if (!is_login) {
                    window.alert("로그인 후 이용 가능합니다!");
                    return;
                  } else {
                    window.alert("내 서재에 담겼습니다!");
                  }
                }}
              >내 서재에 담기</button>
            </div>
          </ContentSt>
        </BookInfoSt>
        <BookSumSt>
          <span>
            책 정보
          </span>
          <div>
            <span>
              {detail.summary}
            </span>
          </div>
        </BookSumSt>
        <AudioSt>
          <AudioBookList detail={detail} />
        </AudioSt>
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
  position: relative;
  /* background-color: lightblue; */
  padding-bottom: 30px;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const HeaderSt = styled.div`
  width: 1200px;
  /* background-color: gray; */
  font-size: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 137px 0px 80px 0px;
  
  p {
    margin: 0px 0px 23px 0px;
  }

  span {
    font-size: 30px;
  }
`

const BookInfoSt = styled.div`
  width: 1200px;
  /* background-color: greenyellow; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 80px;
`

const ImgSt = styled.div`
  width: 50%;
  /* background-color: gray; */
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
  width: 38%;
  height: 582px;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  div {
    width: 342px;
    /* background-color: gray; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 30px;
      font-weight: bold;

      span {
        font-size: 40px;
      }
    }

    button {
      width: 342px;
      height: 80px;
      margin-top: 16px;
      border: none;
      border-radius: 20px;
      background-color: #F4F4F4;
      font-size: 20px;
      font-family: noto-sans-cjk-kr, sans-serif;
      font-weight: 400;
      font-style: normal;
      cursor: pointer;
    }
  }
`

const BookSumSt = styled.div`
  width: 1200px;
  /* background-color: lightcoral; */
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    width: 1200px;
    float: left;
    font-size: 30px;
    font-weight: bold;
  }

  div {
    width: 1200px;
    background-color: #F4F4F4;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 80px;

    span {
      margin : 33px 98px;
      font-size: 20px;
    }
  }
`
const AudioSt = styled.div`
  width: 1200px;
  position: relative;

`

export default BookDetail;