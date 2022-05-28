import React from 'react'
import styled from 'styled-components';

const ChatList = (props) => {
  const userId = localStorage.getItem("userId");
  // 메세지 타임
  let time = "";
  if (!(props.item.createdAt === null)) {
    time = props.item.createdAt?.split(" ")[1];
  }

  const DB_time = time?.split(":")[0] + ":" + time?.split(":")[1]; // DB에서 불러온 메세지 시간 정보

  // 조건문 -> 사용자일때는 ~~이렇게 보여라, 아니라면(관리자) ~~이렇게 보여라 걸어주기.
  //components/Message.js 참고. 
  if (props.item.type === "ENTER" || props.item.type === "QUIT") {
    return (
      <React.Fragment>
        <Wrap style={
          {
            alignItems : "center" ,
            justifyContent : "center",
            backgroundColor: "#f4f4f4",
            maxWidth: "70%",
            borderRadius:"5px",
            padding:"0",
            margin:"0"
          }
        }>
          {/* <Text>
            {props.item.message}
          </Text> */}
        </Wrap>
      </React.Fragment>
    );
  }
  if (props.item.type === "TALK") {
    // 내가 보낸 메세지의 뷰
 
    if ((props.item.sender_id) === parseInt(userId)) {
      return (
        <React.Fragment>
          <Wrap style={
            {
              alignItems : "flex-end" ,
              justifyContent : "flex-end"
            }
          }>
            {/* <Name>
            </Name> */}
            <Card style={
              {
                justifyContent : "flex-end"
              }
            }>
              <p className="m_date">{DB_time}</p>
              <p className="my_message">{props.item.message}</p>
            </Card>
            </Wrap>
        </React.Fragment>
      )
    } else{
      return (
        <React.Fragment>
          <Wrap style={
            {
              alignItems : "flex-start" ,
              justifyContent : "flex-end"
            }
          }>
            <Name>
              <p>{props.item.sender_id}</p>
            </Name>
            <Card style={
              {
                justifyContent : "flex-start",
                flexDirection:"row-reverse",
              }
            }
            >
              <p className="a_date">{DB_time}</p>
              <p className="another">{props.item.message}</p>
            </Card>
          </Wrap>
        </React.Fragment>
      )
    }
  }
}

const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px;
  & * {box-sizing: border-box;}
`

const Name = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-algin: right;
  alignItems : flex-end;
  display: none;

  & p {margin: 0; padding-bottom: 8px;}
`

const Card = styled.div`
  display: flex;
  padding-top: 12px;
  // justify-content: flex-end;
  & .m_date { color: #fff; font-weight: 300; margin: 0; display: flex; align-items: flex-end; justify-content: flex-end; padding-right: 8px; color: #000; font-size: 11px;}
  & .my_message { background-color: #0C0A0A; margin: 0; padding: 12px 21px;border-radius:20px 3px 20px 20px ; color:#fff; font-size: 16px; line-height: 1.5; max-width: 427px; word-break: break-word;}
  & .a_date { color: #fff; font-weight: 300; margin: 0; display: flex; align-items: flex-end; justify-content: flex-end; padding-left: 8px; color: #000; font-size: 11px;}
  & .another {margin: 0; padding: 12px 21px;border-radius:3px 20px 20px 20px ;  color:#222; font-size: 16px; line-height: 1.5; max-width: 427px; word-break: break-word; border: 1px solid #0c0a0a; background-color:#fffefc;}
`

export default ChatList;