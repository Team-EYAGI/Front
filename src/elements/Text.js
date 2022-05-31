import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { width, height, bg, margin, border, borderRadius, borderLeft, borderRight, borderBottom, bold, color, size, children, onClick } = props;

  const styles = {
    width: width,
    height: height,
    bold: bold,
    color: color,
    size: size,
    margin: margin,
    borderRadius: borderRadius,
    border: border,
    borderLeft: borderLeft,
    borderRight: borderRight,
    borderBottom: borderBottom,
    bg: bg,
  };

  return (
    <P {...styles} onClick={onClick}>
      {children}
    </P>
  )
}

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: false,
}

const P = styled.span`
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${(props) => props.margin};;
  font-family: noto-sans-cjk-kr, sans-serif;
  font-style: normal;
  cursor: pointer;
  border-radius : ${(props) => props.radius};
  border : ${(props) => props.border};
  border-radius : ${(props) => props.borderRadius};
  border-top : ${(props) => props.border};
  border-left : ${(props) => props.borderLeft};
  border-right : ${(props) => props.borderRight};
  border-bottom : ${(props) => props.borderBottom};
  position : ${(props) => props.position};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}

  
  text-align: center;
  vertical-align: middle;

  font-family: Pretendard;
  font-weight: 400;
  font-style: normal;
`

export default Text;