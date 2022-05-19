import React from 'react';
import styled from 'styled-components';
import FundingCardList from '../components/FundingCardList';
import { useParams } from "react-router-dom";
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getActions } from "../redux/modules/fund";


// 카테고리 북 페이지
const Funding = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params)
  // const fundName = params.fund //?


  const funding = useSelector((state) => state.fund.fund_list);
  console.log(funding)

  React.useEffect(() => {
    dispatch(getActions.getFundingAC());
  }, []);


  return (
    <React.Fragment>
      <FundingCardList funding={funding} />
    </React.Fragment>
  )
}

export default Funding;