import React, { Component } from "react";
import styled from "styled-components";
import Feature, { FeatureType as FeatureTypes } from "../../feature/Feature";
import NewFeature from "../../feature/NewFeature";
import DreamItem from "../../dreamItem/DreamItem";
import LoadingWidget from "../../LoadingWidget";
import { isGibberish } from "../../../utils/GibberishFilter";
import { devices } from "../../../config/devices.js";
import Header from "../../commons/header/Header";
import Button from "../../commons/Button";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { theme } from "../../../config/colorTheme";
import Prompt from "../../commons/Prompt";
import TextArea from "../../commons/TextArea";
import MainHeader from "../../commons/mainheader/MainHeader";
import UserInfoForm from "../../userinfo/UserInfoForm";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 10vw;
`;

const ContentWrapper = styled.div`
  margin: auto;
  position: relative;
  width: 90vw;
  padding-bottom: 5vw;
`;

const DroneContainer = styled.div`
  position: relative;
  margin: auto;
  height: 60vh;
  overflow: visible;
`;

const FeatureContainer = styled.div`
  height: 38vh;
  display: flex;
`;

const CreateFeatureContainer = styled.div`
  width: 30vw;
  /* background-color:${theme.secondaryColor20} */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const FeatureSetContainer = styled.div`
  width: 70vw;
  /* background-color:${theme.primaryColor20}; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const RowHeader = styled.h3`
  font-size: 1.2vw;
  font-family: "Roboto";
  font-weight: 700;
  text-transform: uppercase;
  color: ${theme.black};
  text-align: left;

  @media ${devices.mobile} {
    padding-top: 4vw;
    font-size: 5vw;
  }
`;

const PaginationButton = styled.img`
  width: 2vw;
  height: 2vw;
  cursor: pointer;
  transition: transform 0.3s;
  outline: none;
  margin: auto 0.2vw;
  &:hover {
    transform: scale(1.1);
  }

  @media ${devices.mobile} {
    width: 8vw;
    height: 8vw;
    max-height: 8vw;
    font-size: 5vw;
  }
`;

const FeatureSet = styled.div`
  display: flex;
  justify-content: space-around;
  @media ${devices.mobile} {
    margin: auto;
    width: 90vw;
  }
`;

const DotWrapper = styled.div`
  width: 10vw;
  height: 1.8vh;
  margin: auto;
  display: flex;
  justify-content: space-around;

  @media ${devices.mobile} {
    width: 20vw;
    height: 3vw;
  }
`;

const Dot = styled.div`
  width: 1.5vh;
  height: 1.5vh;
  background-color: ${(props) =>
    props.selected ? theme.secondaryColor : theme.lightGray};
  border-radius: 5vw;

  @media ${devices.mobile} {
    width: 2vw;
    height: 2vw;
    margin: 4vw auto;
  }
`;

const ButtonWrapper = styled.div`
  width: 20vw;
  margin-top: 4vw;

  float: right;
`;

var APICalls = require("../../../utils/APICalls");

const VISIBLE_FEATURES_COUNT = 3;
const FEATURE_SET_SIZE = 12;

class AddResponsesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompts: [],
      inputs: [],
      response: null,
      showDialog: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    //fetch the response data using id
    APICalls.readResponse(this.props.match.params.id, (data) => {
      APICalls.readPromptsOfTopic(data.topic._id, (data) => {
        var inputs = [];
        data.map((value, index) => {
          inputs.push({ prompt: value._id, text: value.startingLine + "..." });
        });
        this.setState({ inputs: inputs, prompts: data });
      });
      this.setState({ response: data });
    });
  }

  updateResponse() {
    var body = this.state.response;
    body.inputs = this.state.inputs;
    body.isPublished = true;
    fetch("/responses/" + this.state.response._id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Mode: "CORS",
      },
    }).then((data) => {
      console.log(data);
      alert("Response Submitted. Thanks for your creativity!");
      this.setState({ showDialog: true });
      window.scrollTo(0, 0);
      // this.props.history.push("../../topic/" + this.state.response.topic._id);
    });
  }

  render() {
    if (this.state.response == null) return <LoadingWidget></LoadingWidget>;
    return (
      <Wrapper>
        {this.state.showDialog && (
          <UserInfoForm
            onClose={() => {
              this.setState({ showDialog: false });
              this.props.history.push(
                "../../topic/" + this.state.response.topic._id
              );
            }}
          ></UserInfoForm>
        )}
        <MainHeader
          isSmall={true}
          onClick={() => this.props.history.push("../../")}
        ></MainHeader>

        <Header
          text={
            "Tell us more about your dream " +
            this.state.response.topic.name.toLowerCase()
          }
        ></Header>
        <ContentWrapper>
          <DroneContainer>
            <DreamItem editable={false} drone={this.state.response}></DreamItem>
          </DroneContainer>
          {this.state.prompts.map((value, index) => (
            <div>
              <Prompt
                text={value.text}
                marginTop={"3vw"}
                marginBottom={"1vw"}
              ></Prompt>
              <TextArea
                value={this.state.inputs[index].text}
                rows={8}
                placeholder={value.startingLine}
                onChangeCallback={(ev) => {
                  var inputs = this.state.inputs;
                  inputs[index].text = ev.target.value;
                  this.setState({ inputs: inputs });
                }}
              ></TextArea>
            </div>
          ))}

          <ButtonWrapper>
            <Button
              isDisabled={!this.isCompleted()}
              onClick={() => this.handleSubmitClick()}
              text={"Submit"}
            ></Button>
          </ButtonWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }

  isCompleted() {
    let input;
    for (let i = 0; i < this.state.inputs.length; i++) {
      input = this.state.inputs[i].text;
      if (this.state.prompts[i].startingLine.length + 5 < input.length) {
        return true;
      }
    }
    return false;
  }

  handleSubmitClick() {
    const message =
      "It looks like your submission includes some gibberish. Please make sure your answers are readable. If you believe this is a mistake on our part click skip without making any changes.";

    let containsGib = false;
    let input;
    for (let i = 0; i < this.state.inputs.length; i++) {
      input = this.state.inputs[i].text;
      if (this.state.prompts[i].startingLine) {
        input = input.substring(this.state.prompts[i].startingLine.length);
      }
      if (input.length > 4 && isGibberish(input, 5)) {
        containsGib = true;
        break;
      }
    }
    if (containsGib) {
      confirmAlert({
        title: "We detected some gibberish!",
        message: message,
        buttons: [
          {
            label: "Skip",
            onClick: () => this.updateResponse(),
          },
          {
            label: "Continue",
            onClick: () => {},
          },
        ],
      });
    } else {
      this.updateResponse();
    }
  }

  renderButton() {
    if (this.state.drone.features.length > 0) {
      return (
        <Button
          onClick={() => {
            this.props.history.push("../story/" + this.state.drone._id);
          }}
        >
          Next
        </Button>
      );
    }
    return null;
  }

  renderScrollDots() {
    let dots = [];
    let selected = false;
    let index = this.state.visiblefeatureIndex;

    const size = Math.min(this.state.featureSet.length, FEATURE_SET_SIZE);

    for (let i = 0; i < size / VISIBLE_FEATURES_COUNT; i++) {
      selected = i == index / VISIBLE_FEATURES_COUNT;
      dots.push(<Dot selected={selected}></Dot>);
    }
    return dots;
  }

  handleAddNewFeatureClick = (feature) => {
    let drone = this.state.response;
    if (drone.features.length >= 4) {
      this.displayMaxFeaturesAlert();
      return;
    }
    drone.features.push(feature);
    this.setState({ response: drone });
    this.updateDrone();
  };

  displayMaxFeaturesAlert() {
    alert(
      "Your dream " +
        this.state.response.topic.name +
        " can have a maximum of 4 superpowers."
    );
  }

  handleNextClick() {
    let index = this.state.visiblefeatureIndex;
    if (
      index != null &&
      index + VISIBLE_FEATURES_COUNT < this.state.featureSet.length
    ) {
      this.setState({ visiblefeatureIndex: index + VISIBLE_FEATURES_COUNT });
    }
  }

  handlePreviousClick() {
    let index = this.state.visiblefeatureIndex;
    if (index != null && index - VISIBLE_FEATURES_COUNT >= 0) {
      this.setState({ visiblefeatureIndex: index - VISIBLE_FEATURES_COUNT });
    }
  }
}

export default AddResponsesView;
