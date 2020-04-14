import * as React from "react";
import "./App.css";

import { TemparatureRequest } from "./sample_pb";
import { GreeterClient } from "./sample_grpc_web_pb";

const initialState = {
  inputText: "",
  message: ""
};
type State = Readonly<typeof initialState>;

class App extends React.Component<{}, State> {
  public readonly state: State = initialState;
  public render() {
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.onChange}
        />
        <button onClick={this.onClick}>Send</button>
        <p>{this.state.message}</p>
      </div>
    );
  }

  private onClick = () => {
    const request = new TemparatureRequest();

    const client = new GreeterClient("http://localhost:30001", {}, {});
    client.sayHello(request, {}, (err, response) => {
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

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value });
  };
}

export default App;