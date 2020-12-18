import React from "react";
import styled from "styled-components";
import { theme } from "../../../config/colorTheme";

const FeatureName = styled.p`
  font-size: 1.3vw;
  font-family: "Roboto", serif;
  font-weight: 700;
  color: ${theme.darkGray};
  width: 72%;
  margin: 2vw auto;
  text-align: left;
  line-height: 1.6vw;
`;

const FeatureDescription = styled.p`
  font-size: 1.1vw;
  font-family: "Roboto", serif;
  font-weight: 500;
  color: ${theme.darkGray};
  width: 72%;
  margin: 2vw auto;
  text-align: left;
  line-height: 1.6vw;
`;

const Header = styled.p`
  font-size: 2vw;
  font-family: "Roboto", serif;
  font-weight: 900;
  color: ${theme.darkGray};
  width: 100%;
  margin: auto;
  text-align: left;
  padding-bottom: 0.5vw;
  border-bottom: 1px solid ${theme.darkGray};
`;

const Image = styled.img`
  width: 30%;
  margin: 2vw auto;
  opacity: 0.5;
`;

const Container = styled.div`
  width: auto;
  height: auto;
  width: 100%;
`;

const Feature = styled.div`
  width: 15vw;
  height: 15vw;
  border: 1px solid ${theme.darkGray};
  margin:1vw;
`;

const FeatureContainer = styled.div`
  display: flex;
`;

const CreateFeatureContainer = styled.div`
  width:30vw;
  /* background-color:${theme.secondaryColor20} */
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: flex-start;

`;

const FeatureSetContainer = styled.div`
  width:70vw;
  /* background-color:${theme.primaryColor20}; */
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: flex-start;
`;

const RowHeader = styled.h3`
  font-size: 1.2vw;
  font-family: "Roboto";
  font-weight: 700;
  text-transform: uppercase;
  color: ${theme.darkGray};
  text-align: left;
`;

const FeatureSet = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default function ActivityPreview(props) {
  return (
    <Container>
      <Header>{"Add dream features to your " + props.topic.name}</Header>
      <Image
        src={
          props.topic.category == 0
            ? require("./assets/product.svg")
            : props.topic.category == 1
            ? require("./assets/space.svg")
            : require("./assets/service.svg")
        }
      ></Image>

      <FeatureContainer>
        <CreateFeatureContainer>
          <RowHeader>+ Create new dream feature</RowHeader>
          <Feature>
            <FeatureName>{"Name of the dream feature"}</FeatureName>
            <FeatureDescription>
              Breifly describe what this feature is
            </FeatureDescription>
          </Feature>
              </CreateFeatureContainer>
              
        <FeatureSetContainer>
          <RowHeader>or, select from what others have created</RowHeader>
          <FeatureSet>
                      {props.features.map(
                          (value, index) => { 
                             return <Feature>
                                <FeatureName>
                                  {value.name}
                                </FeatureName>
                                <FeatureDescription>
                                     {value.description}
                                </FeatureDescription>
                              </Feature>;
                          }
                      )}                       
          </FeatureSet>
        </FeatureSetContainer>
      </FeatureContainer>
    </Container>
  );
}
