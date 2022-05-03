import React from 'react';
import styled from 'styled-components';

// 버튼 컴포넌트
const Button = (props) => {

  // 버튼 컴포넌트는 props로 아래의 것들을 받아온다.
  const { text, onClick, width, bg, color, padding, margin, bold, radius } = props;

  // props로 받아온 것 중 style에 적용되는 부분을 묶어준다.
  const styles = {
    width: width,
    padding: padding,
    bg: bg,
    color: color,
    margin : margin,
    bold : bold,
    radius : radius,
  }

  return (
    <React.Fragment>
      {/* 스프레드 문법을 사용하여 styles의 모든 것을 ButtonSt에 넣어준다 */}
      <ButtonSt {...styles} onClick={onClick}>{text}</ButtonSt>
    </React.Fragment>
  )
}

// Button 컴포넌트의 속성이 지정되어있지 않을 때의 기본값
Button.defaultProps = {
  text: "텍스트",
  width: "100%",
  padding: "12px 0px",
  color: "white",
  bg: "black",
  margin : false,
  bold : false,
  radius : "0px",
  onClick: () => {}
}

// ButtonSt를 스타일드 컴포넌트로 만들어 props의 속성을 받아온다.
const ButtonSt = styled.button`
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  font-weight: ${(props) => props.bold};
  box-sizing: border-box;
  border: none;
  border-radius : ${(props) => props.radius};
`

export default Button