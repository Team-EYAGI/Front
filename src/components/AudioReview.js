import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { Text } from '../elements/Index';
import { BsFillPlayFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';

const AudioReview = (props) => {

  console.log("오디오 리뷰 아이디 받아야함", props.item)

  const params = useParams();
  // console.log(params)
  const bookId = params.bookId
  const audioBookId = params.audioBookId
  const category = params.category

  return (
    <React.Fragment>
      <ListBox>
        <div id="listbox">
          <button onClick={() => {history.push(`/reviewWrite/${category}/${bookId}/${audioBookId}/{}`)}}>수정</button>
          <button onClick={() => {}}>X</button>
          <Body>
            <h3 style={{ fontSize: "16px" }}>
              {props.item.username}
            </h3>
            <span>
              {props.item.title}
            </span>
            <hr/>
            <Text margin="0px">{props.item.content}</Text>
          </Body>
        </div>

      </ListBox>
    </React.Fragment>
  )
}

const ListBox = styled.div`
  display: flex;
  flex-direction: row;

  font-family: noto-sans-cjk-kr, sans-serif;
  font-weight: 400;
  font-style: normal;

  border: 1px solid gray;
  border-radius: 10px;

  margin: 10px;

  #listbox {
    margin: 10px;
    /* background-color: rebeccapurple; */
  }
`


const Body = styled.div`
  width: 220px;
  
  h3 {
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }

  span {
    /* background-color: red; */
  }
`

export default AudioReview;