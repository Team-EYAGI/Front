import React from 'react'
import styled from 'styled-components';
import { useSelector } from "react-redux";
import Message from './Message';

const MessageList = (props) => {
  const messages = useSelector((state) => state.chat.messages);

  return (
    <React.Fragment>
      <Wrap>
        {messages.map((item, idx) => {
          return <Message key={idx} item={item} />;
        })}
      </Wrap>
    </React.Fragment>
  )
}
const Wrap = styled.div`
`

export default MessageList;