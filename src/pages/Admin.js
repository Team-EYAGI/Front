import React from 'react'
import styled from 'styled-components';
import AdminChatList from '../components/AdminChatList';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as chatActions } from "../redux/modules/chat";
import { history } from "../redux/configureStore";

// 관리자만 보이는 페이지 
const Admin = () => {
  //채팅방 목록
  //채팅방 리스트도 가져와야함.
  //이전 대화내용 목록도 가져와야함.
  //채팅방 리스트에서 특정 채팅방 클릭시, 해당 채팅방 ID로 이전 대화내용 get하는 api 필요. 
  const Token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.chat.chatListInfo);

  React.useEffect(() => {
    if(Token) {
      dispatch( chatActions.setChatListAX());
      dispatch( chatActions.clearChat());
    }
    return () => { };
  }, []);
  
  // 신규 작성 
  const enterRoom = (room_id, romName, nickname) => {
    // 채팅방 들어갔다가 뒤로가기 누르면 자동으로 방나가기
    // room_id 리덕스에 저장된 걸로 실제 채팅 페이지 이동했을 때 서버연결 시켜서 보여줌
    // 현재 채팅방 정보 바꾸기
    dispatch(
      chatActions.moveChatRoom(
        room_id,
        romName,
        nickname,
      )
    );
    // 채팅방 이동하면서 방 정보 넣어주기
    history.push({
      pathname:`/AdminChat/${room_id}`,
      state: {
        room_id: room_id,
        roomName: romName,
        own_user_id: nickname,
      },
    });
  };
  // 신규 작성 

  return (
    <React.Fragment>
      <Wrap>
        <div id="bd_top">
          <Card>1:1 문의 내역보기</Card>
        </div>
        <div id='hello'>
          {/* //아래 맵에서 채팅방 목록 돌리면서 빼주기. */}
          {roomList.map((item, idx) => (
            <AdminChatList 
              key={idx}
              item={item}
              _onClick={(e)=>{
                enterRoom(
                  item.room_id,
                  item.romName,
                  item.nickname,
                );
              }}
            />
          ))
          }
          {roomList.length === 0 && (
            <div id="empty">"아직 데이터가 없습니다."</div>
          )}
        </div>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`

  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  #hello {
    border: 1px solid #000;
    border-width: 2px 0 0;
    width: 100%;
    min-height: 540px;
  }

  
  #bd_top {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 30px;

    & span {line-height: 1; font-size: 14px; font-weight: 500;}
  }

  #empty {
    width: 100%;
    height: 180px;
    line-height: 180px;
    text-align:center;
    font-size: 18px;
    font-weight: 500;
  }
`

const Card = styled.div`
  color: #000;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  line-height: 1;
`
export default Admin;