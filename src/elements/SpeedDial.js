import * as React from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import axios from "axios";

const actions = [
  { icon: <VerticalAlignTopIcon />, name: 'top' },
  { icon: <ContactSupportIcon />, name: '1:1문의' },
];

const new_one = document.getElementById("newMessage");

const findNewMessage = () => {
  const Token = localStorage.getItem("token");
  axios.post(process.env.REACT_APP_CHAT_URL + "/finds/newMessage", {

  }, {
    headers: { 'Authorization': `${Token}` }
  })
    .then((res) => {
      if(res.data.length >= 1) {
        localStorage.setItem("userId", res.data[res.data.length-1].ownUserId);
        localStorage.setItem("roomId", res.data[res.data.length-1].roomId);
      }
      if(res.data[res.data.length-1].newMessage === true) {
        new_one.classList.add("show");
      } else {
        new_one.classList.remove("show");
      }
    })
    .catch((error) => {
      // console.log(error);
    });
}

const SpeedDialOpen = (props) => {
  const { checkRoom } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    if(Token != null) {
      findNewMessage();
    }
  }
  const handleClose = () => setOpen(false); 
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <BoxSt>
      <div id="newMessage">new</div>
    <Box sx={{ height: 190, transform: 'translateZ(0px)', flexGrow: 1, color:"secondary" }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16, color:"secondary" }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              if(action.name === '1:1문의') {
                checkRoom()
              } else {
                scrollToTop()
                handleClose()
              }
            }}
          />
        ))}
      </SpeedDial>
    </Box>
    </BoxSt>
  );
}

// 아이콘 색상 바꾸기
const BoxSt = styled.div`
  .MuiSpeedDial-fab {
    background: black;

    :hover {
    background: black;
    }
  }
  
  #newMessage {
    position:absolute;
    top: -10px; 
    right:0;
    transition: 0.35s all;
    background-color: #fff;
    border: 2px solid #d15c46;
    padding: 5px 3px;
    z-index: 10;
    color: #d15c46;
    border-radius: 5px;
    opacity: 0;
  }

  &:hover #newMessage.show{opacity: 1;}
`

export default SpeedDialOpen;
