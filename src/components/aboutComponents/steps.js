import React, { Component } from "react";
import styled from "styled-components";
import signupImg from "./../../images/SignUp.png";
import tickImg from "./../../images/tick.png";
import joinImg from "./../../images/join.png";

const StepCard = styled.div``;

const Text = styled.p`
  color: white;
  font-size: 14pt;
  font-family: OpenSans-Semibold;
`;

class StepsToJoin extends Component {
  state = {};
  render() {
    let src = "";
    if (this.props.num === "1") {
      src = signupImg;
    } else if (this.props.num === "2") {
      src = tickImg;
    } else if (this.props.num === "3") {
      src = joinImg;
    } else {
      src = "";
    }

    return (
      <StepCard>
        <center>
          <img src={src} height="150" alt="step" />
          <br />
          <br />
          <Text>{this.props.text}</Text>
        </center>
      </StepCard>
    );
  }
}

export default StepsToJoin;
