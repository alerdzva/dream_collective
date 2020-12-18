import React from "react";
import styled from "styled-components";
import { theme } from "../../config/colorTheme";

const Container = styled.div`
  font-size: ${(props) => (props.small ? "1.5vw" : "2vw")};
  font-family: "Roboto", serif;
  font-weight: 700;
  color: ${theme.white};
  background-color: ${(props) =>
    props.isDisabled ? theme.mediumGray : theme.secondaryColor};
  width: auto;
  min-width: 15vw;
  margin: 0.2vw;
  padding: 0.5vw ${(props) => (props.small ? "0.4vw" : "1.5vw")};
  text-align: center;
  transition: transform 0.5s;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

export default function Button(props) {
  return (
    <Container
      onClick={() => !props.isDisabled && props.onClick()}
      small={props.small}
      isDisabled={props.isDisabled}
    >
      {props.text}
    </Container>
  );
}
