import React from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const AdminChatList = (props) => {
  React.useEffect(() => {
    return () => { };
  }, []);

  return (
      <React.Fragment>
        <Wrap>
          <div className="s_line"
            onClick={props._onClick}
          >
            <p className="s_list1">{props.item.userRole}</p>
            <p className="s_list2">{props.item.own_user_id}님의 {props.item.romName}</p>
            <p className="s_list3">{props.item.createdAt}</p>
          </div>
        </Wrap>
      </React.Fragment>
      )
  }

const Wrap = styled.div`
  width: 100%;
  & * {box-sizing: border-box;}
  & > .s_line {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 76px;
    transition: 0.35s all;
    border-bottom: 1px solid #aaa;
    text-align : left;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 500;

    // hover
    :hover {
      background-color: rgba(212,212,212,.5);
    }

    // list
    & .s_list1 {width: 100px; color: #8e8e8e;padding-left: 15px;}
    & .s_list2 {width: calc(100% - 220px); padding:0 30px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; letter-spacing: 0.03em;}
    & .s_list3 {width: 120px; color: #000; text-align:center;}
  }
`

export default AdminChatList;