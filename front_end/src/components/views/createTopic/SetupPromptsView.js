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
import NewFeature from "../../feature/NewFeature";
import NewPrompt from "./NewPrompt";
import Text from "../../commons/Text";
import MainHeader from "../../commons/mainheader/MainHeader";
import userInfoForm from "../../userinfo/UserInfoForm";
import UserInfoForm from "../../userinfo/UserInfoForm";
import AuthForm from "../../commons/auth/AuthForm";
import Button from "../../commons/Button";

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
  width: 70%;
  justify-content: space-between;
  margin-top: 3vw;
`;

const AddNewPrompt = styled.div`
  width: 70%;
  margin: 3vw 0;
  font-size: ${(props) => (props.isSmall ? "1.2vw" : "2vw")};
  font-family: "Roboto", serif;
  font-weight: ${(props) => (props.isSmall ? "300" : "700")};
  color: ${(props) => (props.isDisabled ? theme.darkGray : theme.black)};
  width: 100%;
  text-align: left;
  background-color: ${theme.lightGray};
  padding: 3vw 2vw;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 10vw;
  width: 50vw;
  margin: auto;
  justify-content: space-between;
`;

const categories = ["product", "space", "service"];
var APICalls = require("../../../utils/APICalls");

class SetupPromptsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: null,
      prompts: [
        {
          text: "",
          startingLine: "",
          showDialog: false,
          showAuth: false,
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
    const mainHelp = (
      <Text
        text={
          "Encourage participants to tell you a story on how they see this dream " +
          this.state.topic.name +
          " being used. What do you want them to tell you about their creations? Is it to be used by a specific person or group of people and in what context? What does " +
          this.state.topic.name +
          "enable them to do?"
        }
      ></Text>
    );

    return (
      <Wrapper>
        {this.state.showDialog && (
          <UserInfoForm
            user={this.state.topic.createdBy}
            onClose={() => {
              this.handlePublish();
              this.setState({ showDialog: false });
            }}
          ></UserInfoForm>
        )}

        {this.state.showAuth && (
          <AuthForm
            onUserAvailable={(userData) => {
              this.handleUserData(userData);
            }}
          ></AuthForm>
        )}
        <MainHeader
          isSmall={true}
          onClick={() => this.props.history.push("../../")}
        ></MainHeader>

        <Header
          text={
            "Create prompts for people to tell you about their dream " +
            this.state.topic.name
          }
          helpBody={mainHelp}
        ></Header>
        <ContentWrapper>
          {this.state.prompts.map((item, key) => (
            <NewPrompt
              index={key}
              topicName={this.state.topic.name}
              promptText={item.text}
              startingLine={item.startingLine}
              onPromptChange={(i, prompt) => this.handlePromptChange(i, prompt)}
            ></NewPrompt>
          ))}
          <AddNewPrompt onClick={() => this.addNewPrompt()}>
            {" "}
            + Add another prompt
          </AddNewPrompt>
        </ContentWrapper>
        {this.state.prompts[0].text.length > 5 && (
          <ButtonContainer>
            <Button
              text={"Publish as a guest"}
              onClick={() => this.createUser()}
            ></Button>
            <Button
              text={"Sign-in and Publish"}
              onClick={() => this.setState({ showAuth: true })}
            ></Button>
          </ButtonContainer>
        )}
      </Wrapper>
    );
  }

  handlePublish() {
    this.state.prompts.map((value, index) => {
      APICalls.createNewPrompt(
        {
          topic: this.state.topic._id,
          text: value.text,
          startingLine: value.startingLine,
        },
        (data) => console.log(data)
      );
    });

    var topic = this.state.topic;
    topic.isPublished = true;
    APICalls.updateTopic(topic._id, topic, (data) => {
      alert("Project published!");
      window.scrollTo(0, 0);
      this.props.history.push("/topic/" + this.state.topic._id);
      window.location.reload();
    });
  }

  addNewPrompt() {
    var prompts = this.state.prompts;
    prompts.push({ text: "", startingLine: "" });
    this.setState({ prompts: prompts });
  }

  handlePromptChange(i, prompt) {
    var prompts = this.state.prompts;
    prompts[i] = prompt;
    this.setState(prompts);
  }

  createUser() {
    APICalls.createNewUser({}, (userData) => this.handleUserData(userData));
  }

  handleUserData(userData) {
    alert("Project egegegegergererpublished!");
    var topic = this.state.topic;
    if (topic != null) {
      topic.createdBy = userData;
      var showDialog = !userData.ageRange;
      this.setState({ topic: topic, showAuth: false, showDialog: showDialog });
      if (!showDialog) {
        console.log("dfdfdfdfd");
        this.handlePublish();
      }
    }
  }
}

export default SetupPromptsView;
