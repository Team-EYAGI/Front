import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as getActions } from "../redux/modules/fund";
import { history } from "../redux/configureStore";
import { FcApproval } from "react-icons/fc";
import Swal from 'sweetalert2';

const FundingDetail = () => {
  const params = useParams();
  const fundId = params.fundingId;
  const dispatch = useDispatch();

  const fundingDetail = useSelector((state) => state.fund.fund_detail);

  const sellerId = fundingDetail.sellerId
  const username = localStorage.getItem("username");
  const is_login = localStorage.getItem("is_login");

  const boolean = fundingDetail.myHeart === false ? false : true;
  const [fundHeartBool, setFundHeartBool] = useState(boolean);

  const addLike = () => {
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
      return;
    } else if (username == fundingDetail.sellerName) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `내가 등록한 펀딩입니다!`,
        showConfirmButton: false,
        timer: 1500,
        color: "#000000",
      })
      return;
    } else if (fundingDetail.fundingGoals === fundingDetail.likeCnt) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `이미 완료된 펀딩입니다`,
        showConfirmButton: false,
        timer: 1500,
        color: "#000000",
      })
      return;
    }

    if (fundHeartBool == false) {
      setFundHeartBool(true)
      dispatch(getActions.addLikeDB(fundHeartBool, fundId));
    } else {
      setFundHeartBool(false)
      dispatch(getActions.addLikeDB(fundHeartBool, fundId));
    }
  }

  const player = useRef();

  useEffect(() => {
    player.current.audio.current.pause();
  }, [fundingDetail]);

  useEffect(() => {
    dispatch(getActions.getFundingDetailAC(fundId));
    return () => {
      dispatch(getActions.clean())
    }
  }, []);

  return (
    <React.Fragment>
      <AudioHeader>오디오 펀딩  >  {fundingDetail.bookTitle && fundingDetail.bookTitle.split("(")[0]}</AudioHeader>

      <Player>
        <PlayerImg>
          <ImgSt
            style={{ backgroundImage: `url(${fundingDetail.bookImg})` }}
          >
            <div id="img_wrap">
              <div id="img">

                <img alt="책 이미지" src={fundingDetail.bookImg} />
              </div>
              {/* 오디오 플레이어 */}
              <AudioPlayer
                className="audio"
                autoPlay={false}
                src={fundingDetail.fundFile}
                volume={1}
                showJumpControls={false}
                ref={player}
                onPlay={(e) => console.log("onPlay")}
              />
            </div>
          </ImgSt>

          <Profile>
            <div id="name">
              <span id="creatorname">
                {fundingDetail.sellerName}
              </span>
              &nbsp;&nbsp;
              <span id="fixname">크리에이터</span>
            </div>
            <ProfileInfo>
              <div id="profileImg">
                <img
                  alt="크리에이터 이미지"
                  src={fundingDetail.sellerImg ? fundingDetail.sellerImg : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTB2Sn%2FbtrB4PINn6v%2FpPKEkCp0WIdi5JI9NGvzrk%2Fimg.png"}
                  onClick={() => {
                    history.push(`/sellerProfile/${sellerId}/audiobook`)
                  }}
                />
              </div>
              <div id="profile">
                <span id="follower">
                  팔로워 {fundingDetail.followerCnt}명
                </span>
                <br />
                <span id="introduce">
                  {fundingDetail.introduce}
                </span>
              </div>
            </ProfileInfo>
          </Profile>
        </PlayerImg>

        <Goal>
          {/* 책 정보 */}
          <Success>
            {fundingDetail.successFunding === true && (
              <FcApproval id="crown" size="40px" />
            )}
            <h2>{fundingDetail.bookTitle && fundingDetail.bookTitle.split("(")[0]}</h2>
          </Success>
          <h4>
            저자 : {fundingDetail.author} / 크리에이터 : {fundingDetail.sellerName}
          </h4>

          {/* 펀딩정보 */}
          <Info>
            <div id="heart">
              <div className="goal">
                목표 좋아요
                <span>{fundingDetail.fundingGoals}개</span>
              </div>

              <div className="goal">달성한 좋아요
                <span>{fundingDetail.likeCnt}개</span>
              </div>
            </div>
            <div id="heartBtn">
              {fundingDetail.myHeart === false ?
                <Like
                  onClick={addLike}
                >
                  <AiOutlineHeart id="icon" size="40px" />
                </Like>
                :
                <Like
                  onClick={addLike}
                >
                  <AiFillHeart id="icon" size="40px" color="red" />
                </Like>
              }
            </div>
          </Info>

          <div id="creator">
            <span >
              {fundingDetail.content}
            </span>
          </div>
          {is_login && fundingDetail.successFunding === true && username === fundingDetail.sellerName && (
            <button
              onClick={() => {
                history.push(`/audioWrite/${fundingDetail.category}/${fundingDetail.bookId}`)
              }}>
              내 오디오 등록하기
            </button>
          )}
          
          {fundingDetail.successFunding === true && (
            <button
              onClick={() => {
                history.push(`/bookdetail/${fundingDetail.category}/${fundingDetail.bookId}`)
              }}>
              오디오북 들으러 가기
            </button>
          )}

        </Goal>
      </Player>
    </React.Fragment >
  );
};


const Like = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  cursor: pointer;

  #icon {
    /* margin-top: 15px;    */
  }
`;


const Player = styled.div`
  width: 1100px;
  height: 800px;
  display: flex;

  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  position: relative;
  font-family: Pretendard;
  font-weight: 500;
  font-style: normal;
  margin: 0 auto;
  
  h5 {
    width: 190px;
    float: left;
    margin: 0px 0px 16px 0px;
    font-size: 16px;
    font-weight: 300;
  }

  /* 오디오 플레이어 커스텀 */
  .audio {
    width: 100%;
    height: 80px;
    border-radius: 20px;
    background: none;
    box-shadow: none;

    div {
      background: "white";
      color: white;
    }

    div.rhap_progress-filled {
      background-color: white;
    }

    button {
      color: white;
    }
  }
`;

const PlayerImg = styled.div`
  width: 464px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
  font-weight: 400;
  font-style: normal;
`;

const ImgSt = styled.div`
  width: 464px;
  height: 464px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;

  #img_wrap {
    width: 464px;
    height: 464px;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(26px);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 30px;
  }

  #img {
    width: 149px;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  img {
    width: 100%;
    border-radius: 2px 10px 10px 2px;
  }
`;

const Profile = styled.div`
  width: 464px;
  height: 200px;
  margin-top: 30px;

  #creatorname {
    font-size: 30px;
    font-weight: bold;
  }

  #follower {
    font-weight: bold;
  }
`;


const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 464px;
  height: 199px;
  margin-top: 20px;

  #profileImg {
    width: 150px;
    height: 150px;
    border-radius: 15px;


    img{
      width: 100%;
      height: 100%;
      border-radius: 15px;
      border: 1px solid gray;
      cursor: pointer;
    }
  }

#profile {
  display: flex;
  flex-direction: column;
  width: 297px;
  height: 150px;

}

`;


const Goal = styled.div`
  width: 500px;
  height: 100%;
  
  h2 {
    margin: 0px;
    width: 464px;
    height: 50px;
    float: left;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    align-items: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }

  h4 {
    width: 464px;
    float: left;
    margin: 0px 0px 15px 0px;
    font-size: 20px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: left;
    color: #8e8e8e;
  }

#creator {
    width: 440px;
    height: 230px;
    border-radius: 10px;
    border: 1px solid #c4c4c4;
    padding: 20px;
    margin-top: 10px;
    flex-wrap: wrap;

    span {
      width: 100%;
      word-break:break-all;
    }
  }


  button {
      width: 480px;
      height: 80px;
      margin-top: 16px;
      border-radius: 10px;
      background: #0C0A0A;
      border: none;
      color: #FFFFFF;
      font-size: 20px;
      font-family: Pretendard;
      font-weight: 400;
      font-style: normal;

      :hover {
        cursor: pointer;
        transform: scale(0.98);
      }
    }
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px 0px;
  display: flex;
  justify-content: space-between;
  width: 480px;
  height: 90px;

  #heart {
    border: 1px solid #C4C4C4;
    border-radius: 10px;

    width: 380px;
    height: 90px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: space-around;
    text-align: left;
    vertical-align: middle;   
    font-size: 15 px;
  }
  
  .goal {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 9px 24px;

    span {
      font-weight: bold;
    }
  }

  
  #heartBtn {
    width: 90px;
    height: 90px;
  }
`;

const AudioHeader = styled.div`
  width: 1100px;
  height: 60px;

  margin: 50px auto 10px auto;
  position: relative;
  display: flex;
  align-items: center;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

const Success = styled.div`
  flex-direction: row;
  display: flex;
`;

export default FundingDetail;
