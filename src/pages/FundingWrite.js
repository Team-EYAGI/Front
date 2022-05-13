import React, { useRef } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as fundActions } from "../redux/modules/fund";
import { actionCreators as getActions } from "../redux/modules/book";
import { BiSearch } from "react-icons/bi";

const FundingWrite = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);

  const bookId = params.bookId;

  console.log(bookId);

  const detail = useSelector((state) => state.book.detail_book);
  console.log(detail);
  // upload라는 훅 생성
  const fileInput = useRef();

  // 인풋을 대신 클릭해주기 위한 함수
  const handleClick = () => {
    fileInput.current.click();
  };

  const [fundingGoals, setFundingGoals] = React.useState("");
  const [content, setContent] = React.useState("");
  const [file, setFile] = React.useState("");

  // 파일 선택하기
  const selectFile = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
  };

  // 오디오 추가하기
  const addFunding = () => {
    let file = fileInput.current.files[0];
    console.log(file);

    if (file === null) {
      window.alert("파일을 추가해주세요.");
      return;
    }
    // 리뷰를 추가할 때 addReviewAc로 정보를 넘긴다.
    dispatch(
      fundActions.addFundingAC({
        information: { content: content, fundingGoals: fundingGoals },
        file,
        bookId,
      })
    );
  };

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
            <div id="img_wrap">
              <div id="img">
                <img src={detail.bookImg} />
              </div>
              <div>
                <p>{detail.title}</p>
                <h3>{detail.author}</h3>
              </div>
            </div>
          </ImgSt>
          <ContentSt>
            {/* 오디오파일 등록 */}
            <p>샘플 오디오 파일</p>
            <div id="file">
              <span>{file ? file.name : "파일을 선택해주세요!"}</span>
              <BiSearch id="addbtn" onClick={handleClick} size="24px" />
            </div>
            {/* 펀딩목표설정 */}
            <div id="goal">
              <p>펀딩 목표</p>
              <input
                placeholder="최소 목표치는 하트5개입니다."
                onChange={(e) => {
                  setFundingGoals(e.target.value);
                }}
              />
            </div>
            <div>
              <p>프로젝트에 대한 간단한 어필도 있으면 좋아요!</p>
              <textarea
                type="text"
                maxLength="100"
                placeholder="최소 10자 이상 입력해주세요!"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              {/* 숨겨놓은 진짜 파일 등록 */}
              <input
                type="file"
                accept="audio/wav audio/mp3"
                multiple
                ref={fileInput}
                style={{ display: "none" }}
                onChange={selectFile}
              />
              <button id="uploadBtn" onClick={addFunding}>
                등록하기
              </button>
            </div>
          </ContentSt>
        </BookInfoSt>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderSt = styled.div`
  width: 1200px;
  margin: 80px 0px 60px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 26px;
`;

const BookInfoSt = styled.div`
  width: 1200px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

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
    border: 1px solid #c4c4c4;
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
`;

const ContentSt = styled.div`
  width: 464px;
  height: 582px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    width: 100%;
    font-weight: 600;
    font-size: 20px;
    color: #000000;
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

  #file {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #f4f4f4;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    margin-bottom: 10px;

    #addbtn {
      margin: 8px 14px 8px 0px;
      cursor: pointer;
    }

    span {
      width: 400px;
      font-weight: 400;
      font-size: 16px;
      color: #525252;
      margin: 10px 0px 8px 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

    input {
    width: 453px;
    height: 30px;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    border-radius: 10px;
    border: 1px solid #e4e4e4;
    padding-left: 10px;
    font-family: 'Pretendard';
    }

  textarea {
    width: 423px;
    height: 100px;
    resize: none;
    padding: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    background: #ffffff;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    font-family: 'Pretendard';
  }

  #uploadBtn {
    width: 464px;
    height: 60px;
    margin-top: 40px;
    margin-bottom: 40px;
    background: #0c0a0a;
    color: #ffffff;
    border-radius: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    font-family: 'Pretendard';

    :hover {
      cursor: pointer;
      background: #0c0a0a;
      color: #ffffff;
      border: 1px solid #0c0a0a;
      box-shadow: 3px 3px 3px 3px gray;
    }
  }
`;

export default FundingWrite;
