import React, { useEffect } from 'react'
import styled from 'styled-components';
import AudioBookList from '../components/AudioBookList';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/book";
import { actionCreators as libraryActions } from "../redux/modules/mypage";
import { actionCreators as fundingActions } from "../redux/modules/fund";

const BookDetail = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const bookId = params.bookId
  const category = params.category

  // 로그인 확인과 셀러인지 아닌지를 확인하기 위함
  const is_login = localStorage.getItem("is_login");
  const authority = localStorage.getItem("seller");

  // 책 상세페이지 정보 가져오기
  const detail = useSelector((state) => state.book.detail_book);

  useEffect(() => {
    dispatch(getActions.getBookDetailAC(bookId));

    // 클린업 함수 실행
    return () => {
      dispatch(getActions.clearMain());
    }
  }, []);

  return (
    <React.Fragment>
      <Wrap>
        <Header>
          <p>{detail.title}</p>
          <span>{detail.author}</span>
        </Header>
        <BookInfo>
          <ImgBox style={{ backgroundImage: `url(${detail.bookImg})` }}>
            <div id='img_wrap'>
              <div id='img'>
                <img src={detail.bookImg} alt="책 이미지" />
              </div>
            </div>
          </ImgBox>
          <Content>
            <div>
              <p>이 오디오북에 참여한 크리에이터</p>
              <p><span>{detail.audio ? detail.audio.length : 0}&nbsp;</span>명</p>
            </div>
            <div>
              {authority === "ROLE_SELLER" ?
                <>
                  <button
                    onClick={() => {
                      history.push(`/fundingWrite/${bookId}`)
                    }}>
                    내 펀딩 등록하기
                  </button>
                  <button
                    onClick={() => {
                      dispatch(fundingActions.fundingSuccessAC(bookId, category));
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
                    Swal.fire({
                      text: "로그인 후 이용 가능합니다!",
                      icon: "warning",
                      confirmButtonText: "로그인하러가기",
                      confirmButtonColor: '#0C0A0A',
                    }).then(result => {
                      if (result.isConfirmed) {
                        history.push(`/login`)
                      }
                    })
                  } else {
                    dispatch(libraryActions.addLibraryAC(bookId));
                  }
                }}
              >내 서재에 담기</button>
            </div>
          </Content>
        </BookInfo>
        <BookSum>
          <span id='bookinfo'>
            책 정보
          </span>
          <div>
            <span style={{ whiteSpace: "pre-wrap", wordBreak: 'keep-all', lineHeight: "1.5", }}>
              {detail.summary}
            </span>
          </div>
        </BookSum>
        <AudioBookBox>
          <AudioBookList detail={detail} />
        </AudioBookBox>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
`

const Header = styled.div`
  width: 1100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 102px 0px 80px 0px;
  
  p {
    font-size: 24px;
    margin: 0px 0px 23px 0px;
    font-weight: 700;
  }

  span {
    font-size: 18px;
    line-height: 18px;
    font-weight: 400;
  }
`

const BookInfo = styled.div`
  width: 1100px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 80px;
`

const ImgBox = styled.div`
  width: 550px;
  height: 550px;

  background-repeat : no-repeat;
  background-size : cover;
  border-radius: 30px;

  #img_wrap {
    width: 550px;
    height: 550px;

    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
  }
  
  #img {
    width: 260px;

    img {
      width: 100%;
      border-radius: 2px 10px 10px 2px;
    }
  }
`

const Content = styled.div`
  height: 582px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  div {
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

    button {
      width: 430px;
      height: 80px;
      margin-top: 16px;
      border: 1px solid #0C0A0A;
      border-radius: 10px;
      background: #FFFEFC;
      font-size: 20px;
      font-family: Pretendard;
      font-weight: 400;
      font-style: normal;
      cursor: pointer;

      :hover {
        background: #0C0A0A;
        border: none;
        color: #FFFFFF;
      }
    }

}
`

const BookSum = styled.div`
  width: 1100px;

  display: flex;
  flex-direction: column;

  #bookinfo {
    width: 1100px;

    float: left;
    font-size: 22px;
    font-weight: bold;
    padding-bottom: 20px;
    border-bottom: 2px solid #000000;
  }

  div {
    margin-top: 20px;
    margin-bottom: 80px;

    span {
      font-size: 16px;
      white-space: pre-wrap;
      word-break: keep-all;
      line-height: 1.84;
    }
  }
`
const AudioBookBox = styled.div`
  width: 1100px;
`

export default BookDetail;