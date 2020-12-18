import React, { Component } from "react";
import styled from "styled-components";
import LoadingWidget from "../../LoadingWidget";
import { devices } from "../../../config/devices.js";
import Header from "../../commons/header/Header";
import { theme } from "../../../config/colorTheme";
import Prompt from "../../commons/Prompt";
import TextArea from "../../commons/TextArea";
import Category from "./Category";
import Footer from "../../commons/Footer";
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

const CategoryContainer = styled.div`
  display: flex;
  width: 99%;
  justify-content: space-between;
  margin: auto;
  margin-top: 3vw;
`;

const categories = ["product", "space", "service"];

var APICalls = require("../../../utils/APICalls");

const mainHelp = (
  <Text
    text={
      "Choose from three categories: product, space, or service depending on what you want to re-imagine. If you are not sure which one to select don’t worry! Click on the category you think fits best with your idea. "
    }
  ></Text>
);
const descriptionHelp = (
  <Text
    text={
      "Tell us about why you want to reimagine this. Remember that this will be used to inspire others! "
    }
  ></Text>
);

class CreateTopicView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: -1,
      name: "",
      description: "",
    };
  }

  componentDidMount() {
    document.title = "Dream Collective";
    window.scrollTo(0, 0);
  }

  updateDrone() {
    fetch("/drones/" + this.state.drone._id, {
      method: "PUT",
      body: JSON.stringify(this.state.drone),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Mode: "CORS",
      },
    })
      .then((response) => response.json())
      .then((data) => {});
  }

  render() {
    // if (this.state.drone == null) return <LoadingWidget></LoadingWidget>;

    return (
      <Wrapper>
        <MainHeader
          isSmall={true}
          onClick={() => this.props.history.push("../../")}
        ></MainHeader>

        <Header text={"Create a new topic to reimagine together"}></Header>
        <ContentWrapper>
          <PromptHelpWrapper
            promptText={"What do you want to reimagine?"}
            helpBody={mainHelp}
          ></PromptHelpWrapper>
          <CategoryContainer>
            <Category
              onClickCallback={() => this.setState({ category: 0 })}
              isSelected={this.state.category == 0}
              headerText={"A PRODUCT"}
              bodyText={
                "This could be any item you wish to redesign and enhance such as technologies, household items, office items, food products, toys, etc!"
              }
              imageSrc={require("./assets/product.svg")}
            />
            <Category
              onClickCallback={() => this.setState({ category: 1 })}
              isSelected={this.state.category == 1}
              headerText={"A SPACE"}
              bodyText={
                "Reimagine how spaces are set up and how they function. Envision new layouts, items and features for places such as as gyms, kitchens, or classrooms, or design entirely new spaces!"
              }
              imageSrc={require("./assets/space.svg")}
            />
            <Category
              onClickCallback={() => this.setState({ category: 2 })}
              isSelected={this.state.category == 2}
              headerText={"A SERVICE"}
              bodyText={
                "Reimagine how spaces are set up and how they function. Envision new layouts, items and features for places such as as gyms, kitchens, or classrooms, or design entirely new spaces!"
              }
              imageSrc={require("./assets/service.svg")}
            />
          </CategoryContainer>

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
              <PromptHelpWrapper
                marginTop={"4vw"}
                marginBottom={"1vw"}
                promptText={"Description"}
                helpBody={descriptionHelp}
              ></PromptHelpWrapper>
              <TextArea
                rows={6}
                value={this.state.description}
                onChangeCallback={(ev) =>
                  this.setState({ description: ev.target.value })
                }
              ></TextArea>
            </div>
          )}
        </ContentWrapper>
        {this.state.category > -1 && (
          <Footer
            disableNext={
              this.state.description.length == 0 || this.state.name.length == 0
            }
            onNextCallback={() =>
              APICalls.createNewTopic(this.state, (data) =>
                this.props.history.push("/newTopic/2/" + data._id)
              )
            }
          ></Footer>
        )}
      </Wrapper>
    );
  }

  handleCreateTopicCallback(data) {
    this.props.history.push("/newTopic/2/data._id");
  }
}

export default CreateTopicView;
