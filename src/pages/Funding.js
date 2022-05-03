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


  // const funding = useSelector((state) => state.fund.key);
 

  // React.useEffect(() => {
  //   dispatch(getActions.getFunding());
  // }, []);


  return (
    <React.Fragment>
      <FundingCardList></FundingCardList>
      {/* <Header>
         {key.map((item, idx) => (
           <fund
            key={idx}
            onClick={() => {
              history.push(`/book/${item}`);
            }}
            size="20"
            color="white"
          >
            {item}
          </fund>
          ))}
        </Header>
      <Wrap>
      {fundName === "novel" ? novel.map((item, idx) => (
        <BookCard key={idx} item={item}/>
      ))  : null
      }
      </Wrap> */}
    </React.Fragment>
  )
}

const Wrap = styled.div`
  /* width: 80%; */
  width: 1420px;
  margin-top: 20px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  align-items: center;
  /* background-color: skyblue; */
`

const HeaderSt = styled.div`
  width: 1200px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
  /* background-color: red; */

`

const GenreSt = styled.h3`
  border: 2px solid black;
  border-radius: 20px;
  box-sizing: border-box;
  width: 140px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #333333;
  margin: 20px 10px 0px 10px;
  cursor: pointer;
  :hover {
    /* background-color: #f49a28; */
    /* color: white; */
    border: 1px solid gray;
    box-shadow: 0 0 3px black;
  }
`;


export default Funding;