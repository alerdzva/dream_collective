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
import MainHeader from "../../commons/mainheader/MainHeader";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  margin: auto;
  position: relative;
  width: 90vw;
  padding-bottom: 10vw;
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

var featurePool = [
  { title: "Night Vision", description: "Ability to  record videos in dark" },
  {
    title: "Thermal Cam",
    description:
      "A camera that can capture surface temperatures of objects below",
  },
  {
    title: "Time Travel Cam",
    description:
      "A camera that capture videos of past, present and future incidents",
  },
  { title: "X-Ray", description: "Ability to see through physical objects" },
  { title: "Night Visio 2", description: "Ability to  record videos in dark" },
  {
    title: "Thermal Cam 2",
    description:
      "A camera that can capture surface temperatures of objects below",
  },
  {
    title: "Time Travel Cam 2",
    description:
      "A camera that capture videos of past, present and future incidents",
  },
  { title: "X-Ray 2", description: "Ability to see through physical objects" },
  { title: "Night Visio 3", description: "Ability to  record videos in dark" },
  {
    title: "Thermal Cam 4",
    description:
      "A camera that can capture surface temperatures of objects below",
  },
  {
    title: "Time Travel Cam 5",
    description:
      "A camera that capture videos of past, present and future incidents",
  },
  { title: "X-Ray 6", description: "Ability to see through physical objects" },
  { title: "Night Visio 8", description: "Ability to  record videos in dark" },
  {
    title: "Thermal Cam 8",
    description:
      "A camera that can capture surface temperatures of objects below",
  },
  {
    title: "Time Travel Cam 8",
    description:
      "A camera that capture videos of past, present and future incidents",
  },
  { title: "X-Ray 8", description: "Ability to see through physical objects" },
];

class AddFeaturesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblefeatureIndex: 0,
      visibleFetures: [],
      featureSet: [],
      selectedFetures: [],
      response: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    //fetch features, populate the feature pool, populate featureset
    // fetch("/features/")
    //   .then(response => response.json())
    //   .then(data => {
    //     featurePool = data;
    //     this.setFeatureSet(FEATURE_SET_SIZE);
    //   });

    //fetch the drone data using id
    APICalls.readResponse(this.props.match.params.id, (data) => {
      APICalls.readFeaturesOfTopic(data.topic._id, (data) => {
        featurePool = data;
        this.setFeatureSet(FEATURE_SET_SIZE);
      });
      this.setState({ response: data });
    });
  }

  updateDrone() {
    fetch("/responses/" + this.state.response._id, {
      method: "PUT",
      body: JSON.stringify(this.state.response),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Mode: "CORS",
      },
    }).then((data) => {
      console.log(data);
    });
  }

  render() {
    if (this.state.response == null && this.state.featureSet)
      return <LoadingWidget></LoadingWidget>;
    return (
      <Wrapper>
        <MainHeader
          isSmall={true}
          onClick={() => this.props.history.push("../../")}
        ></MainHeader>
        <Header
          text={
            "Add dream features to " +
            this.state.response.topic.name.toLowerCase()
          }
        ></Header>
        <ContentWrapper>
          <DroneContainer>
            <DreamItem
              featureClickHandler={this.handleFeaureClick.bind(this)}
              editable={true}
              drone={this.state.response}
            ></DreamItem>
          </DroneContainer>
          <FeatureContainer>
            <CreateFeatureContainer>
              <RowHeader>+ Create new</RowHeader>
              <NewFeature
                topicId={this.state.response.topic._id}
                clickHandler={this.handleAddNewFeatureClick.bind(this)}
              />
            </CreateFeatureContainer>
            <FeatureSetContainer>
              <RowHeader>or, select from what others have created</RowHeader>
              <FeatureSet>
                <PaginationButton
                  src={require("./assets/left_arrow_icon.svg")}
                  onClick={() => this.handlePreviousClick()}
                ></PaginationButton>
                {this.state.featureSet
                  .slice(
                    this.state.visiblefeatureIndex,
                    this.state.visiblefeatureIndex + VISIBLE_FEATURES_COUNT
                  )
                  .map(
                    (item, key) => (
                      <Feature
                        name={item.name}
                        description={item.description}
                        featureType={FeatureTypes.selectable}
                        clickHandler={this.handleFeaureClick.bind(this)}
                        index={this.state.visiblefeatureIndex + key}
                      ></Feature>
                    ),
                    this
                  )}
                <PaginationButton
                  src={require("./assets/right_arrow_icon.svg")}
                  onClick={() => this.handleNextClick()}
                ></PaginationButton>
              </FeatureSet>
              <DotWrapper>{this.renderScrollDots()}</DotWrapper>
            </FeatureSetContainer>
          </FeatureContainer>
          <ButtonWrapper>
            <Button
              onClick={() => this.handleNextButtonClick()}
              text={"Next"}
              isDisabled={this.state.response.features.length <= 0}
            ></Button>
          </ButtonWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }

  handleNextButtonClick() {
    const message =
      "It looks like your submission includes some gibberish. Please make sure your answers are readable. If you believe this is a mistake on our part click skip without making any changes.";

    let containsGib = false;
    let feature;
    for (let i = 0; i < this.state.response.features.length; i++) {
      feature = this.state.response.features[i];
      if (isGibberish(feature.name, 2) || isGibberish(feature.description, 3)) {
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
            onClick: () =>
              this.props.history.push(
                "../../prompt/" + this.state.response._id
              ),
          },
          {
            label: "Continue",
            onClick: () => {},
          },
        ],
      });
    } else {
      this.props.history.push("../../prompt/" + this.state.response._id);
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

  handleFeaureClick = (feature) => {
    let drone = this.state.response;
    if (feature.featureType == FeatureTypes.selectable) {
      if (drone.features.length >= 4) {
        this.displayMaxFeaturesAlert();
        return;
      }
      let featureSet = this.state.featureSet;
      drone.features.push(featureSet[feature.index]);
      if (featurePool.length) {
        featureSet[feature.index] = featurePool.pop();
        this.setState({ featureSet: featureSet });
      } else {
        //TODO: refresh pool
      }
    } else {
      drone.features.splice(feature.index, 1); //remove button action
    }
    this.setState({ drone: drone });
    this.updateDrone();
  };

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

  setFeatureSet(length) {
    var featureSet = [];
    for (var item of featurePool) {
      // if(!isGibberish(item.title,4) && !isGibberish(item.description,8)){
      featureSet.push(item);
      if (featureSet.length >= length) {
        break;
      }
      // }
    }
    //featureSet = featurePool.splice(0, length)
    this.setState({ featureSet: featureSet });
  }
}

export default AddFeaturesView;
