import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../../config/colorTheme";
import TopicCard from "../../commons/projectCard/TopicCard";
import MainHeader from "../../commons/mainheader/MainHeader";

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

export default class AllTopicsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <ContentContainer>
          <MainHeader
            onClick={() => this.props.history.push("../../")}
          ></MainHeader>
          <Inline>
            <div>
              <StepTitle>Collaborate on existing projects</StepTitle>
              <StepDescription>
                Click on any project to get started
              </StepDescription>
            </div>
            <StepImage src={require("./assets/existing.svg")}></StepImage>
          </Inline>
          {this.state.allTopics && (
            <TopicsContainer>
              {this.state.allTopics.map((value, key) => {
                return (
                  <TopicCard
                    onClick={(id) => this.props.history.push("../topic/" + id)}
                    topic={value}
                  ></TopicCard>
                );
              })}
            </TopicsContainer>
          )}
        </ContentContainer>
      </Container>
    );
    return null;
  }
  ls;
}
