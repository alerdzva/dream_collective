import React, { useState } from "react";
import styled from "styled-components";
import Help from "../Help"
import {theme} from "../../../../config/colorTheme"
import Text from "../../Text";


const Instruction = styled.p`
  font-size: ${(props)=>props.isSmall? "1.2vw":"1.7vw"};
  font-family: 'Roboto', serif;
  font-weight: ${(props)=>props.isSmall? "300":"700"};
  color:${(props) => props.isDisabled?theme.darkGray: theme.black};
  width:100%;
  margin:0;
  margin-top:${(props)=>props.marginTop? props.marginTop: "0"};
  margin-bottom:${(props)=>props.marginBottom? props.marginBottom: "0"};
  text-align:left;
`;

const Choice = styled.div`
border:1px solid ${theme.accentColor};
margin: 1vw 0.5vw;
padding:0.5vw;
cursor: pointer;
transition: transform 0.5s;

&:hover{
  transform:scale(1.05)
}
`;

const HintContainer = styled.div`

`;

const Container = styled.div`
width:100%;
height:auto;
`;




export default function Hints(props) {
  const [expand, setExpand] = useState(0);
  // var promptChoices = ["dfdfdfdfdfddfdf", "23423423432432", "345sdfsdfdsfsdfsdfds"];

  return <Help iconSrc={require("./assets/hint_icon.svg")}
  body={
  <Container>
      <Instruction>{props.instruction}</Instruction>
      {props.choices && props.choices.map((value,key)=>{
        return <Choice onClick={()=>props.onSelect(value)}><Text text={value}></Text></Choice>
      })}

  </Container>
}>
  </Help>

}

