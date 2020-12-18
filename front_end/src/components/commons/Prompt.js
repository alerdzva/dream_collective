import React from "react";
import styled from "styled-components";
import {theme} from "../../config/colorTheme";

const Text = styled.p`
  font-size: ${(props)=>props.isSmall? "1.5vw":"2vw"};
  font-family: 'Roboto', serif;
  font-weight: ${(props)=>props.isSmall? "500":"700"};
  color:${(props) => props.isDisabled?theme.darkGray: theme.black};
  width:100%;
  margin:0;
  padding-right:5vw;
  margin-top:${(props)=>props.marginTop? props.marginTop: "0"};
  margin-bottom:${(props)=>props.marginBottom? props.marginBottom: "0"};
  text-align:left;
`;

export default function Prompt(props){
    return <Text isDisabled={props.isDisabled} isSmall={props.isSmall} marginBottom={props.marginBottom} marginTop={props.marginTop}>{props.text}</Text>
        
}