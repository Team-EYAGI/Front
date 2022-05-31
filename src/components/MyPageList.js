import React from 'react';
import styled from 'styled-components';
import MyPageAudioBook from '../components/MyPageAudioBook';
import { useParams } from 'react-router-dom';
import useSWR from "swr";
import fetcher1 from "../shared/Fetcher1";
import Spinner from '../elements/Spinner';

const MyPageList = ({ Token }) => {
  const params = useParams();
  const category = params.category;

  const { data: audio } = useSWR([process.env.REACT_APP_BASE_URL + `/load/profiles/library/audio`, Token], fetcher1)
  const { data: likebook } = useSWR([process.env.REACT_APP_BASE_URL + `/load/profiles/library/book`, Token], fetcher1)
  const { data: myAudio } = useSWR([process.env.REACT_APP_BASE_URL + `/load/profiles/seller/audioBook`, Token], fetcher1)
  const { data: myFunding } = useSWR([process.env.REACT_APP_BASE_URL + `/load/profiles/seller/fund`, Token], fetcher1)

  if (!audio || !likebook || !myAudio || !myFunding) {
    return <Spinner />
  };

  return (
    <React.Fragment>
      <div>
          {
            category === "myAudio" && myAudio ?
              <span>총 {myAudio.length}개</span>
              :
              category === "myFunding" && myFunding ?
                <span>총 {myFunding.length}개</span>
                :
                category === "listen" && audio ?
                  <span id='num'>총 {audio.length}개</span>
                  :
                  category === "likeBook" && likebook ?
                    <span id='num'>총 {likebook.length}개</span>
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
                (category === "listen") && (audio && audio.length === 0) ?
                  <AudioReviewNone>
                    아직 듣고 있는 오디오북이 없어요! 들으러 가볼까요?
                  </AudioReviewNone>
                  :
                  (category === "likeBook") && (likebook && likebook.length === 0) ?
                    <AudioReviewNone>
                      아직 찜한 책이 없어요! 책을 둘러보러 가볼까요?
                    </AudioReviewNone>
                    :
                    null
          }
          <Body>

            {category === "myAudio" ? myAudio.map((item, idx) => (
              <MyPageAudioBook key={idx} item={item} />
            ))
              :
              category === "myFunding" ? myFunding.map((item, idx) => (
                <MyPageAudioBook key={idx} item={item} />
              ))
                :
                category === "listen" ? audio.map((item, idx) => (
                  <MyPageAudioBook key={idx} item={item} />
                ))
                  :
                  category === "likeBook" ? likebook.map((item, idx) => (
                    <MyPageAudioBook key={idx} item={item} />
                  ))
                    :
                    null
            }
          </Body>
        </div>
    </React.Fragment>
  )
}

const Body = styled.div`
  width: 750px;
  height: 700px;

  overflow-y: scroll;
    ::-webkit-scrollbar {
     /* 세로 스크롤 넓이 */  
      width: 7px;
      height: 100%;
      
      border-radius: 6px;

    }
    ::-webkit-scrollbar-thumb {
      height: 17%;
      background-color: #000000;
      border-radius: 6px;
    }


  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  padding-bottom: 30px;

`

const AudioReviewNone = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

export default MyPageList;