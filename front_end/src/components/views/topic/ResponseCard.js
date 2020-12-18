import React, { Component } from "react";
import styled from "styled-components";
import Feature, { FeatureType as FeatureTypes } from "../../feature/Feature";
import NewFeature from "../../feature/NewFeature";
import DreamItem from "../../dreamItem/DreamItem";
import LoadingWidget from "../../LoadingWidget";
import { theme } from "../../../config/colorTheme";

const ContentWrapper = styled.div`
  margin: 5vw auto;
  position: relative;
  width: 90vw;
  padding-bottom: 5vw;
  background-color: ${theme.lightGray};
`;

const DroneContainer = styled.div`
  position: relative;
  margin: auto;
  height: 60vh;
  overflow: visible;
`;

const ResponseText = styled.p`
  font-size: 1.3vw;
  font-family: "Roboto Slab", serif;
  font-weight: 300;
  color: ${theme.black};
  width: 50%;
  margin: 2vw auto;
  text-align: left;
  line-height: 1.6vw;
`;

var APICalls = require("../../../utils/APICalls");

class ResponseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
    };
  }

  componentDidMount() {
    //fetch the response data using id
    APICalls.readResponse(this.props.responseId, (data) => {
      this.setState({ response: data });
    });
  }

  updateResponse() {
    var body = this.state.response;
    body.inputs = this.state.inputs;
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
      this.props.history.push("../../topic/" + this.state.response.topic._id);
    });
  }

  render() {
    if (this.state.response == null) return <LoadingWidget></LoadingWidget>;
    if (!this.state.response.isPublished) return null;
    return (
      <ContentWrapper>
        <DroneContainer>
          <DreamItem editable={false} drone={this.state.response}></DreamItem>
        </DroneContainer>
        {this.state.response.inputs.map((value, index) => (
          <div>
            <ResponseText>{value.text}</ResponseText>
          </div>
        ))}
      </ContentWrapper>
    );
  }
}

export default ResponseCard;
