<p align="center">
<img src="https://user-images.githubusercontent.com/61370487/171013112-796a9d06-6b91-4012-9af7-ee9ccfb20eaf.png" alt="pick-git-logo" width="300" height="300">
</p>
<div align="center">
  
💻 다양한 사람들의 목소리를 연결하는 오디오북 사이트</br>
🌏 [이야기 (eyagi)](https://www.eyagibook.shop/)
</div>
<div align="center">
  
<a href="https://balanced-desk-3a4.notion.site/EYAGI-06e6113484324fe8ba37ec83e5e70b8d"><img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white&link=https://balanced-desk-3a4.notion.site/EYAGI-06e6113484324fe8ba37ec83e5e70b8d/"/></a>
<a href="https://www.instagram.com/_eyagi_"><img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white&link=https://www.instagram.com/_eyagi_/"/></a>
  
</div>
<br/>

# 🙌 <strong>프로젝트 소개
 저희 EYAGI(이야기)에서는
책을 "듣고 싶은 사람"이 원하는 취향의 목소리와 낭독 스타일을 찾아 책을 들으며 낭독자에게 반응을 주고, 듣고싶은 책이 있다면 오디오북으로 요청글을 올릴 수도 있습니다.

자신의 목소리를 "들려주고 싶은 사람"은 오디오북으로 등록하고 싶은 책을 찾아, 펀딩을 신청하면 자신에게 달리는 사람들의 호감도를 확인 할 수 있고, 그로 인해 얼마나 많은 사람들이 내 오디오를 들어줄지 확인 한 후, 오디오북 "연재"를 시작할 수 있습니다. (펀딩 신청시, 목표치를 정하고 달성이 되면 연재를 시작합니다! )
이렇게 "듣고 싶은 사람"과 "들려주고 싶은 사람이" 함께 상부상조하는 오디오북 서비스입니다.
여러 사람들이 올려놓은 재밌는 오디오북도 들어보고!
크리에이터(낭독자)로 전환 신청하여 자신의 목소리를 세상 밖에 들려주세요!
<br />
<br />

# 🛠 <strong>기술스택
<br/>
<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=&logo=JavaScript&logoColor=white"/>
 <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=&logo=Visual Studio Code&logoColor=white"/>
<br>
<img src="https://img.shields.io/badge/React-61DAFB?style=&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=&logo=React Router&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-6828e2?style="/>
<img src="https://img.shields.io/badge/SWR-000000?style="/>
<br />
<img src="https://img.shields.io/badge/CSS-1572B6?style=&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/MUI-007FFF?style=&logo=MUI&logoColor=white"/> 
<img src="https://img.shields.io/badge/Swiper-6332F6?style=&logo=Swiper&logoColor=white"/> 
<img src="https://img.shields.io/badge/styled-components-DB7093?style=&logo=styled-components&logoColor=white"/>
<br>
 <img src="https://img.shields.io/badge/AWS Amplify-ff9900?style=&logo=AWS Amplify&logoColor=white"/>
 <img src="https://img.shields.io/badge/Git-F05032?style=&logo=Git&logoColor=white"/>
 <img src="https://img.shields.io/badge/GitHub-181717?style=&logo=GitHub&logoColor=white"/> 
</p>
<br/>
<br/>

# 📚 <strong>기술스택 및 선정이유

|Name|Appliance|Version|선정이유|
|:---:|:---:|:---:|:---:|
|Redux|상태 관리|4.1.2|예측 가능한 데이터 플로우를 그릴 수 있다는 장점이 있고 전역으로 상태관리를 할 수 있는 라이브러리로 리덕스를 선택했습니다.|
|SWR|Data Fetching|1.3.0|리덕스를 사용하다보니 리덕스 흐름에 따른 코드가 길어지는 불편함과 한번 가져온 정보라도 매번 새롭게 get요청을 하여 데이터를 다시 불러오는 것이 비효율적이라는 생각이 들었습니다. 또한 로컬 상태와 서버상태를 맞추기 위해 동기화하는 추가작업이 필요하다는 점에서도 불편함을 느꼈습니다. 그래서 이 부분을 보완해줄 수 있는 SWR을 부분적용하게 되었고 그 결과, 보다 간결한 코드로 한번 불러왔던 정보를 불필요하게 여러번 요청할 필요없이 데이터를 관리할 수 있게 되었습니다.
|Redux-actions|액션 관리|2.6.5|리덕스 사용 시 createAction과 handleActions 함수를 이용하기 위해 선택했습니다.|
|Redux-thunk|리덕스 미들웨어|2.4.1|리액트에서 비동기 작업을 처리할 때 사용하기 위해 선택했습니다.|
|Axios|API 통신|0.27.2|비동기로 HTTP통신을 하기 위해 브라우저 호환성이 높은 AXIOS를 사용했습니다.|
|Immer|불변성 유지|9.0.12|구조가 복잡한 객체라도 간결한 코드로 불변성을 유지하며 상태를 업데이트하기 위해 사용했습니다.|
|sockJs|채팅|1.6.0|국내에서는 아직 Websocket을 지원하지 않는 인터넷익스플로어 사용자가 많기에 크로스 브라우징을 지원하는 sockJS를 선택했습니다.|
|stompJS|채팅|6.1.2|소켓 통신에서 클라이언트와 서버가 전송할 메세지의 유형, 형식, 내용들을 정의하여 좀 더 효율적인 구성을 짤 수 있게 도와주는 stompJS를 선택했습니다.|
|react-h5-audio-player|오디오 플레이어|3.8.4|오디오플레이어 구현을 위해 선택했습니다.|
|swiper|슬라이드|8.1.4|슬라이드가 부드러우며 다양한 UI를 지원하고 있기에 선택했습니다.|
|Sweetalert2|Alert창|11.4.14|기본 알럿 창을 커스텀하여 사용하기 위해 선택했습니다.|
|Styled-components|CSS in JS|5.3.5|자유로은 CSS 커스텀 컴포넌트를 만들 수 있다는 장점이 있어 선택하게 되었습니다.|
|mui/material|CSS|5.7.0|필요한 아이콘과 컴포넌트를 예쁘게 구성하고 있는 CSS라이브러리를 이용해 개발 속도를 높이기 위해 사용했습니다.|


# :books: <strong>eyagi(이야기)
|메인 페이지|오디오북 페이지|댓글|
|:-:|:-:|:-:|
|<img src=https://user-images.githubusercontent.com/61370487/171026913-adb69bee-9171-4b12-b273-8f1a5fe828f3.gif>|<img src=https://user-images.githubusercontent.com/61370487/171030696-98bbaa9e-347b-4633-956c-77462db17670.gif>|<img src=https://user-images.githubusercontent.com/61370487/171026534-71d090f4-0d17-465b-aa59-c2384232e88c.gif>|
|<b>팔로우</b>|<b>오디오북요청</b>|<b>채팅</b>|
|<img src=https://user-images.githubusercontent.com/61370487/171026610-b4584b86-0174-4c28-ae57-b25fe1f561f8.gif>|<img src=https://user-images.githubusercontent.com/61370487/171030045-42a40812-b807-4b52-ab75-199d88a075eb.gif>|<img src=https://user-images.githubusercontent.com/61370487/171029947-8c62bbd1-fe94-41f6-9714-0a08e9e63151.gif>|
|<b>펀딩</b>|<b>검색</b>|<b>마이페이지</b>|
|<img src=https://user-images.githubusercontent.com/61370487/171026925-7215b3f8-7369-4f58-a4f6-bd57493b21ed.gif>|<img src=https://user-images.githubusercontent.com/61370487/171030108-3e4bc940-20ff-497a-9484-e920b958cef9.gif>|<img src=https://user-images.githubusercontent.com/61370487/171030132-8b300843-90f0-4e72-8271-933c75026aff.gif>|

<br/>

# 👨‍💻👩‍💻 <strong>팀원 소개
#### `Frontend`
 <a href="https://github.com/JIEUN24" target="_blank"><img height="40"  src="https://img.shields.io/static/v1?label=React&message=최지은 &color=61dafb&style=for-the-badge&>"/></a>
  <a href="https://choijying21.tistory.com/category/%EC%9B%B9%EA%B0%9C%EB%B0%9C/Weekly%20I%20Learned" target="_blank"><img height="40"  src="https://img.shields.io/static/v1?label=Tistory&message=Blog &color=D05943&style=for-the-badge&>"/></a>

 `메인페이지`  `마이페이지` `오디오북 관련 페이지` `책 관련 페이지` `크리에이터 페이지`  `검색 페이지` `무한스크롤` `페이지네이션` `오디오북 CRD` `오디오북 요청 CRUD` `후기 CRUD` `오디오플레이어 구현` `채팅` `TopScroll` `팔로우 기능 구현` `SWR적용` `무중단 배포(배포 자동화)`
 <br />
 <br />
 <a href="https://github.com/hyopp" target="_blank"><img height="40"  src="https://img.shields.io/static/v1?label=React&message=권효빈 &color=61dafb&style=for-the-badge&>"/></a>
 
 `로그인` `회원가입` `유효성검사` `펀딩 목록 페이지` `펀딩 상세페이지` `펀딩 좋아요 기능` `펀딩 완료 기능` `펀딩 등록 CRD`
  <br />
 <br />
#### `Backend`
<a href="https://github.com/EunheaSong" target="_blank"><img height="40"  src="https://img.shields.io/static/v1?label=Spring&message=송은혜 &color=08CE5D&style=for-the-badge&>"/></a>
<a href="https://github.com/akrwkdrrr99" target="_blank"><img height="40"  src="https://img.shields.io/static/v1?label=Spring&message=김승균 &color=08CE5D&style=for-the-badge&>"/></a>
<a href="https://github.com/yunju2" target="_blank"><img height="40"  src="https://img.shields.io/static/v1?label=Spring&message=권윤주 &color=08CE5D&style=for-the-badge&>"/></a>

 **[(Back-end github)](https://github.com/Team-EYAGI/BE)** 

<br>

#### `Designer`
<a href="https://www.behance.net/lia_works" target="_blank"><img height="40"  src="https://img.shields.io/static/v1?label=Design&message=이아영 &color=F55C54&style=for-the-badge&>"/></a>
<a href="https://seo-jyun-0731.tistory.com/ 
https://blog.naver.com/seojyun0731" target="_blank"><img height="40"  src="https://img.shields.io/static/v1?label=Design&message=서지윤 &color=F55C54&style=for-the-badge&>"/></a>

<br>


# 🔥 <strong>Trouble Shooting
## <strong>1. Redux에서 SWR로 부분 변경</strong>
## <strong>`도입과정 및 문제상황`</strong>
<p>전역상태관리를 위해 리덕스라는 상태관리 라이브러리를 선택하여 사용했는데 리덕스를 사용하다보니 몇가지의 불편한점과 비효율적인 면이 눈에 보이기 시작했습니다. 리덕스에서 비동기 처리를 위해 redux-thunk라는 미들웨어를 사용했는데 아래와 같은 불편한 점에 눈에 보였습니다.

+ 리덕스 흐름에 따라 View -> Dispatch -> Action -> Reducer -> Store -> State 코드를 작성하며 생각보다 많은 양의 코드를 작성하게 됨
+ 한번 가져왔던 정보라도 다시 get요청을 하면 요청을 할 때마다 새롭게 데이터를 불러와야 하는 것이 비효율적
+ 지속적으로 리덕스 로컬 스토어의 상태를 서버 상태와 맞추기 위해 동기화 해야 하는 추가 작업에도 불편함
<br/>
<br/>

## <strong>`해결방안과 배움`</strong>
<p>리덕스의 불편한 점을 해결해보고자 data fetching 라이브러리를 찾아보던 중 SWR과 React-Query를 알게 되었는데 남은 프로젝트 기간을 고려하여 SWR을 먼저 부분 적용해보기로 결정했습니다.
<p>Get요청을 하는 부분에 SWR을 부분 적용하게 될 경우 아래와 같은 장점이 있을 것이라고 판단하였습니다.

+ 리덕스 흐름에 필요한 모든 코드를 작성하지 않아도 됨
+ 기본적으로 한번 가지고 온 데이터를 저장해두고 일정 시간마다 자동으로 네트워크 통신을 하기 때문에 자동으로 최신화 작업을 수행할 수 있음
<br/>
<br/>

## <strong>`결과`</strong>
<p> 이러한 장점을 바탕으로 기존 get요청에 SWR을 부분 적용한 결과, 아래와 같은 결과를 얻었습니다.

+ 보다 간결해진 코드
+ 한번 불러왔던 정보를 불필요하게 여러번 요청할 필요없이 데이터를 관리할 수 있게 됨
+ 로컬과 서버의 상태를 동기화 하기 위해 추가적으로 필요했던 작업 최소화
<br/>
<hr>
<br/>

## <strong>2. Firebase Hosting에서 AWS Amplify로 교체</strong>
## <strong>`도입과정 및 문제상황`</strong>
<p> 서비스를 배포하기 위해 보안상의 문제로 https 적용이 필요했고, 기존에 이용했던 Firebase hosting을 이용하면 SSL 적용을 따로 설정할 필요가 없기에 Firebase hosting을 먼저 시도했습니다.

<p> 이 과정에서 Firebase Hosting을 통해 배포하는 것은 간결하고 좋았지만 배포 시 deploy를 종료했다가 다시 빌드해야하는 과정을 반복하며 불편함을 느껴 배포를 자동화시키는 방법을 찾아보게 되었습니다.
<br/>
<br/>

## <strong>`해결방안과 배움`</strong>
<p>배포 자동화를 구축하는 방법으로 두가지 방법이 있었습니다.
<p>&nbsp;&nbsp; ① Firebase hosting + Github Action
<p>&nbsp;&nbsp; ② Aws amplify 사용하여 배포하기
<br>
<br>
<p> 이 두가지 방법 중 아래의 장점을 바탕으로 AWS Amplify를 선택하게 되었습니다.
<p>&nbsp;&nbsp; ① 두가지를 조합하여 이용하는 번거로움을 해소
<p>&nbsp;&nbsp; ② 저장소 연결 및 빌드 설정 구성 등 간단한 배포과정
<p>&nbsp;&nbsp; ③ git branch 연결을 통한 배포 자동화
<p>&nbsp;&nbsp; ④ SSL 자동 적용
<p>&nbsp;&nbsp; ⑤ AWS amplify console로 간편한 관리
<br/>
<br/>

## <strong>`결과`</strong>
<p> Aws Ampliy로 프론트엔드 배포를 시도한 결과, 아래와 같은 결과를 얻었습니다.

+ 연결해 놓은 git branch에 merge하니 자동으로 배포가 활성화 
+ SSL을 따로 적용하지 않아도 자동으로 적용되어 안전하게 암호화된 연결을 시도 가능
+ 이전 빌드 기록을 통해 언제든지 이전 버전을 재배포할 수 있음
+ 환경변수 세팅이 간편해짐
+ 콘솔을 통한 배포 상황 관리 용이
<br/>
<br/>

# 🔥 <strong>고민과 배움
#### <strong><여기서부터는 서비스와 기능을 구현하며 고민하게 되었던 부분입니다.></strong>
## <strong>1. 디테일한 서비스 플로우, 권한에 대한 고민</strong>

## <strong>`고민과정`</strong>
<p> 백엔드분들과 여러가지 테스트를 하던 중 유저가 URL을 직접 입력하였을 때, 모든 페이지에 접속이 가능하다는 점에 대해 알게 되었습니다. 마이페이지와 같이 로그인 후 각각의 개인에게만 보여야하는 페이지 역시 URL 입력으로 접근이 가능했습니다. 이 부분의 경우 프론트와 백에서 같이 처리를 하는 것이 좋을 것 같아 프론트와 백 모두 접근 권한이 없는 유저를 로그인 페이지로 리다이렉팅시키기로 결정했습니다.
<br/>
<br/>

## <strong>`배움의 결과`</strong>
<p> 로그인을 하지 않거나 페이지를 접근할 수 있는 권한이 없을 때, 로그인 페이지로 리다이렉팅 시켜주는 것이 필요했고 화면이 렌더링 될 때 권한을 확인하여 리다이렉팅 시켜주는 방법을 적용했습니다.

<p>버튼을 눌렀을 때나 보이는 곳에서의 기능에서 접근을 막아주는 것은 당연히 생각했던 부분이었는데 URL을 바로 입력했을 때 페이지가 이동되는 부분은 생각하지 못했었습니다. 서비스를 기획하고 기능을 구현하면서 클라이언트에게 어디까지가 허용되는가를 조금 더 세심하게 살필 필요가 있다는 생각을 하게 되었고, 권한에 대한 고민을 조금 더 깊게 해볼 필요가 있다는 생각을 하게 되었습니다.
<br/>
<hr>
<br/>

## <strong>2. 디테일한 서비스 플로우, 유저 입장에서의 로딩과 페이지 전환</strong>
## <strong>`고민과정`</strong>
<p> 유저가 오디오를 업로드 할 때는 기다려야하는 상황이 생기고, 로그인이나 회원가입을 할 때는 다른 곳으로 페이지 이동을 하는 상황이 생깁니다. 이렇게 기다리거나 페이지가 전환되는 상황에서 유저가 보는 화면이 매끄럽게 유지될 수 있도록 하는 디테일한 부분을 신경썼는데 이를 어떻게 하면 부드럽게 보여줄 수 있는지에 대해 고민하게 되었던 것 같습니다.
<br/>
<br/>

## <strong>`배움의 결과`</strong>
<p> 유저가 화면을 보고 있을 때, 기다려야하는 상황이 생기는 경우 로딩중이라는 것을 확인할 수 있도록 화면을 구성하였고, 화면 전환이 이루어질 때 어떠한 플로우로 작업이 이루어지는지를 한눈에 볼 수 있도록 구성하였습니다. 그 결과, 실제 프로젝트 배포 후 화면 전환의 디테일한 부분에 신경을 많이 쓴 것 같아 전환이 매끄럽고 부드럽다는 피드백을 받았고 프론트엔드 개발자로서 디테일한 부분을 놓치지 않았다는 것에 뿌듯함을 가질 수 있었습니다.
<br/>
<br/>

# 아키텍처(Architecture)
<p align="center">
<img src="https://user-images.githubusercontent.com/61370487/171578575-f5fdb814-1d71-434f-9879-cc9004432ef7.png">
</p>