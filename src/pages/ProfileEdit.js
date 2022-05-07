import React, { useRef } from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as getActions } from "../redux/modules/book";
import { actionCreators as profileActions } from "../redux/modules/mypage";
import { useBeforeunload } from "react-beforeunload";


const ProfileEdit = (props) => {

  const dispatch = useDispatch();

  const seller = localStorage.getItem("seller");

  const preview = useSelector((state) => state.mypage.preview);
  console.log("프리뷰", preview)

  const [introduce, setIntroduce] = React.useState("")

  // const [file, setFile] = React.useState("");
  // const [audioFile, setAudioFile] = React.useState("");


  // // upload라는 훅 생성
  const fileInput = useRef();
  // const fileInput2 = useRef();

  // // 인풋을 대신 클릭해주기 위한 함수
  const handleClick = () => {
    fileInput.current.click();
  };

  // const handleClick2 = () => {
  //   fileInput2.current.click();
  // };

  // 파일 선택하기
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(profileActions.setPreview(reader.result));
    };
  };


  // 파일 선택하기
  // const selectAudioFile = (e) => {
  //   setAudioFile(e.target.files[0])
  //   const reader = new FileReader();
  //   const file = fileInput.current.files[0];
  //   reader.readAsDataURL(file);
  // };

  // 오디오 추가하기
  const addImage = () => {
    // const userId = getCookie("userId")
    let file = fileInput.current.files[0];
    console.log(file)

    if (file === null) {
      window.alert("파일을 추가해주세요.")
      return;
    }
    // 리뷰를 추가할 때 addReviewAc로 정보를 넘긴다.
    dispatch(profileActions.addProfileAC({
        information: { introduce: introduce },
        file,
      })
    )
    // history.replace(`/detail/${itemId}`)
  }


  return (
    <ModalBack>
      <ModalBox>
        프로필 수정 페이지
        <GoBack>
          <button onClick={() => history.goBack()}>X</button>
        </GoBack>
        <Wrap>
          <Body>
            <ImageBox>
              <img
                onClick={handleClick}
                style={{ width: "100%" }}
                src={preview ? preview : 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZfKhY%2FbtrBqGLmp03%2Fd26IOo940K3zO0xLjTFMfK%2Fimg.png'}
              />
            </ImageBox>
            <h3 style={{ fontSize: "16px" }}>
              닉네임
            </h3>
            {seller === "ROLE_SELLER" ?
              <>
                <input
                  type='text'
                  placeholder='소개글은 이렇게 입력'
                  onChange={(e) => {
                    setIntroduce(e.target.value)
                  }}
                  ></input>
              </>
              :
              null
            }

            <input
              type="file"
              accept="image/jpg image/jpeg image/png"
              multiple
              ref={fileInput}
              style={{ display: 'none' }}
              onChange={selectFile}
            />
            <button onClick={addImage}>프로필 등록하기</button>
          </Body>
        </Wrap>
      </ModalBox>
    </ModalBack>
  );
};


const ModalBox = styled.div`
  position: absolute;
  top: calc(25vh - 100px);
  left: calc(40vw - 200px);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 750px;
  height: 700px;
  flex-direction: column;
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const GoBack = styled.div`
  height: 60px;

  button {
    width: 30px;
    height: 30px;
    float: right;
    border: 1px solid gray;
    border-radius: 5px;
    background: none;
  }
`;
const Wrap = styled.div`
  height: 200px;
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* position: relative; */
  margin: 10px;
  /* background-color: yellow; */

  
  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Body = styled.div`
  width: 220px;
  /* background-color: rebeccapurple; */

  display: flex;
  flex-direction: column;
  align-items: center;
  
  cursor: pointer;

  h3 {
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
`

const ImageBox = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: azure;
  overflow: hidden;
  border: 1px solid #f4f4f4;
  box-shadow: 0 0 2px gray;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  img {
    width:100%;
    height:100%;
    object-fit:cover;
  }
`

export default ProfileEdit;
