import React, { Component, useState } from "react";
import styled from "styled-components";
import {
  countries as countries,
  genderOptions as genderOptions,
  ageRanges as ageRanges,
  droneOwnership as droneOwnership,
} from "./selectOptions";
import { theme } from "../../config/colorTheme";
import { devices } from "../../config/devices";
import Prompt from "../commons/Prompt";

const Container = styled.div`
  position: absolute;
  width: 80vw;
  top: 5vw;
  left: 10vw;
  border: solid 4px ${theme.secondaryColor};
  z-index: 300;
  background-color: ${theme.white};
  margin-bottom: 10vw;
`;

const ThankYouText = styled.h1`
  font-size: 3vw;
  margin: 5vw 10vw;
  text-align: left;
  font-family: "Roboto";
  font-weight: 900;
  color: ${theme.black};

  @media ${devices.mobile} {
    font-size: 7vw;
  }
`;

const Message = styled.p`
  font-size: 2vw;
  margin-bottom: 3vw;
  font-family: "Roboto Slab";
  font-weight: 300;
  text-align: left;
  line-height: 3vw;

  @media ${devices.mobile} {
    font-size: 3vw;
    margin: auto;
  }
`;

const PromptContainer = styled.div`
  width: 50vw;
  margin: auto;
  margin-bottom: 20vh;

  @media ${devices.mobile} {
    font-size: 3vw;
    width: 90vw;
    margin: auto;
  }
`;

// const Prompt = styled.p`
//   font-size: 1.2vw
//   margin-bottom:1vh;
//   margin-top:5vh;
//   font-family: "Roboto";
//   font-weight: 500;
//   color:${theme.primaryColor};
//   text-align:left;

//   @media ${devices.mobile} {
//     font-size: 3vw
//   }
// `;

const TextField = styled.input`
  font-size: 1.5vw;
  width: 24vw;
  font-family: "Roboto";
  font-weight: 400;
  text-align: left;
  border: solid 1px ${theme.secondaryColor};
  outline: none;
  height: 4vw;
  text-align: center;
  margin-top: 2vh;

  @media ${devices.mobile} {
    width: 40vw;
    font-size: 3vw;
    height: 7vw;
  }
`;

const SingleTextField = styled.input`
  font-size: 1.5vw;
  font-family: "Roboto";
  font-weight: 400;
  text-align: left;
  border: solid 1px ${theme.secondaryColor};
  outline: none;
  height: 5vw;
  width: 50vw;
  padding: 1vh;
  margin-top: 1vw;
  margin-bottom: 2vw;

  @media ${devices.mobile} {
    width: 90vw;
    font-size: 3vw;
    height: 7vw;
  }
`;

const Select = styled.select`
  width: 50vw;
  height: 4.5vw;
  background: white;
  border: none;
  font-size: 1.5vw;
  font-family: "Roboto";
  font-weight: 400;
  border: solid 1px ${theme.secondaryColor};
  outline: none;
  margin-top: 1vw;
  margin-bottom: 3vw;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
    font-size: 1.2vw;
    font-family: "Roboto";
    font-weight: 400;
  }

  @media ${devices.mobile} {
    font-size: 3vw;
    width: 90vw;
    height: 5vw;
    padding: 10vw;
  }
`;

const Button = styled.button`
  border: solid 1px ${theme.accentColor};
  min-width: 10vw;
  padding: 1vw;
  transition: transform 0.3s;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  margin: 2vw;
  background-color: ${theme.secondaryColor};
  color: #ffffff;
  border: solid 1px #ffffff;

  font-size: 1.5vw;
  font-family: "Roboto";
  font-weight: 900;

  outline: none;

  @media ${devices.mobile} {
    font-size: 4vw;
    width: 70vw;
    height: auto;
    max-height: none;
    padding: 2vw;
  }
`;

const SkipButton = styled.button`
  border: solid 1px ${theme.accentColor};
  background-color: ${theme.white};
  min-width: 10vw;
  transition: transform 0.3s;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  font-size: 1.5vw;
  font-family: "Roboto";
  font-weight: 900;
  color: ${theme.accentColor};
  outline: none;
  padding: 1vw;

  @media ${devices.mobile} {
    font-size: 4vw;
    width: 70vw;
    height: auto;
    max-height: none;
    padding: 2vw;
    margin-top: 5vw;
  }
`;

const Wrapper = styled.div`
  width: 50vw;
  margin: 8vh auto;
  border-radius: 1vw;

  @media ${devices.mobile} {
    font-size: 3vw;
    width: 90vw;
    margin: 5vw auto;
  }
`;

const NameEmailWrapper = styled.div`
  width: 50vw;
  display: flex;
  margin: auto;
  justify-content: space-between;
  margin-bottom: 5vh;

  @media ${devices.mobile} {
    width: 85vw;
  }
`;

var APICalls = require("../../utils/APICalls");

export default function UserInfoForm(props) {
  const [isOwning, setisOwning] = useState({});
  const [ageRange, setAgeRange] = useState({});
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState({});
  const [background, setBackground] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <Container>
      <ThankYouText>Tell us more about you: </ThankYouText>

      <PromptContainer>
        <Message>
          You can help our research by providing the following information.
        </Message>
        <Prompt text="Your Age"></Prompt>
        <Select
          onChange={(ev) => {
            if (ev.target.selectedIndex > 0) {
              setAgeRange({
                index: ev.target.selectedIndex,
                value: ev.target.value,
              });
            }
          }}
        >
          <option value="" hidden>
            Select age range
          </option>
          {ageRanges.map((item, key) => (
            <option>{item}</option>
          ))}
        </Select>

        {/* <Prompt text="Your Gender"></Prompt>
        <Select
          onChange={(ev) => {
            if (ev.target.selectedIndex > 0) {
              setGender({
                index: ev.target.selectedIndex,
                value: ev.target.value,
              });
            }
          }}
        >
          <option value="" hidden>
            Your gender
          </option>
          {genderOptions.map((item, key) => (
            <option>{item}</option>
          ))}
        </Select> */}

        <Prompt text="Your Gender"></Prompt>
        <SingleTextField
          onChange={(ev) => {
            setGender(ev.target.value);
          }}
          value={gender}
        ></SingleTextField>

        <Prompt text="Your Country"></Prompt>
        <Select
          onChange={(ev) => {
            if (ev.target.selectedIndex > 0) {
              setCountry({
                index: ev.target.selectedIndex,
                value: ev.target.value,
              });
            }
          }}
        >
          <option value="" hidden>
            Select Country
          </option>
          {countries.map((item, key) => (
            <option>{item.name}</option>
          ))}
        </Select>

        <Prompt text="Tell us about your background and/ or areas of expertise"></Prompt>
        <SingleTextField
          onChange={(ev) => {
            setBackground(ev.target.value);
          }}
          value={background}
          placeholder="e.g., I’m an industrial designer, I’m an engineer, I am a student."
        ></SingleTextField>

        <Wrapper>
          <Message>
            <strong>
              Could we contact you for a follow-up interview to help our
              research?
            </strong>
          </Message>
          <Message>
            If you would like to be included in future research activities,
            please enter your name and the email below.
          </Message>

          <NameEmailWrapper>
            <TextField
              placeholder="First Name"
              onChange={(ev) => {
                setName(ev.target.value);
              }}
              value={name}
            ></TextField>
            <TextField
              placeholder="Email Address"
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
              value={email}
            ></TextField>
          </NameEmailWrapper>
        </Wrapper>

        <SkipButton
          onClick={() => {
            props.onClose();
          }}
        >
          Skip
        </SkipButton>
        <Button
          onClick={() => {
            APICalls.updateUser(
              props.user._id,
              {
                email: email,
                name: name,
                ageRange: ageRange,
                gender: gender,
                country: country,
                background: background,
              },
              (data) => {
                console.log(data);
                props.onClose();
              }
            );
          }}
        >
          Submit
        </Button>
      </PromptContainer>
    </Container>
  );
}
