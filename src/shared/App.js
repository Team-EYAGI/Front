import React from 'react';
import '../App.css';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from "connected-react-router";
import {history} from "../redux/configureStore";

// 페이지 목록
import AudioPlay from '../pages/AudioPlay';
import AudioWrite from '../pages/AudioWrite';
import Book from '../pages/Book';
import BookDetail from '../pages/BookDetail';
import Funding from '../pages/Funding';
import FundingDetail from '../pages/FundingDetail';
import FundingWrite from '../pages/FundingWrite';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Request from '../pages/Request';
import RequestWrite from '../pages/RequestWrite';
import Search from '../pages/Search';
import Header from '../components/Header';
import Footer from '../components/Footer';

function App() {
  return (
    <React.Fragment className="App">
      <ConnectedRouter history={history}>
        <Header/>
        <Route path="/" exact component={Main}/>
        <Route path="/login" exact component={LogIn}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/audioPlay" exact component={AudioPlay}/>
        <Route path="/audioPlay/:bookId" exact component={AudioPlay}/>
        <Route path="/audioWrite" exact component={AudioWrite}/>
        <Route path="/audioWrite/:bookId" exact component={AudioWrite}/>
        <Route path="/book/" exact component={Book}/>
        <Route path="/book/:category" exact component={Book}/>
        <Route
          path="/bookDetail/:category/:bookId"
          exact="exact"
          component={BookDetail}/>
        <Route path="/funding" exact component={Funding}/>
        <Route path="/fundingDetail" exact component={FundingDetail}/>
        <Route path="/fundingWrite" exact component={FundingWrite}/>
        <Route path="/mypage" exact component={MyPage}/>
        <Route path="/mypage/:category" exact component={MyPage}/>
        <Route path="/request" exact component={Request}/>
        <Route path="/requestWrite/:bookId" exact component={RequestWrite}/>
        <Route path="/search" exact component={Search}/>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
