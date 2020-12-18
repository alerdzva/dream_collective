import React, { useContext } from "react";
import styled from "styled-components";
import { theme } from "../../../config/colorTheme";
import Help from "../help/Help";
import MainHeader from "../mainheader/MainHeader";
import Amplify, { Auth } from "aws-amplify";

const Container = styled.div`
  width: 90vw;
  margin: auto;
  padding: 0.8vw 0 1vw 0;
  background-color: ${theme.white};
  border-bottom: 2px solid ${theme.secondaryColor};
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 1vw;
`;

const TextContainer = styled.div`
  width: 100%;
  margin: none;
`;

const ButtonContainer = styled.div`
  width: 5%;
  display: flex;
  justify-content: flex-end;
  padding-right: 2vw;
  position: relative;
`;

const TextWrapper = styled.div`
  text-align: left;
`;

const Text = styled.p`
  font-size: 2.2vw;
  font-family: "Roboto", serif;
  font-weight: 900;
  color: ${theme.black};
  margin: 0;
  text-align: left;
  display: inline-block;
`;

const Button = styled.img`
  width: 3.8vw;
  height: 3.8vw;
  margin: 0.8vw 0.8vw;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.08);
  }
`;

export default function Header(props) {
  return (
    <Container>
      <Content>
        <TextContainer>
          <TextWrapper>
            <Text>{props.text}</Text>
          </TextWrapper>
        </TextContainer>
        <ButtonContainer>
          {props.helpBody && <Help body={props.helpBody}></Help>}
        </ButtonContainer>
      </Content>
    </Container>
  );
}
