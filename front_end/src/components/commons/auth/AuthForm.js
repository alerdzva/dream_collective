import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../config/colorTheme";

import Amplify, { Auth } from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifySignOut,
} from "@aws-amplify/ui-react";
import Button from "../Button";

const Container = styled.div`
  position: absolute;
  width: 40vw;
  top: 5vw;
  height: 50vw;
  left: 30vw;
  border: solid 4px ${theme.secondaryColor};
  z-index: 300;
  background-color: ${theme.white};
  margin-bottom: 10vw;
`;

var APICalls = require("../../../utils/APICalls");
//confirmSignUp
export default function AuthForm(props) {
  const [authState, setauthState] = useState("");
  const handleAuthChange = async (nextAuthState, data) => {
    setauthState(nextAuthState);
    data &&
      data.username &&
      nextAuthState == "signedin" &&
      authState != nextAuthState &&
      APICalls.readUserByCognitoUsername(data.username, (userData) => {
        if (!userData || !userData._id) {
          APICalls.createNewUser(
            { cognito_username: data.username, email: data.attributes.email },
            (newUserData) => {
              props.onUserAvailable(newUserData);
            }
          );
        } else {
          props.onUserAvailable(userData);
        }
      });
  };
  return (
    <Container>
      <Button
        text={"Close"}
        onClick={() => {
          props.onClose();
        }}
      ></Button>
      <AmplifyAuthenticator
        usernameAlias="email"
        handleAuthStateChange={(nextAuthState, data) =>
          handleAuthChange(nextAuthState, data)
        }
      >
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            {
              type: "email",
              label: "Email Address",
              required: true,
            },
            {
              type: "password",
              label: "Password",
              required: true,
            },
          ]}
        />
        <AmplifySignIn slot="sign-in" usernameAlias="email" />
      </AmplifyAuthenticator>
    </Container>
  );
}
