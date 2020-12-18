import React from "react";
import styled from "styled-components";
import { theme } from "../../../config/colorTheme";

const Text = styled.p`
  font-size: 1.3vw;
  font-family: 'Roboto', serif;
  font-weight: 700;
  color:${theme.black};
  width:72%;
  margin:2vw auto;
  text-align:left;
  line-height:1.6vw;
`;

const Header = styled.p`
  font-size: 2vw;
  font-family: 'Roboto', serif;
  font-weight: 900;
  color:${theme.black};
  width:90%;
  margin:2vw auto;
  text-align:center;
`;

const Image = styled.img`
    width:60%;
    margin:2vw auto;
`;

const Container = styled.div`
    width:auto;
    height:auto;
    width:30%;
    background-color:${theme.lightGray};
    border-color: ${theme.secondaryColor};
    border-style:solid;
    border-width: ${(props) => props.isSelected ? "1px" : "0"};
    transition:0.5s;
    cursor: pointer;

    &:hover{
      transform:scale(1.02);
    }
    

`;

export default function Category(props) {
  return <Container isSelected={props.isSelected}
    onClick={()=>props.onClickCallback()}>
    <Header>{props.headerText}</Header>
    <Text>{props.bodyText}</Text>
    <Image src={props.imageSrc}></Image>
  </Container>

}