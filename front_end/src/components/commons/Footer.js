import React from "react";
import styled from "styled-components";
import { theme } from "../../config/colorTheme";
import Button from "../commons/Button"

const Container = styled.div`
width:90vw;
margin:auto;
padding:1vw 0 3vw 0;
display:flex;
justify-content:flex-start;
position: -webkit-sticky;
position: sticky;
top: 0;
z-index:200;
background-color:${theme.white};
`;

const ButtonContainer = styled.div`
width:100%;
display:flex;
justify-content:flex-end;
`;


export default function Footer(props) {
  return <Container>
    <ButtonContainer>
      {(props.onBackCallback || props.disableBack) && <Button onClick={()=> props.onBackCallback()} isDisabled={props.disableBack} text={"BACK"}></Button>}
      {(props.onNextCallback || props.disableNext) && <Button onClick={()=> props.onNextCallback()} isDisabled={props.disableNext} text={"NEXT"}></Button>}
      {(props.onDoneCallback || props.disableDone) && <Button onClick={()=> props.onDoneCallback()} isDisabled={props.disableDone} text={"PUBLISH"}></Button>}
    </ButtonContainer>
  </Container>
}