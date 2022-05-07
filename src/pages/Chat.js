import React from 'react';
import styled from 'styled-components';
import ChatList from '../components/ChatList';

import Stomp from "stompjs";
import SockJS from "sockjs-client";

const Chat = () => {

  let sockjs = new SockJS("http://{}/webSocket");
  let client = Stomp.over(sockjs);

//   React.useEffect(() => {
//     client.connect({}, () =>{
//         console.log('Connected : ' + auth.user.id)
//         client.send("/app/join", {},JSON.stringify(auth.user.id))

//         // Create Message
        
//         client.send(`/app/chat/${(메세지받을대상)user.id}`,{},JSON.stringify(res.data))

//         client.subscribe('/queue/addChatToClient/'+auth.user.id, function(messageDTO){
//             const messagedto = JSON.parse(messageDTO.body)
//         })

//     })  
//     return () => client.disconnect();

// }, [client, auth.user.id, dispatch])

  return (
    <React.Fragment>
      <Wrap>
        <div>채팅방</div>
        <div id='hello'>
          <ChatList />
          <ChatList />
          <ChatList />
        </div>
        <div>
          <input type="text" />
          <button>전송</button>
        </div>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  background-color: lightblue;

  width: 1200px;
  /* height: 800px; */
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  #hello {
    background-color: yellow;
    width: 1000px;
    min-height: 600px;
  }
`

export default Chat