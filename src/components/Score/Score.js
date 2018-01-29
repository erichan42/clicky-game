import React, { Component } from "react";
import "./Score.css";

class Score extends Component {
  state = {
    message: "",
    animating: false
  };

  componentWillReceiveProps({ score, topScore }) {
    let newState = { animating: true };
    if (score === 0 && topScore === 0) {
      newState.message = "";
    } else if(score === 18 & topScore === 18) {
      newState.message = "win";
    } else if (score === 0 && topScore > 0) {
      newState.message = "incorrect";
    } else {
      newState.message = "correct";
    }
    this.setState(newState, () =>
      setTimeout(() => this.setState({ animating: false }), 500)
    );
  }

  renderMessage = () => {
    switch (this.state.message) {
      case "correct":
        return "You guessed correctly!";
      case "incorrect":
        return "You guessed incorrectly!";
      case "win":
        return "You won!";
      default:
        return "Click an image to begin!";
    }
  };

  render() {
    return (
      <li className={this.state.animating ? this.state.message : ""}>
        {this.renderMessage()}
      </li>
    );
  }
}

export default Score;
