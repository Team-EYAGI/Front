import React from 'react'
import styled from 'styled-components';

const ChatList = () => {
  return (
    <React.Fragment>
      <Wrap>
        <Name>
          이름
        </Name>
        <Card>
          내용
        </Card>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
  background-color: blue;
  margin: 10px;

  width: 700px;
  /* height: 30px; */

`

const Name = styled.div`
  background-color: white;

  width: 700px;
  height: 30px;

`

const Card = styled.div`
  background-color: gray;

  width: 700px;
  height: 80px;

`

export default ChatList;