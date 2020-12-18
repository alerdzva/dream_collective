import React, { Component } from "react";
import styled, { ThemeConsumer } from "styled-components";
import LoadingWidget from "../../LoadingWidget";
import { devices } from "../../../config/devices.js";
import Header from "../../commons/header/Header";
import { theme } from "../../../config/colorTheme";
import Prompt from "../../commons/Prompt";
import TextArea from "../../commons/TextArea";
import Category from "./Category";
import Footer from "../../commons/Footer";
import NewFeature from "./NewFeature";
import ActivityPreview from "./ActivityPreview";
import PromptHelpWrapper from "../../commons/PromptHelpWrapper";
import Text from "../../commons/Text";
import MainHeader from "../../commons/mainheader/MainHeader";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  margin: 5vw auto;
  position: relative;
  width: 90vw;

  @media ${devices.mobile} {
    flex-direction: column;
    height: auto;
  }
`;

const FeatureContainer = styled.div`
  margin: auto;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 3vw;
`;

const PreviewWrapper = styled.div`
  width: 100%;
  padding: 4vw;
  margin: 1vw auto;
  border: 4px solid ${theme.accentColor20};
`;

const categories = ["product", "space", "service"];

var APICalls = require("../../../utils/APICalls");

const mainHelp = (
  <Text
    text={
      "Creat reimagined features such as new capabilities or characteristics for your project. For example if you are reimagining an object you could give it a “Voice” being able to communicate with you."
    }
  ></Text>
);

class SetupDreamActivityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: null,
      features: [
        {
          name: "",
          description: "",
        },
        {
          name: "",
          description: "",
        },
        {
          name: "",
          description: "",
        },
      ],
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    APICalls.readTopic(this.props.match.params.id, (data) =>
      this.setState({ topic: data })
    );
  }

  render() {
    if (this.state.topic == null) return <LoadingWidget></LoadingWidget>;
    return (
      <Wrapper>
        <MainHeader
          isSmall={true}
          onClick={() => this.props.history.push("../../")}
        ></MainHeader>
        <Header
          text={"Set up your " + this.state.topic.name + " project"}
        ></Header>
        <ContentWrapper>
          <PromptHelpWrapper
            promptText={
              "How would you reimagine this " +
              categories[this.state.topic.category] +
              "? Create 3 dream features for your " +
              this.state.topic.name +
              " to inspire others"
            }
            helpBody={mainHelp}
          ></PromptHelpWrapper>
          <FeatureContainer>
            {this.state.features.map((value, index) => (
              <NewFeature
                feature={value}
                index={index}
                onNameChange={(i, name) =>
                  this.handleFeatureNameChange(i, name)
                }
                onDescriptionChange={(i, description) =>
                  this.handleFeatureDescriptionChange(i, description)
                }
                topicId={this.state.topic_id}
                clickHandler={(data) => {}}
              ></NewFeature>
            ))}
          </FeatureContainer>

          {this.state.category > -1 && (
            <div>
              <Prompt
                marginTop={"4vw"}
                marginBottom={"1vw"}
                text={
                  "Give your dream " +
                  categories[this.state.category] +
                  " a name:"
                }
              ></Prompt>
              <TextArea
                value={"Dream " + this.state.name}
                onChangeCallback={(ev) =>
                  this.setState({ name: ev.target.value.substring(6) })
                }
              ></TextArea>

              <Prompt
                marginTop={"4vw"}
                marginBottom={"1vw"}
                text={"Description"}
              ></Prompt>
              <TextArea
                rows={6}
                value={this.state.description}
                onChangeCallback={(ev) =>
                  this.setState({ description: ev.target.value })
                }
              ></TextArea>
            </div>
          )}
          <Prompt
            isSmall={true}
            marginTop={"3vw"}
            marginBottom={"1vw"}
            text={
              "A preview of your dream " +
              this.state.topic.name +
              " activity. This is how others will be able to contribute to your project"
            }
          ></Prompt>
          <PreviewWrapper>
            <ActivityPreview
              topic={this.state.topic}
              features={this.state.features}
            ></ActivityPreview>
          </PreviewWrapper>
        </ContentWrapper>
        {this.state.features[0].name &&
          this.state.features[1].name &&
          this.state.features[2].name && (
            <Footer onNextCallback={() => this.handleNext()}></Footer>
          )}
      </Wrapper>
    );
  }

  handleCreateTopicCallback(data) {
    this.props.history.push("/newTopic/2/data._id");
  }

  handleNext() {
    this.state.features.map((value, index) => {
      if (value.name && value.description) {
        APICalls.createNewFeature(
          {
            topic: this.state.topic._id,
            name: value.name,
            description: value.description,
          },
          (data) => console.log(data)
        );
      }
    });
    this.props.history.push("/newTopic/3/" + this.state.topic._id);
  }

  handleFeatureNameChange(i, name) {
    var features = this.state.features;
    features[i].name = name;
    this.setState({ features: features });
  }

  handleFeatureDescriptionChange(i, description) {
    var features = this.state.features;
    features[i].description = description;
    this.setState({ features: features });
  }
}

export default SetupDreamActivityView;
