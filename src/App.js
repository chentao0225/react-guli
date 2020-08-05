import React from "react";
import { Button } from "antd";
import "./App.less";
import { connect } from "react-redux";
import { increment, decrement } from "./redux/actions/counter";
class App extends React.Component {
  increment = () => {
    this.props.increment(1);
  };
  decrement = () => {
    this.props.decrement(1);
  };
  render() {
    return (
      <div className="App">
        <h1>{this.props.count}</h1>
        <Button type="primary" onClick={this.increment}>
          increment
        </Button>
        <Button type="primary" danger onClick={this.decrement}>
          decrement
        </Button>
      </div>
    );
  }
}
export default connect((state) => ({ count: state.counter }), {
  increment,
  decrement,
})(App);
