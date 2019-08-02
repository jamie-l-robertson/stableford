import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Security } from "@okta/okta-react";

import "antd/dist/antd.css";
import "./index.css";
import App from "./App";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

const oktaConfig = {
  issuer: process.env.REACT_APP_OKTA_ORG_URL,
  redirect_uri: `${window.location.origin}/implicit/callback`,
  client_id: process.env.REACT_APP_OKTA_CLIENT_ID
};

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Security {...oktaConfig}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Security>
  </BrowserRouter>,
  document.getElementById("root")
);
