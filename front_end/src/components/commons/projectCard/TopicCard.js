import React from "react";
import styled from "styled-components";
import { theme } from "../../../config/colorTheme";

const Container = styled.div`
width:42%;
padding:0.8vw 0 0;
background-color:${theme.white};
border: 1px solid ${theme.secondaryColor};
transition: transform 0.2s;
margin:2vw 0;
cursor:pointer;

&:hover{
    transform: scale(1.02);
}
`;

const Text = styled.p`
  font-size: 1.8vw;
  font-family: 'Roboto', serif;
  font-weight: 900;
  color:${theme.darkGray};
  margin:0;
  text-align:center;
  padding:2vw;
  width:100%;
  background-color:${theme.lightGray};
  border-top: 1px solid ${theme.secondaryColor};
  min-height:6vw;
`;

const TopicImage = styled.img`
margin:0.8vw 0.8vw;
width:40%;
min-height:15vw;
cursor:pointer;
transition:transform 0.2s;

&:hover{
  transform: scale(1.08);
}
`;


export default function TopicCard(props) {
  
  if (!props.topic.isPublished) return null;
  return <Container onClick={()=>props.onClick?props.onClick(props.topic._id):null}>
<TopicImage  src={props.topic.category== 0 ? require("./assets/product.svg"):props.topic.category== 1 ? require("./assets/service.svg"):require("./assets/space.svg")}></TopicImage>
<Text>{"Dream " +props.topic.name}</Text>
  </Container>
}