import React from 'react';
import styled from 'styled-components';
import MainAdBanner from '../components/MainAdBanner';
import MainBookList from '../components/MainBookList';
import MainCategoryBookList from '../components/MainCategoryBookList';
import MainSellerList from '../components/MainSellerList';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/book";
import MainFundingList from '../components/MainFundingList';
import { history } from '../redux/configureStore';
import { BsFillChatDotsFill } from "react-icons/bs";

import axios from "axios";

const Main = () => {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(getActions.getMainAC());
    dispatch(getActions.getMainCategoryAC());
    dispatch(getActions.getMainFundingAC());
    dispatch(getActions.getMainCreatorAC());
  }, []);

  const main = useSelector((state) => state.book.main);
  const mainCategory = useSelector((state) => state.book.main_category);
  const mainFunding = useSelector((state) => state.book.main_funding);
  const mainCreator = useSelector((state) => state.book.main_creator);
  console.log("메인에 셀러 가져왔니?", mainCreator)


  const checkRoom = () => { 
    const roomId = localStorage.getItem("roomId");

    if (roomId == null) {
      createRoom();
    } else {
      history.push('/Chat');
    }
  };

  const createRoom = () => {       //방이름 => chatRoomName  /  uuid => 닉네임
    // const formData = new FormData();
    // formData.append("name", "임시 채팅방");  
    const Token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");
    const chatRoomName = "문의하기";

    axios.post(process.env.REACT_APP_CHAT_URL + "/chat/rooms",{
        chatRoomName : chatRoomName,
        uuid :userName
      }, {
        headers: {'Authorization': `${Token}` }
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.roomId);
        //scrollbarRef.current.scrollToBottom();
        localStorage.setItem("roomId",res.data.roomId);
        localStorage.setItem("userId",res.data.userId);
        history.push('/Chat');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <SliderWrap>
        <MainAdBanner/>
      </SliderWrap>
      <FunddingWrap>
        <MainFundingList mainFunding={mainFunding}/>
      </FunddingWrap>
      <Wrap>
        <MainBookList main={main}/>
      </Wrap>
      <SellerWrap>
        <MainSellerList mainCreator={mainCreator}/>
      </SellerWrap>
      <CategoryWrap>
        <MainCategoryBookList mainCategory={mainCategory}/>
      </CategoryWrap>
      <Icon>
        <BsFillChatDotsFill onClick={checkRoom} size="50px"/>
      </Icon>

    </React.Fragment>
  )
}

// const SliderWrap = styled.div`
//   width: 1920px;
//   height: 400px;
//   position: relative;
//   margin: 0 auto;
// `


// 메인의 크기는 1100px로 고정
const Wrap = styled.div`

  width: 1100px;
  height: 550px;

  margin: 0 auto;
  margin-bottom: 20px;
  
  position: relative;
  
  display: flex;
  flex-direction: column;
`

const CategoryWrap = styled.div`
  width: 1100px;
  min-height: 550px;

  margin: 0 auto;
  margin-bottom: 20px;
  
  position: relative;
  
  display: flex;
  flex-direction: column;
`

const SellerWrap = styled.div`
  width: 1100px;
  height: 400px;


  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  
  position: relative;
  
  display: flex;
  flex-direction: column;
`

const FunddingWrap = styled.div`
  width: 1100px;
  height: 440px;

  /* background-color: aqua; */

  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
  
  position: relative;
  
  display: flex;
  flex-direction: column;
`

const SliderWrap = styled.div`
  max-width: 1920px;
  width: 100%;
  max-height: 450px;
  margin-top: 100px;
  height: 100%;
  position: relative;
  margin: 0 auto;
`

const Icon = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 1;

  cursor: pointer;

`

export default Main;