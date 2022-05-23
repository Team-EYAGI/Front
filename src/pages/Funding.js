import React from 'react';
import styled from 'styled-components';
import FundingCardList from '../components/FundingCardList';
import { useParams } from "react-router-dom";
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/fund";
import Pagination from "../shared/Pagination"


// 카테고리 북 페이지
const Funding = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [page, setPage] = React.useState(1)

  const funding = useSelector((state) => state.fund.fund_list);
  const totalPages = useSelector((state) => state.fund.totalPages);


  React.useEffect(() => {
    dispatch(getActions.getFundingAC(page));
  }, [page]);


  return (
    <React.Fragment>
      <FundingCardList funding={funding} />
      <Pagination totalPages={totalPages} setPage={setPage}/>
    </React.Fragment>
  )
}

export default Funding;