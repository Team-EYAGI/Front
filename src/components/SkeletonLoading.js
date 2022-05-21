import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonLoading() {
  return (
    <Box sx={{ width: 190 }}>
      <Skeleton
        width={190} 
        height={230} 
        animation="wave"
      />
      <Skeleton/>
      <Skeleton animation={false} />
    </Box>
  );
}