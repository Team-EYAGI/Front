import * as React from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';


const actions = [
  { icon: <VerticalAlignTopIcon />, name: 'top' },
  { icon: <ContactSupportIcon />, name: '1:1문의' },
];

const SpeedDialOpen = (props) => {
  const { createRoom } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <BoxSt>

    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1, color:"secondary" }}>
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
                createRoom()
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
`

export default SpeedDialOpen;
