import React from "react";
import {
  MDBJumbotron,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBIcon,
  MDBInput,
  MDBAnimation,
  MDBContainer,
  MDBFormInline
} from "mdbreact";
import Radio from "./homeComponents/radioBtn";
import SearchResults from "./homeComponents/searchResults";
import validator from "validator";
import isEmpty from "is-empty";
import axios from "axios";

class JumbotronPage extends React.Component {
  state = {
    number: "",
    selectedOpt: "vin",
  };

  clearFields = () => {
    this.setState({
      number: ""
    });
  };

  isValid = data => {
    if (validator.isEmpty(data.number)) {
      return false;
    } else {
      return true;
    }
  };

  //send data to server and recieve appropriate response
  submitForm = e => {
    e.preventDefault();

    const payload = {
      number: this.state.number,
      selectedOpt: this.state.selectedOpt
    };

    if (this.isValid(payload)) {
      axios({
        url: "/searchCar",
        method: "post",
        data: payload
      })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err.response.data);
        });
      this.clearFields();
    } else {
      //show alert that is empty
    }
  };

  //Manages data in the state
  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  handleBtnChange = e => {
    this.setState({
      selectedOpt: e.target.value
    });
  };

  render() {
    return (
      <div>
        <MDBRow>
          <MDBCol>
            <MDBJumbotron style={{ padding: 0 }} className="text-center mw-100">
              <MDBCol
                className="text-white text-center py-3 px-4"
                style={{
                  opacity: "",
                  backgroundImage: `url(https://miro.medium.com/max/3200/1*CvjclMDwgh9AqED_h5UVCA.jpeg)`
                }}
              >
                <MDBCol className="py-5 text-center">
                  <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">
                    Search Vehicle to see their Vehicle History Report
                  </MDBCardTitle>
                  <p className="mx-5 mb-5">
                    Search vehicle by its Registration Number or Vin Number, if
                    it is on the system you will b able to see its vehicle
                    history report quickly.
                  </p>
                  <form onSubmit={this.submitForm}>
                    <MDBInput
                      className="mw-75"
                      label="Search by Vin Number OR Registration Number"
                      background
                      name="number"
                      value={this.state.number}
                      onChange={this.handleChange}
                    />
                    {/*}<Radio />*/}
                    <MDBFormInline className="text-center">
                      <p className="text-center">
                        <label>
                          <input
                            type="radio"
                            value="vin"
                            checked={this.state.selectedOpt === "vin"}
                            onChange={this.handleBtnChange}
                          />
                          <span>Vin Number</span>
                        </label>
                      </p>
                      <p className="ml-3">
                        <label>
                          <input
                            type="radio"
                            value="reg"
                            checked={this.state.selectedOpt === "reg"}
                            onChange={this.handleBtnChange}
                          />
                          <span>Registration Number</span>
                        </label>
                      </p>
                    </MDBFormInline>
                    <MDBBtn color="cyan" type="submit">
                      Search
                    </MDBBtn>
                  </form>
                </MDBCol>
              </MDBCol>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>

        <MDBContainer>
          <MDBRow>
            <SearchResults />
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default JumbotronPage;
