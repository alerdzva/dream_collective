import React, { useState }  from "react";
import styled from "styled-components";
import {theme} from "../../../config/colorTheme";
import Prompt from "../../commons/Prompt"
import TextArea from "../../commons/TextArea"
import Hints from "../../commons/help/hints/Hints"


const Container= styled.div`
  background-color:${theme.lightGray};
  width: 100%;
  margin: 5vw 0;
  display:flex;
  justify-content: space-around;
`;

const InputContainer = styled.div`
width:50%;
padding:2vw 0;
`;

const Preview = styled.div`
width:40%;
`;

const PreviewWrapper = styled.div`
width:100%;
height:80%;
padding:2vw;
background-color:${theme.accentColor20};
border: 1px solid rgba(255, 101, 132, 0.27);
`;

const PromptHelpContainer = styled.div`
width:100%;
position:relative;
`;
 
const PromptWrapper =  styled.div`
width:90%;
`;

const HelpWrapper =  styled.div`
width:10%;
`;

const promptChoices = [
  "Write a short story about an imaginery future scenario.",
  "Write how an elderly person would use this object.",
  "How would you interact with this space if it could understand you?",
];

const promptInstruction = "Here are few example prompts you can choose from..."


const startingLineChoices = [
  "Once upon a time in the year 2050",
  "Self checkout had never been easier thanks to ...",
  "The new Dream Kitchen enables people to...",
];

const startingLineInstruction = "Here are few example starting lines you can choose from...";


export default function NewPrompt(props){

  const [promptText, setPromptText] = useState("");
  const [startingLine, setStartingLine] = useState("");

    return (
      <Container>
        <InputContainer>
          <PromptHelpContainer>
            <PromptWrapper>
              <Prompt
                marginTop={"1vw"}
                marginBottom={"2vw"}
                text={
                  "What do you want others to tell you about their dream " +
                  props.topicName
                }
              ></Prompt>
            </PromptWrapper>
            <HelpWrapper>
              <Hints
                instruction={promptInstruction}
                choices={promptChoices}
                onSelect={(value) => {
                  setPromptText(value);
                  props.onPromptChange(props.index, {
                    text: value,
                    startingLine: startingLine,
                  });
                }}
              ></Hints>
            </HelpWrapper>
          </PromptHelpContainer>
          <TextArea
            rows={4}
            value={props.promptText}
            onChangeCallback={(ev) => {
              setPromptText(ev.target.value);
              props.onPromptChange(props.index, {
                text: ev.target.value,
                startingLine: startingLine,
              });
            }}
          ></TextArea>

          <PromptHelpContainer>
            <PromptWrapper>
              <Prompt
                marginTop={"3vw"}
                marginBottom={"2vw"}
                text={"How would you like othes to start their response"}
              ></Prompt>
            </PromptWrapper>
            <TextArea
              rows={2}
              value={props.startingLine}
              onChangeCallback={(ev) => {
                setStartingLine(ev.target.value);
                props.onPromptChange(props.index, {
                  text: promptText,
                  startingLine: ev.target.value,
                });
              }}
            ></TextArea>
            <HelpWrapper>
              <Hints
                instruction={startingLineInstruction}
                choices={startingLineChoices}
                onSelect={(value) => {
                  setStartingLine(value);
                  props.onPromptChange(props.index, {
                    text: promptText,
                    startingLine: value,
                  });
                }}
              ></Hints>
            </HelpWrapper>
          </PromptHelpContainer>
        </InputContainer>
        <Preview>
          <Prompt
            isSmall={true}
            marginTop={"3vw"}
            marginBottom={"1vw"}
            text={"A preview of how others will see this prompt"}
          ></Prompt>
          <PreviewWrapper>
            <Prompt
              isDisabled={true}
              marginBottom={"2vw"}
              text={promptText ? promptText : "<Your prompt goes here>"}
            ></Prompt>
            <TextArea
              isDisabled={true}
              rows={9}
              value={
                startingLine
                  ? startingLine + "..."
                  : "<Your starting line goes here>"
              }
            ></TextArea>
          </PreviewWrapper>
        </Preview>
      </Container>
    );
        
}
