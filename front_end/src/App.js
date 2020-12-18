import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import CreateTopicView from "./components/views/createTopic/CreateTopicView";
import SetupDreamActivityView from "./components/views/createTopic/SetupDreamActivityView";
import SetupPromptsView from "./components/views/createTopic/SetupPromptsView";
import LandingPage from "./components/landing/LandingPage";
import AllTopicsView from "./components/views/allTopics/AllTopicsView";
import TopicView from "./components/views/topic/TopicView";
import AddFeaturesView from "./components/views/activity/AddFeaturesView";
import AddResponsesView from "./components/views/activity/AddResponsesView";
import { AuthContext } from "./auth/AuthContext";

import Amplify, { Auth } from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifySignOut,
} from "@aws-amplify/ui-react";
import MyTopicsView from "./components/views/myTopics/MyTopicsView";

function App() {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });

    Auth.currentAuthenticatedUser().then((user) => setCognitoUser(user));
  });

  const [cognitoUser, setCognitoUser] = useState(null);

  return (
    <AuthContext.Provider value={{ cognitoUser, setCognitoUser }}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/allTopics" component={AllTopicsView} />
          <Route exact path="/myTopics" component={MyTopicsView} />
          <Route exact path="/newTopic/1" component={CreateTopicView} />
          <Route
            exact
            path="/newTopic/2/:id"
            component={SetupDreamActivityView}
          />
          <Route exact path="/newTopic/3/:id" component={SetupPromptsView} />
          <Route exact path="/topic/:id" component={TopicView} />
          <Route exact path="/response/:id" component={AddFeaturesView} />
          <Route exact path="/prompt/:id" component={AddResponsesView} />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
