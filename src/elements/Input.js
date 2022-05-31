import React from "react";
import styled from "styled-components";

import { Grid , Text} from "../elements/Index"

const Input = (props) => {
  // 인풋 컴포넌트는 props로 아래의 것들을 받아온다.
  const { label, placeholder, onChange, type, multiLine, border, height, margin, width, bg } = props;

  const styles = {
    width: width,
    border: border,
    height: height,
    margin : margin,
    bg : bg,
  }
  
  if(multiLine){
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          placeholder={placeholder}
          onChange={onChange}
        ></ElTextarea>
      </Grid>
    );
  }
  
  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElInput {...styles} type={type} placeholder={placeholder} onChange={onChange} />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  border : "1px solid #212121",
  height : "100%",
  width : "100%",
  margin : false,
  onChange: () => {},
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  background-color: white;
`;


const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  background-color: ${(props) => props.bg};
  border : ${(props) => props.border};
  height : ${(props) => props.height};
  margin : ${(props) => props.margin};
`;

export default Input;