import React, { Component } from "react";
import styled from "styled-components";
import Feature, { FeatureType } from "../feature/Feature";
import { devices } from "../../config/devices.js";
import { theme } from "../../config/colorTheme";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto;
  width: 80vw;
  z-index: 100;
  border-radius: 100vw;
  /* background-color:${theme.lightGray} */
`;

const DroneImage = styled.img`
  height: 32vh;
  max-width: 60vw;
  margin: auto;
  margin-top: 8vh;

  @media ${devices.mobile} {
    height: 80vw;
    width: 80vw;
    max-height: 75vh;
    max-width: 75vh;
    margin-top: 2vh;
  }
`;

const FeatureContainer = styled.div`
  display: flex;
  width: auto;
  justify-content: center;
`;

class DreamItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drone: null,
    };
  }

  render() {
    const topic = this.props.drone.topic;

    return (
      <Container>
        <DroneImage
          src={
            topic.category == 0
              ? require("./assets/product.svg")
              : topic.category == 1
              ? require("./assets/space.svg")
              : require("./assets/service.svg")
          }
        ></DroneImage>
        <FeatureContainer>
          {this.props.drone.features.map((item, key) => (
            <Feature
              featureType={
                this.props.editable
                  ? FeatureType.removable
                  : FeatureType.disabled
              }
              name={item.name}
              description={item.description}
              clickHandler={(featureProps) =>
                this.props.featureClickHandler(featureProps)
              }
              index={key}
            ></Feature>
          ))}
        </FeatureContainer>
      </Container>
    );
  }
}

export default DreamItem;
