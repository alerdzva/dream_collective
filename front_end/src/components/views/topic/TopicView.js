import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../../config/colorTheme";
import TopicCard from "../../commons/projectCard/TopicCard";
import MainHeader from "../../commons/mainheader/MainHeader";
import Text from "../../commons/Text";
import Help from "../../commons/help/Help";
import Prompt from "../../commons/Prompt";
import Button from "../../commons/Button";
import ResponseCard from "./ResponseCard";

const Container = styled.div`
  width: 100vw;
  padding-bottom: 10vw;
`;

const ContentContainer = styled.div`
  margin: auto;
  width: 90vw;
  padding-bottom: 10vw;
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

const ButtonWrapper = styled.div`
  width: 20vw;
  margin-top: 3vw;
  margin-bottom: 8vw;

  float: right;
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
  width: 100%;
  margin: auto;
  margin-bottom: 6vw;
`;

var APICalls = require("../../../utils/APICalls");

export default class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: null,
      responses: null,
    };

    window.addEventListener("scroll", (event) => {
      // if(window.scrollY> window.innerHeight) this.setState({renderHeader:true})
      // else this.setState({renderHeader:false})
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    APICalls.readTopic(this.props.match.params.id, (data) => {
      APICalls.readResponsesOfTopic(data._id, (data) => {
        this.setState({ responses: data });
      });
      this.setState({ topic: data });
    });
  }

  render() {
    if (this.state.topic == null) return null;
    var topic = this.state.topic;
    return (
      <Container>
        <MainHeader
          onClick={() => this.props.history.push("../../")}
        ></MainHeader>
        <ContentContainer>
          <Inline>
            <div>
              <StepTitle>{"Collaborate on the dream " + topic.name}</StepTitle>
              {/* <StepDescription>Click on any project to get started</StepDescription> */}
            </div>
            <StepImage
              src={
                topic.category == 0
                  ? require("./assets/product.svg")
                  : topic.category == 1
                  ? require("./assets/service.svg")
                  : require("./assets/space.svg")
              }
            ></StepImage>
          </Inline>
          <Prompt text={"About this project:"}></Prompt>
          <Text marginTop={"2vw"} border={true} text={topic.description}></Text>
          <ButtonWrapper>
            <Button onClick={() => this.handleStart()} text={"Start"}></Button>
          </ButtonWrapper>

          {this.state.responses && (
            <TopicsContainer>
              <Prompt text={"See what others have created:"}></Prompt>
              {this.state.responses.map((value, key) => {
                return <ResponseCard responseId={value._id}></ResponseCard>;
              })}
            </TopicsContainer>
          )}
        </ContentContainer>
      </Container>
    );
    return null;
  }

  handleStart() {
    APICalls.createNewResponse({ topic: this.state.topic._id }, (data) => {
      this.props.history.push("../../response/" + data._id);
    });
  }
}
