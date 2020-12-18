import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../commons/Button";
import { theme } from "../../config/colorTheme";
import { animationKeyFrames } from "../../config/keyframes";
import TopicCard from "../commons/projectCard/TopicCard";
import MainHeader from "../commons/mainheader/MainHeader";
import Prompt from "../commons/Prompt";
import Text from "../commons/Text";

const Container = styled.div`
  width: 100vw;
  padding-bottom: 10vw;
`;

const ContentContainer = styled.div`
  animation: ${animationKeyFrames.fadeIn} 2s;
  margin: auto;
  width: 90vw;
`;

const Description = styled.div`
  margin-top: 8vw;
  width: 70vw;
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
  margin: auto;
  width: 90vw;
`;

const StepImage = styled.img`
  width: 30vw;
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
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: 300;
  font-size: 1.3vw;
  line-height: 2.3vw;
  letter-spacing: 0.03em;
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

var APICalls = require("../../utils/APICalls");

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: false,
      renderHeader: false,
      allTopics: null,
    };

    window.addEventListener("scroll", (event) => {
      // if(window.scrollY> window.innerHeight) this.setState({renderHeader:true})
      // else this.setState({renderHeader:false})
    });
  }

  componentDidMount() {
    APICalls.readAllTopics((data) => {
      this.setState({ allTopics: data });
    });
  }

  render() {
    return (
      <Container>
        <MainHeader
          onMyProjectsClick={() => this.props.history.push("/myTopics")}
        ></MainHeader>
        <ContentContainer>
          <Description>
            Welcome to the Dream Collective!<br></br> A place where you can
            reimagine products, spaces, and services!
          </Description>
          <Step>
            <StepTextContainer>
              {/* <StepCount>Step 1</StepCount> */}
              <StepTitle>Collaborate on existing projects!</StepTitle>
              {/* <StepDescription>
              Create a fictional drone that you would like to see in the future by giving it imaginery features - we call them "superpowers." Assume anything is possible and feasible in the real world. Let your imagination flow!
              </StepDescription> */}
            </StepTextContainer>
            <StepImage src={require("./assets/collaborate.svg")}></StepImage>
          </Step>

          <Step>
            <StepImage src={require("./assets/new.svg")}></StepImage>
            <StepTextContainer>
              {/* <StepCount>Step 2</StepCount> */}
              <StepTitle>
                Create new projects and inspire others to collaborate with you!
              </StepTitle>
              {/* <StepDescription>
              Imagine a future scenario involving your dream drone. Write it as a little story.
              </StepDescription> */}
            </StepTextContainer>
          </Step>

          <Inline>
            <StepTitle>Collaborate on existing projects</StepTitle>
            <ViewAll onClick={() => this.props.history.push("/allTopics")}>
              View All
            </ViewAll>
          </Inline>

          {this.state.allTopics && (
            <TopicsContainer>
              {this.state.allTopics.map((value, key) => {
                if (key > 3) return null;
                return (
                  <TopicCard
                    onClick={(id) => this.props.history.push("../topic/" + id)}
                    topic={value}
                  ></TopicCard>
                );
              })}
            </TopicsContainer>
          )}

          <Inline>
            <StepTitle>Create a new project </StepTitle>
            <ButtonContainer>
              <Button
                onClick={() => this.props.history.push("/newTopic/1")}
                text={"+ New Project"}
              ></Button>
            </ButtonContainer>
          </Inline>

          <Prompt
            marginTop={"10vw"}
            marginBottom={"1vw"}
            text="About The Dream Collective:"
          ></Prompt>
          <Text
            border={true}
            text="The Dream Collective is a place where we can envision the future together.  
            Through collaboration, imagination, and innovation we can shape products, 
            spaces, and services of the future through our desires and aspirations. "
          ></Text>

          <Prompt
            marginTop={"5vw"}
            marginBottom={"1vw"}
            text="Who we are:"
          ></Prompt>
          <Text
            border={true}
            text="We are researchers from the Social and Digital Systems Group at Arizona State University, 
            interested in learning how crowd-generated fictions can shape our future. 
            To learn more about us and our work visit sandsystem.org . 
            This is a research project at Arizona State University."
            link={
              <a
                href="https://docs.google.com/document/d/1QldxgUnDQSGbrxe9MwJipY5MxVQzeVvjETKQWQlXeM0/edit?usp=sharing"
                target="_blank"
              >
                By adding content to our website you consent to our IRB.
              </a>
            }
          ></Text>
        </ContentContainer>
      </Container>
    );
    return null;
  }
}
