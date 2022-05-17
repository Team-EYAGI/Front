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

  // 오디오 추가하기
  const addImage = () => {
    let file = fileInput.current.files[0];
    console.log(file)

    if (file === null) {
      window.alert("파일을 추가해주세요.")
      return;
    }
    dispatch(profileActions.addProfileAC({
      information: { introduce: introduce },
      file,
    })
    )
  }

  useEffect(() => {
    dispatch(libraryActions.getProfileAC());
  }, []);



  const params = useParams();
  const category = params.category;

  const likeBook = useSelector((state) => state.mypage.library_likeBook);
  const listenAudio = useSelector((state) => state.mypage.library_listenAudio);
  const myFunding = useSelector((state) => state.mypage.library_registerFunding);
  const myAudio = useSelector((state) => state.mypage.library_registerAudioBook);

  const player = useRef();

  useEffect(() => {
    player.current.audio.current.pause();  // -3-
  }, [profile]);

  useEffect(() => {
    dispatch(libraryActions.getProfileAC());

    if (category === "likeBook") {
      dispatch(libraryActions.getLikeBookAC());
    } else if (category === "listen") {
      dispatch(libraryActions.getListenAudioAC());
    } else if (category === "myAudio") {
      dispatch(libraryActions.getRegisterAudioBookAC());
    } else {
      dispatch(libraryActions.getRegisterFundingAC());
    }
  }, []);

  return (
    <ModalBack>
     <Wrap1>
        <Menu>
          <Profile>
            <Box>
              <div id='img'>
                <img src={profile.userImage ? profile.userImage : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTB2Sn%2FbtrB4PINn6v%2FpPKEkCp0WIdi5JI9NGvzrk%2Fimg.png"} />
              </div>
              <div id='username'>
                <h4>{profile.userName}</h4>
                <h5>팔로잉 &nbsp;<span>1,529명</span></h5>
                <h5>팔로워 &nbsp;<span>93명</span></h5>
              </div>
            </Box>
            <Box>
              <h3>
                {profile.introduce}
              </h3>
            </Box>
            <AudioPlayer
                className='audio'
                autoPlay={false}
                src={profile.sellerVoice}
                volume={1}
                timeFormat={"mm:ss"}
                defaultCurrentTime={"00:00"}
                showJumpControls={false}
                ref={player}
                // progressUpdateInterval            
                // onListen={()=>{}}
                // ListenInterval
                onPlay={e => console.log("onPlay")}
              // other props here
              />
            <button
              id='btn'
              onClick={() => {
                history.push(`/profileEdit`)
              }}
            >
              프로필 편집
            </button>
            {authority !== "ROLE_SELLER" ?
              <span 
                id='creatorform'
                onClick={() => {
                  window.open(`https://forms.gle/UR8cGG2YDWnc7f1y8`)
                }}
                >크리에이터 신청하기</span>
              :
              profile.sellerVoice ?
              <span
                id='creatorform'
                onClick={() => {
                  history.push(`/addvoice`)
                }}
                >내 목소리 다시 올리기</span>
                :
                <span
                id='creatorform'
                onClick={() => {
                  history.push(`/addvoice`)
                }}
                >내 목소리 등록하기</span>
            }
          </Profile>
          <List>
            {authority === "ROLE_SELLER" ?
              <ListBox>
                <h2>| 크리에이터</h2>
                <h3
                  style={{ textDecoration: (category === "myAudio" ? "underline" : null) }}
                  onClick={() => {
                    history.push(`/mypage/myAudio`)
                    dispatch(libraryActions.getRegisterAudioBookAC());
                  }}>업로드한 오디오북
                </h3>
                <h3
                  style={{ textDecoration: (category === "myFunding" ? "underline" : null) }}
                  onClick={() => {
                    history.push(`/mypage/myFunding`)
                    dispatch(libraryActions.getRegisterFundingAC());
                  }}>등록한 펀딩
                </h3>
              </ListBox>
              :
              null
            }
            <ListBox>
              <h2>| 서재</h2>
              <h3
                style={{ textDecoration: (category === "listen" ? "underline" : null) }}
                onClick={() => {
                  history.push(`/mypage/listen`)
                  dispatch(libraryActions.getListenAudioAC());
                }}>듣고 있는 오디오북
              </h3>
              <h3
                style={{ textDecoration: (category === "likeBook" ? "underline" : null) }}
                onClick={() => {
                  history.push(`/mypage/likeBook`)
                  dispatch(libraryActions.getLikeBookAC());
                }}>찜한 책
              </h3>
            </ListBox>
          </List>

        </Menu>
        <div>
          {
            category === "myAudio" && myAudio ?
              <span>총 {myAudio.length}개</span>
              :
              category === "myFunding" && myFunding ?
                <span>총 {myFunding.length}개</span>
                :
                category === "listen" && listenAudio ?
                  <span id='num'>총 {listenAudio.length}개</span>
                  :
                  category === "likeBook" && likeBook ?
                    <span id='num'>총 {likeBook.length}개</span>
                    :
                    null
          }

          {
            (category === "myAudio") && (myAudio && myAudio.length === 0) ?
              <AudioReviewNone>
                아직 등록한 오디오북이 없네요! 오디오북을 등록해볼까요?
              </AudioReviewNone>
              :
              (category === "myFunding") && (myFunding && myFunding.length === 0) ?
                <AudioReviewNone>
                  아직 펀딩을 시도하지 않았어요! 펀딩을 시작해볼까요?
                </AudioReviewNone>
                :
                (category === "listen") && (listenAudio && listenAudio.length === 0) ?
                  <AudioReviewNone>
                    아직 듣고 있는 오디오북이 없어요! 들으러 가볼까요?
                  </AudioReviewNone>
                  :
                  (category === "likeBook") && (likeBook && likeBook.length === 0) ?
                    <AudioReviewNone>
                      아직 찜한 책이 없어요! 책을 둘러보러 가볼까요?
                    </AudioReviewNone>
                    :
                    null
          }
          <Body1>

            {category === "myAudio" ? myAudio.map((item, idx) => (
              <MyPageAudioBook key={idx} item={item} />
            ))
              :
              category === "myFunding" ? myFunding.map((item, idx) => (
                <MyPageAudioBook key={idx} item={item} />
              ))
                :
                category === "listen" ? listenAudio.map((item, idx) => (
                  <MyPageAudioBook key={idx} item={item} />
                ))
                  :
                  category === "likeBook" ? likeBook.map((item, idx) => (
                    <MyPageAudioBook key={idx} item={item} />
                  ))
                    :
                    null
            }
          </Body1>
        </div>
      </Wrap1>
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



const AudioReviewNone = styled.div`
  width: 100%;
  min-height: 200px;
  

  /* background-color: purple; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

// const SellerImg = styled.div`
//   width: 130px;
//   height: 130px;
  
//   border-radius: 15px;
//   border: 1px solid #878787;
  
//   cursor: pointer;
  

//   overflow: hidden;

// img {
//   width:100%;
//   height:100%;
//   object-fit:cover;
// }
// `

const Wrap1 = styled.div`
  width: 1100px;
  min-height: 1500px;
  margin: 0 auto;
  margin-top: 100px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  position: relative;
  /* background-color: lightblue; */
  padding-top: 30px;
  padding-bottom: 30px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;

  #num {
    font-size: 16px;
    margin: 0px 0px 5px 8px;
  }
`

const Menu = styled.div`
  width: 290px;
  /* margin: 0 auto; */
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* background-color: white; */
  position: relative;
  
  border-radius: 10px;

  padding-bottom: 30px;

  /* font-family: 'Pretendard';
  font-style: normal; */
`

const Body1 = styled.div`
  width: 750px;
  height: 700px;

  overflow-y: scroll;
    ::-webkit-scrollbar {
     /* 세로 스크롤 넓이 */  
      width: 7px;
      height: 100%;
      
      border-radius: 6px;
      /* background: #FFFFFC; */
      /* border: 1px solid #000000; */
    }
    ::-webkit-scrollbar-thumb {
      height: 17%;
      background-color: #000000;
      border-radius: 6px;
    }


  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  /* position: relative; */
  /* background-color: yellow; */
  padding-bottom: 30px;

`

const Profile = styled.div`
  width: 290px;
  min-height: 220px;
  /* height: 100%; */

  /* background-color: purple; */
  display: flex;
  flex-direction: column;
  align-items: center;

  .audio {
      width: 100%;
      height: 80px;
      border-radius: 5px;
      background: none;
      margin-bottom: 20px;
      /* box-shadow: none; */

      .rhap_progress-indicator {
      background: #0C0A0A;;

    }
    
    .rhap_volume-indicator {
      background: #0C0A0A;;

    }
      div {
        /* background : black; */
        color : black;
      }

      div.rhap_progress-filled {
        background-color : #0C0A0A;;

      }

      button {
        color : #0C0A0A;;

      }
    }

  #btn {
    width: 290px;
    height: 48px;

    /* box-sizing: border-box; */
    border-radius: 10px;
    background-color: #0C0A0A;;

    color: #FFFFFF;

    font-weight: 400;
    font-size: 14px;

    cursor: pointer;
  }

  #creatorform {
    width: 100%;
    /* background-color: yellow; */
    margin-top: 13px;
    margin-left: 3px;

    font-weight: 300;
    font-size: 16px;
    line-height: 100%;
    text-decoration-line: underline;

    color: #0C0A0A;

    :hover {
      color: purple;
      cursor: pointer;
    }
  }
`

const Box = styled.div`

/* background-color: yellow; */
  width: 290px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  margin: 5px 0px;

  

  #img {
    width: 100px;
    height: 100px;
    /* margin-top: 40px; */

    border-radius: 15px;
    border: 1px solid black;
    overflow: hidden;

    img {
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }

  #username {
    width: 59%;
    /* margin-top: 40px; */

    h4 {
      font-weight: 700;
      font-size: 22px;
      margin: 0px 0px 10px 0px;
    }

    h5 {
      font-weight: 300;
      font-size: 13px;
      margin: 2px 0px 0px 0px;

      span {
        font-weight: 500;
      }
    }
  }


  h3 {
    width: 100%;
    /* min-height: 10px; */
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;

    text-align: justify;

    color: #0C0A0A;
  }
`

const List = styled.div`
  width: 290px;
  height: 300px;

  /* background-color: yellow; */
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* border: 1px solid #EAEAEA; */
  /* border-radius: 10px; */
`

const ListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin: 10px 0px;

  /* background-color: red; */

  h3 {
    margin: 8px 0px;
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    color: #525252;
  }
  
`

const ModalBox = styled.div`
  position: absolute;
  top: calc(25vh - 100px);
  left: calc(40vw - 150px);
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

    :hover {
      background-color: #FFFEFC;
      border: 1px solid #000000;
      color: #000000;
      cursor: pointer;
    }
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

  /* background-color: yellow; */
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
  /* background-color: red; */

  
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
`

const Body = styled.div`
  width: 220px;
  /* background-color: rebeccapurple; */

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
