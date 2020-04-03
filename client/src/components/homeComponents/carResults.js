import React, { Component } from "react";
import axios from "axios";

class CarResults extends Component {
  state = {
    owner: {},
    car: {},
    error: ""
  };

  //Set the state with parameters passed down as soon as the component mounts
  componentDidMount() {
    this.getResult();
  }

  getResult = () => {
    const { opt, id } = this.props.match.params;
    const payload = {
      number: id,
      selectedOpt: opt
    };
    axios({
      url: "/searchCar",
      method: "post",
      data: payload
    })
      .then(response => {
        console.log(response.data);
        this.setState({ owner: response.data.owner, car: response.data.car });
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          error: err.response.data
        });
      });
  };

  render() {
    return (
      <div>
        <h1>{this.state.owner.state}</h1>
        <h1>{this.state.car.make}</h1>
        <h1>{this.state.car.model}</h1>

        <h1>{this.state.error}</h1>
      </div>
    );
  }
}

export default CarResults;
