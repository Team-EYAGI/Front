import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as getActions } from "../redux/modules/fund";


const FundingDetail = () => {
  const params = useParams();
  const fundId = params.fundingId;
  const dispatch = useDispatch();

  const fundingDetail = useSelector((state) => state.fund.fund_detail);

  const boolean = fundingDetail.myHeart === false ? false : true;
  const [fundHeartBool, setFundHeartBool] = useState(boolean);

  const addLike = () => {
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
  }, []);

  return (
    <React.Fragment>
      {/* {fundingDetail ? ( */}
      <Wrap>
        <Player>
          <PlayerImg>
            <AudioHeader>오디오 펀딩  >  펀딩 상세</AudioHeader>
            <ImgSt
              style={{ backgroundImage: `url(${fundingDetail.bookImg})` }}
            >
              <div id="img_wrap">
                <div id="img">
                  <img src={fundingDetail.bookImg} />
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
                  <img src={fundingDetail.sellerImg} />
                </div>
                <div id="profile">
                  {/* <div id="followdiv"> */}
                  <span id="follower">
                    팔로워 {fundingDetail.followerCnt}명
                  </span>
                  {/* <div>
                    {fundingDetail.myHeart === false ?
                      <button
                        onClick={() => {
                          dispatch(followActions.audiofollowAC(sellerId));
                        }}
                      >follow</button>
                      :
                      <button
                        onClick={() => {
                          dispatch(followActions.audiofollowAC(sellerId));
                        }}
                      >unfollow</button>
                    }
                  </div> */}
                {/* </div> */}
                <br />
                <span id="introduce">
                  {fundingDetail.introduce}
                </span></div>
            </ProfileInfo>
          </Profile>
        </PlayerImg>

        <Goal>
          {/* 책 정보 */}
          <h3>{fundingDetail.bookTitle}</h3>
          <h4>
            {" "}
            저자 : {fundingDetail.author} / 크리에이터 : {fundingDetail.sellerName}
          </h4>

          {/* 펀딩정보 */}
          <Info>
            <div id="heart">
              <div className="goal">
                목표 좋아요
                <div>{fundingDetail.fundingGoals}개</div>
              </div>
              <br />
              <div className="finish">달성한 좋아요
                <div>{fundingDetail.likeCnt}개</div>
              </div>
            </div>
            <div id="heartBtn">
              {fundingDetail.myHeart === false ?
                <Like
                  onClick={addLike}
                >
                  <AiOutlineHeart id="icon" size="40px" />
                  <h4>{ }</h4>
                </Like>
                :
                <Like
                  onClick={addLike}
                >
                  <AiFillHeart id="icon" size="40px" />
                  <h4>{ }</h4>
                </Like>
              }
            </div>

          </Info>
          <div id="creator">{fundingDetail.content}</div>
        </Goal>
      </Player>
    </Wrap>
      {/* ) : null} */ }
    </React.Fragment >
  );
};


const Like = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  width: 90px;
  height: 90px;
  font-size: 15 px;
  text-align: center;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  cursor: pointer;

  h4 {
    width: 100%;
  }

  #icon {
    margin-top: 15px;   
  }
`;

const Wrap = styled.div`
  width: 1100px;
  height: 800px;
  position: relative;
  display: flex;
  background: #ffffff;
  border: none;
  margin: auto;
  font-style: normal;
  font-size: 18px;
  justify-content: space-between;
  /* background-color: red; */
`;

const Player = styled.div`
  width: 464px;
  height: 100%;
  display: flex;

  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding-bottom: 30px;
  font-weight: 500;
  font-style: normal;
  margin-left: 40px;
  /* background-color: purple; */
  
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
  margin: 0 auto;
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
  /* background-color: blue; */
  /* border: 1px solid gray;
  border-radius: 10px; */
  width: 464px;
  height: 200px;
  margin-top: 30px;
  font-family: 'Pretendard';

  #creatorname {
    font-family: 'Pretendard';
    font-size: 30px;
  }
`;


const ProfileInfo = styled.div`
display: flex;
flex-direction: row;
/* margin: 16px 0px; */
/* width: 100%; */
justify-content: space-between;
width: 464px;
height: 199px;

#profileImg {
  width: 150px;
  height: 150px;
  border-radius: 30px; //이거왜안돼?

  img{
    width: 100%;
    height: 100%;
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
  /* background-color: orange; */
  width: 500px;
  height: 100%;
  margin-left: 120px;
  margin-top: 160px;
  
h3 {
    width: 464px;
    height: 50px;
    float: left;
    margin: 0px 0px 0px 0px;
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
    width: 460px;
    height: 220px;
    border-radius: 10px;
    border: 1px solid #c4c4c4;
    padding: 10px;
    margin-top:  50px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  width: 480px;
  height: 90px;
  /* border: 1px solid red; */


  #heart {
    border: 1px solid gray;
    border-radius: 10px;

    width: 480px;
    height: 75px;

    display: flex;
    flex-direction: column;
    justify-content: left;

    align-items: left;
    text-align: left;
    vertical-align: middle;   
    font-size: 15 px;
    
    margin-right: 5px;
    padding-left: 10px;
    padding-top: 15px;
    
    /* background-color: green; */
  }
  
  .goal {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 10px;
  }

  .finish {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 10px;
  }
  #heartBtn {
    /* background-color: yellowgreen; */
    width: 90px;
    height: 90px;
  }
`;

const AudioHeader = styled.div`
  width: 1100px;
  height: 60px;
  
  margin-top: 20px;
  margin-bottom: 20px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  `

export default FundingDetail;
