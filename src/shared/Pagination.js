import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styled from "styled-components";

const PaginationSize = ({ totalPages, setPage }) => {
  return (
    <Page>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          onChange={(e, page) => setPage(page)}
          shape="rounded"
        />
      </Stack>
    </Page>
  );
}

const Page = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`

export default PaginationSize;