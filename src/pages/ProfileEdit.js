import React, { useRef, useEffect } from 'react'
import styled from "styled-components";
import { useBeforeunload } from "react-beforeunload";
import AudioPlayer from "react-h5-audio-player";
import MyPageAudioBook from '../components/MyPageAudioBook';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as profileActions } from "../redux/modules/mypage";
import { actionCreators as libraryActions } from "../redux/modules/mypage";


const ProfileEdit = (props) => {
  const dispatch = useDispatch();
  // 새로고침 경고 알럿
  useBeforeunload((event) => event.preventDefault());

  const authority = localStorage.getItem("seller");
  const preview = useSelector((state) => state.mypage.preview);
  const profile = useSelector((state) => state.mypage.profile);
  // console.log("프로필", profile)

  const [introduce, setIntroduce] = React.useState("")

  // 인풋에 접근
  const fileInput = useRef();

  // 인풋을 대신 클릭해주기 위한 함수
  const handleClick = () => {
    fileInput.current.click();
  };

  // 파일 선택하기
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(profileActions.setPreview(reader.result));
    };
  };

  // 프로필 이미지 추가하기
  const addImage = () => {
    let file = fileInput.current.files[0];
    console.log(file)

    dispatch(profileActions.addProfileAC({
      information: { introduce: introduce },
      file,
      authority,
    })
    )
  }

  useEffect(() => {
    dispatch(libraryActions.getProfileAC());
  }, []);


  return (
    <ModalBack>
      <ModalBox>
        <GoBack>
          <button onClick={() => history.goBack()}>X</button>
        </GoBack>
        {/* <div>프로필을 수정해주세요!</div> */}
        <Wrap>
          <Body>
            <ImageBox>
              <img
                onClick={handleClick}
                style={{ width: "100%" }}
                src={preview ? preview : profile.userImage}
              />
            </ImageBox>
            <h3 style={{ fontSize: "16px" }}>
              {profile.userName}
            </h3>
            {authority === "ROLE_SELLER" ?
              <>
                <textarea
                  type='text'
                  maxLength='100'
                  placeholder='자기소개를 100자 내로 작성해주세요.'
                  onChange={(e) => {
                    setIntroduce(e.target.value)
                  }}
                  defaultValue={profile ? profile.introduce : null}
                ></textarea>
              </>
              :
              <div>프로필 사진을 등록해주세요!</div>
            }
            <input
              type="file"
              accept="image/jpg image/jpeg image/png"
              multiple
              ref={fileInput}
              style={{ display: 'none' }}
              onChange={selectFile}
            />
          </Body>
        </Wrap>
        <button
                // disabled={contents === "" || file === ""}

          onClick={addImage}
        >
          프로필 수정하기
          </button>
      </ModalBox>
    </ModalBack>
  );
};

const ModalBox = styled.div`
  margin: 11vh auto;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  width: 550px;
  height: 550px;
  flex-direction: column;

  
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;

  button {
    width: 200px;
    height: 40px;
    margin-bottom: 15px;

    border-radius: 10px;

    background-color: #000000;
    border: 1px solid #FFFEFC;
    color: white;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
  }
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 5;
`;

const GoBack = styled.div`
  width: 500px;
  height: 60px;

  button {
    width: 30px;
    height: 30px;
    float: right;
    border: 1px solid gray;
    color: black;
    border-radius: 5px;
    background: none;
  }
`;
const Wrap = styled.div`
  height: 300px;
  margin: 10px;
`

const Body = styled.div`
  width: 220px;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  cursor: pointer;

  h3 {
    margin-bottom: 20px;
  }

  textarea {
    width: 400px;
    height: 80px;
    margin-bottom: 10px;
    resize: none;
    border-radius: 5px;
    padding: 10px;
  } 

`

const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 30px;
  background-color: azure;
  overflow: hidden;
  border: 1px solid #f4f4f4;
  box-shadow: 0 0 2px gray;

  background-repeat : no-repeat;
  background-size : cover;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  img {
    width:100%;
    height:100%;
    background-repeat : no-repeat;
    background-size : cover;

    object-fit:cover;
  }
`

export default ProfileEdit;
