import React, { Component } from "react";
import styled from "styled-components";
import { theme } from "../../../config/colorTheme"

import {animationKeyFrames} from "../../../config/keyframes"


const Container = styled.div`
  position:relative;
  border: solid 1px ${theme.secondaryColor};
  width:30vw;
  overflow:scroll;
  padding:2vw;
  margin:0.5vw;
  background-color:#ffffff;
  height:23vw;

`;

const Title = styled.textarea`
  font-size: 1.6vw
  margin:0;
  font-family: "Roboto";
  font-weight: 700;
  resize: none;
  border: none;
  overflow: auto;
  outline: none;
  text-align:left;
  max-width:95%;

`;

const Description = styled.textarea`
  font-size: 1.5vw;
  font-family: 'Roboto Slab', serif;
  font-weight: 300;
  margin:0;
  text-align:left;
  resize: none;
  border: none;
  overflow: auto;
  outline: none;
  max-width:95%;
  min-height:70%;
`;

const AddButton = styled.button`
border-radius:.8vw;
border: solid 1px ${props => props.disabled ? 'lightgrey' : theme.secondaryColor};
background-color:#ffffff;
transition: transform .3s;
cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
text-align: center;
vertical-align: middle;
padding:0.5vw 1vw;
&:hover{
  transform: scale(1.04);
   background-color:${props => props.disabled ? '#ffffff' : theme.secondaryColor};
  color:${props => props.disabled ? 'lightgrey' : '#ffffff'};
}
font-size: 1.2vw;
margin:auto;
margin-bottom: 0vw;
font-family: "Nunito";
font-weight: 900;
color:${props => props.disabled ? 'lightgrey' : theme.secondaryColor};
outline:none;

`;

const FeatureButton = styled.img`
position:absolute;
bottom:0.5vw;
right:0.5vw;
width:2vw;
height:2vw;
animation: ${animationKeyFrames.fadeIn} 0.5s ease;

`;

const TITLE_PLACEHOLDER = "Dream feature name";
const DESCRIPTION_PLACEHOLDER = 'Briefly describe this feature. It could be an improvement on an existing capability, or an entirely new "superpower".';

class NewFeature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      titlePlaceholder: TITLE_PLACEHOLDER,
      description: "",
      descriptionPlaceholder: DESCRIPTION_PLACEHOLDER,
    };
  }

  saveNewFeature() {

  }

  render() {
    return (
      <Container>
        <Title
          placeholder={this.state.titlePlaceholder}
          onClick={(ev) => { this.setState({ titlePlaceholder: "" }) }}
          onBlur={(ev) => { this.setState({ titlePlaceholder: TITLE_PLACEHOLDER }) }}
          value={this.props.feature.name}
          onChange={(ev) => this.props.onNameChange(this.props.index, ev.target.value)}
          onKeyPress={(ev) => this.onTitleKeyPress(ev)}>
        </Title>

        <Description
          ref="description"
          placeholder={this.state.descriptionPlaceholder}
          onClick={(ev) => { this.setState({ descriptionPlaceholder: "" }) }}
          onBlur={(ev) => { this.setState({ descriptionPlaceholder: DESCRIPTION_PLACEHOLDER }) }}
          value={this.props.feature.description}
          onChange={(ev) => {this.props.onDescriptionChange(this.props.index, ev.target.value)}}>
        </Description>

      </Container>
    )
    return null;
  }

  onTitleChange(ev) {
    this.setState({ title: ev.target.value });
  }

  onTitleKeyPress(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      this.refs.description.focus();
    }
  }

  onDescriptionChange(ev) {
    this.setState({ description: ev.target.value });
  }

  renderAddButton() {
    if (this.state.title.length > 0 && this.state.description.length > 0) {
      return <AddButton disabled={false} onClick={() => this.handleAddClick()}>Add to drone</AddButton>
    }
    return <AddButton disabled={true}>Add to drone</AddButton>
  }

  handleAddClick() {
    fetch('/features/',
      {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Mode': "CORS"
        }
      }).then(response => response.json())
      .then(data => {
        this.props.clickHandler(data);
        this.clear();
      }
      );
  }

  clear() {
    this.setState({ title: "", description: "" })
  }
}

export default NewFeature;
