import React from "react";
import styled from "styled-components";
import { theme } from "../../config/colorTheme";

const Para = styled.p`
  font-size: ${(props) => (props.isSmall ? "1vw" : "1.5vw")};
  font-family: "Roboto", serif;
  font-weight: ${(props) => (props.isSmall ? "300" : "400")};
  line-height: 2vw;
  color: ${(props) => (props.isDisabled ? theme.darkGray : theme.black)};
  width: 100%;
  margin: 0;
  text-align: left;
  padding: ${(props) => (props.border ? "2vw" : "none")};
`;

const Box = styled.div`
  border: ${(props) =>
    props.border ? "2px solid " + theme.secondaryColor : "none"};
  padding: ${(props) => (props.border ? "2vw" : "none")};
  text-align: left;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0")};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : "0")};

  & > a {
    font-weight: 800;
    color: ${theme.accentColor};
  }
`;
export default function Text(props) {
  return (
    <Box
      border={props.border}
      marginBottom={props.marginBottom}
      marginTop={props.marginTop}
    >
      <Para isDisabled={props.isDisabled} isSmall={props.isSmall}>
        {props.text}
      </Para>
      {props.link}
    </Box>
  );
}
