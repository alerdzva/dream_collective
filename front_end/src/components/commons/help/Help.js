import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../config/colorTheme";
import { animationKeyFrames } from "../../../config/keyframes";

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0vw;
  width: ${(props) => (props.expand ? "35vw" : "3.3vw")};
  max-height: 20vw;
  overflow: scroll;
  background-color: #fff6f8;
  transition: width 0.5s;
  border-radius: ${(props) => (props.expand ? "0vw" : "3.3vw")};
  border: 1px solid
    ${(props) => (props.expand ? theme.SecondaryAccentColor : theme.white)};
  z-index: 200;
`;

const BodyWrapper = styled.div`
  margin: 2vw;
  animation: ${animationKeyFrames.fadeIn} 3s;
`;

const Icon = styled.img`
  float: right;
  width: 3.3vw;
  height: 3.3vw;
  cursor: pointer;
  // animation: ${animationKeyFrames.heartBeat} 2.5s linear infinite alternate;
`;

const Body = styled.div`
  animation: ${animationKeyFrames.fadeIn} 1s;
`;

export default function Help(props) {
  const [expand, setExpand] = useState(0);
  return (
    <Container expand={expand}>
      <Icon
        onClick={() => {
          setExpand(!expand);
        }}
        src={
          expand
            ? require("./assets/remove_icon.svg")
            : props.iconSrc
            ? props.iconSrc
            : require("./assets/help_icon.svg")
        }
      ></Icon>
      {expand ? (
        <BodyWrapper>
          <Body>{expand ? props.body : null}</Body>
        </BodyWrapper>
      ) : null}
    </Container>
  );
}
