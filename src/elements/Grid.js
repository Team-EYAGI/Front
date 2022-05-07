import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { position, border, borderRadius, borderLeft, borderRight, borderBottom, column, is_flex, width, margin, padding, bg, children, min, radius, is_center, is_left, is_right } = props;

  const styles = {
      is_flex: is_flex,
      is_left: is_left,
      is_right: is_right,
      is_center: is_center,
      width: width,
      margin: margin,
      padding: padding,
      bg: bg,
      min: min,
      radius: radius,
      column: column,
      borderRadius: borderRadius,
      border: border,
      borderLeft: borderLeft,
      borderRight: borderRight,
      borderBottom: borderBottom,
      position: position,
  };
  return (
    <React.Fragment>
      <GridSt {...styles}>{children}</GridSt>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  is_center: false,
  is_left: false,
  is_right: false,
  column: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  min : "100px",
  radius : "0px",
  border : "none",
  position : false,
};

const GridSt = styled.div`
  width: ${(props) => props.width};
  border-radius : ${(props) => props.radius};
  border : ${(props) => props.border};
  border-radius : ${(props) => props.borderRadius};
  border-top : ${(props) => props.border};
  border-left : ${(props) => props.borderLeft};
  border-right : ${(props) => props.borderRight};
  border-bottom : ${(props) => props.borderBottom};
  position : ${(props) => props.position};
  ${(props) => (props.min ? `min-width: ${props.min};` : "")}
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
  ${(props) =>
    props.is_center
      ? `display: flex; align-items: center; justify-content: center; `
      : ""}
  ${(props) =>
    props.is_left
      ? `display: flex; align-items: center; justify-content: left; `
      : ""}
  ${(props) =>
    props.is_right
      ? `display: flex; align-items: center; justify-content: right; `
      : ""}
      ${(props) =>
    props.column
      ? `display: flex; flex-direction: column; `
      : ""}
`;

export default Grid;