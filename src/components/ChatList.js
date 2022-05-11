import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// import { Grid, Text, Image } from "../elements";
import { Grid, Text } from "../elements/Index";
const ChatList = (props) => {

  const userId = localStorage.getItem("userId");
  console.log(userId);
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
      <Grid
        is_flex4="t"
        border="none"
        radius="0.8rem"
        justify_content="center"
        bg="rgba(54, 55, 60, 0.2)"
        height="2.8rem"
        margin="0 auto 1.6rem"
      >
        <Text>
          {props.item.message}
        </Text>
      </Grid>
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
          }
          
          >
            {/* <Name>
            </Name> */}
            <Card
             align_items = "flex-end"
            justify_content ="flex-end"
            >
              <p>{DB_time}</p>
              <p>{props.item.message} text test</p>
            </Card>
            </Wrap>
        </React.Fragment>
      )
    } else{
      return (
        <React.Fragment>
          <Wrap
          align_items = "flex-start"
          justify_content = "flex-start"
          >
            <Name>
              <p>{props.item.sender_id} 임의에 유저명</p>
            </Name>
            <Card
            align_items = "flex-start"
            justify_content = "flex-start"
            >
              <p>{DB_time}</p>
              <p>{props.item.message} text test</p>
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
  // align-items: flex-start;
  // justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px;
  /* height: 30px; */
  & * {box-sizing: border-box;}
`

const Name = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-algin: right;

  & p {margin: 0; padding-bottom: 8px;}
`

const Card = styled.div`
  display: flex;
  // justify-content: flex-end;
  & p { color: #fff; font-weight: 500; margin: 0; display: flex; align-items: flex-end; justify-content: flex-end; padding-right: 8px;}
  & p:last-child { background-color: yellow; margin: 0; padding: 10px 8px;border-radius: 5px; box-shadow: 6px 5px 5px rgb(92 86 86); color:#222;}
`

export default ChatList;