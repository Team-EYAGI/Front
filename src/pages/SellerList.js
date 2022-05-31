import React from 'react';
import SellerCardList from '../components/SellerCardList';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as getListActions } from "../redux/modules/creator";
import Pagination from "../shared/Pagination"


// 카테고리 북 페이지
const SellerList = () => {
  const dispatch = useDispatch();
  const creatorList = useSelector((state) => state.creator.creator_list);
  const totalPages = useSelector((state) => state.creator.totalPages);

  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    dispatch(getListActions.getListAC(page));
  }, [page]);

  return (
    <React.Fragment>
      <SellerCardList creatorList={creatorList} />
      <Pagination totalPages={totalPages} setPage={setPage}/>
    </React.Fragment>
  )
}

export default SellerList;