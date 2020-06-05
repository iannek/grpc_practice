import React, { Component } from 'react';
import "./App.css";

import { TemparatureRequest } from "./sample_pb";
import { GreeterClient } from "./sample_grpc_web_pb";

class App extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    const request = new TemparatureRequest();
    const client = new GreeterClient("http://localhost:10000", {}, {});
    client.returnTemparature(request, {}, (err, response) => {
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

  render() {
  return (
    <div className="App">
    <button onClick={this.onClick}>Send</button>
    </div>
  );
}
}

export default App;