import React, { Component } from 'react';
import "./App.css";

import { TemparatureRequest } from "./sample_pb";
import { GreeterClient } from "./sample_grpc_web_pb";
import { KeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'

const keycloakProviderInitConfig = {
  onLoad: 'login-required',
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      message: "",
      token: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onKeycloakTokens = this.onKeycloakTokens.bind(this);
  }

  onClick = () => {
    const request = new TemparatureRequest();
    const metadata = {'authorization': this.state.token};
    const client = new GreeterClient("http://localhost:10000", {}, {});
    client.returnTemparature(request, metadata, (err, response) => {
      if (err || response === null) {
        console.log('Got error, code = ' + err.code +
        ', message = ' + err.message);
        throw err;
      }

      for(let i in response.array[0]) {
        console.log(response.array[0][i]);
      }

    });
  };

  onKeycloakTokens = (tokens) => {
    console.log('onKeycloakTokens', tokens)
    this.setState({ token: tokens.idToken });
  }

  render() {

  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={keycloakProviderInitConfig}
      onTokens={this.onKeycloakTokens}
    >
    <div className="App">
    <button onClick={this.onClick}>Send</button>
    <p>{this.state.message}</p>
      </div>
      </KeycloakProvider>
  );
}
}

export default App;