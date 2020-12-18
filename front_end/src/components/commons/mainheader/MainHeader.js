import React, { useContext, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../config/colorTheme";
import { AuthContext } from "../../../auth/AuthContext";
import Button from "../Button";
import { Auth } from "aws-amplify";
import AuthForm from "../auth/AuthForm";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const Tagline = styled.p`
  font-size: 2vw;
  padding: 0.5vw 0;
  font-family: "Roboto", serif;
  font-weight: 700;
  color: ${theme.black};
  margin: auto;
  text-align: center;
`;

const LogoContainer = styled.div`
  width: ${(props) => (props.isSmall ? "21vw" : "40vw")};
  margin-bottom: 5vw;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.04);
  }
`;
const Line = styled.div`
  margin-top: ${(props) => (props.isSmall ? "1.8vw" : "3.2vw")};
`;

const Text = styled.p`
  font-size: ${(props) => (props.isSmall ? "1.8vw" : "3.2vw")};
  padding: 0.1vw 0.6vw;

  font-family: "Roboto", serif;
  font-weight: 700;
  color: ${theme.black};
  margin: 0;
  text-align: left;
  display: inline-block;
  background-color: ${(props) =>
    props.highlight ? theme.secondaryColor : "none"};
`;

const ButtonContainer = styled.div`
  width: 32vw;
  height: 3.5vw;
  display: flex;
  justify-content: flex-end;
  margin: 3vw;
`;

export default function MainHeader(props) {
  const { cognitoUser, setCognitoUser } = useContext(AuthContext);
  const [showAuthForm, setshowAuthForm] = useState(false);

  return (
    <Container>
      <LogoContainer
        onClick={() => (props.onClick ? props.onClick() : null)}
        isSmall={props.isSmall}
      >
        <Line isSmall={props.isSmall}>
          <Text isSmall={props.isSmall}>The</Text>
          <Text isSmall={props.isSmall} highlight={true}>
            Dream
          </Text>
          <Text isSmall={props.isSmall}>Collective</Text>
        </Line>
        {!props.isSmall && <Tagline>Reimagine the Future</Tagline>}
      </LogoContainer>
      <ButtonContainer>
        {cognitoUser && props.onMyProjectsClick && (
          <Button
            text={"My Projects"}
            onClick={() => {
              props.onMyProjectsClick();
            }}
          ></Button>
        )}
        {!cognitoUser && (
          <Button
            text={"Sign In"}
            onClick={() => {
              setshowAuthForm(true);
            }}
          ></Button>
        )}
        {cognitoUser && (
          <Button
            text={"Sign Out"}
            onClick={() => {
              Auth.signOut().then((data) => setCognitoUser(null));
            }}
          ></Button>
        )}
      </ButtonContainer>
      {showAuthForm && (
        <AuthForm
          onUserAvailable={(user) => {
            setshowAuthForm(false);
            window.location.reload();
          }}
        ></AuthForm>
      )}
    </Container>
  );
}
