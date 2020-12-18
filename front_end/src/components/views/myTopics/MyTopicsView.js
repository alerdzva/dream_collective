import React, { Component, useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../../config/colorTheme";
import TopicCard from "../../commons/projectCard/TopicCard";
import MainHeader from "../../commons/mainheader/MainHeader";
import { AuthContext } from "../../../auth/AuthContext";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";

const Container = styled.div`
  width: 100vw;
  padding-bottom: 10vw;
`;

const ContentContainer = styled.div`
  margin: auto;
`;

const Description = styled.div`
  width: 70vw;
  margin: 8vw;
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 3.8vw;
  line-height: 5vw;
  text-align: left;
  color: ${theme.black};
`;

const Step = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15vw auto;
  width: 90vw;
`;

const Inline = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 5vw auto;
  width: 90vw;
`;

const StepImage = styled.img`
  width: 40vw;
  height: auto;
  margin: auto;
`;

const StepTextContainer = styled.div`
  width: 40vw;
  text-align: left;
`;

const StepCount = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 1.8vw;
  line-height: 2vw;
  letter-spacing: 0.03em;
  padding-bottom: 1vw;
  color: ${theme.black};
`;

const StepTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 3vw;
  line-height: 4.2vw;
  padding-bottom: 1vw;
  color: ${theme.black};
`;

const StepDescription = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  font-size: 2vw;
  line-height: 2.3vw;
  letter-spacing: 0.01em;
  color: ${theme.black};
`;

const ViewAll = styled.div`
  font-family: Roboto;
  font-weight: 900;
  font-size: 1.8vw;
  letter-spacing: 0.03em;
  text-align: right;
  color: ${theme.accentColor};
  transition: transform 0.5s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonContainer = styled.div`
  width: 20vw;
`;

const TopicsContainer = styled.div`
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
  margin: auto;
  justify-content: space-evenly;
  width: 80%;
  margin: auto;
  margin-bottom: 6vw;
`;

var APICalls = require("../../../utils/APICalls");

export default function MyTopicsView(props) {
  const [allTopics, setallTopics] = useState(null);
  const [cognitoUserName, setcognitoUserName] = useState(null);
  useEffect(() => {
    APICalls.readAllTopics((data) => {
      setallTopics(data);
    });
  }, []);

  const handleAuthChange = (nextAuthState, user) => {
    user && user.username && setcognitoUserName(user.username);
  };

  return (
    <Container>
      <ContentContainer>
        <MainHeader onClick={() => props.history.push("../../")}></MainHeader>
        <AmplifyAuthenticator
          handleAuthStateChange={(nextAuthState, user) =>
            handleAuthChange(nextAuthState, user)
          }
        >
          <Inline>
            <div>
              <StepTitle>Projects created by you</StepTitle>
              <StepDescription>
                Click on any project to see responses
              </StepDescription>
            </div>
            <StepImage src={require("./assets/existing.svg")}></StepImage>
          </Inline>
          {allTopics && cognitoUserName && (
            <TopicsContainer>
              {allTopics.map((value, key) => {
                return (
                  value.createdBy &&
                  value.createdBy.cognito_username === cognitoUserName && (
                    <TopicCard
                      onClick={(id) => props.history.push("../topic/" + id)}
                      topic={value}
                    ></TopicCard>
                  )
                );
              })}
            </TopicsContainer>
          )}
        </AmplifyAuthenticator>
      </ContentContainer>
    </Container>
  );
}
