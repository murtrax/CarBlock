import React from "react";
import axios from "axios";

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";

class CardExample extends React.Component {
  state = {
    vinNumber: "",
    regNumber: "",
    make: "",
    model: "",
    year: "",
    variant: "",
    FullName: "",
    ownerCNIC: "",
    ownerContact: "",
    ownerCity: "",
    ownerState: "",
    millage: "",
    type: "",
    fuel: "",
    drive: "",
    errors: [],
    errorBool: "",
    msg: ""
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  displayError = (message, errorType) => {
    let labels = [];
    let condition = "false";

    if (this.state.errorBool === "true") {
      for (var x = 0; x < errorType.length; x++) {
        if (this.state.errors[errorType[x]]) {
          condition = "true";
          labels[x] = (
            <React.Fragment>
              <label style={{ color: "red" }}>
                {this.state.errors[errorType[x]]}
              </label>
            </React.Fragment>
          );
        }
      }
      if (condition === "false") {
        return <label for="first_name">{message}</label>;
      } else {
        return labels;
      }
    } else {
      return <label for="first_name">{message}</label>;
    }
  };
  /*displayError = (message, errorType)=> {
    if (this.state.errorBool === "true") {
      if (!this.state.errors[errorType])
      {
        return null;
      }
     return <label style={{color: "red"}} >{this.state.errors[errorType]}</label>
    }
    if (message === "")
    {
      return null;
    }
    else {
      return <label for="first_name">{message}</label>
    }
  }*/

  submitForm = (e) => {
    e.preventDefault();

    const payload = {
      vinNumber: this.state.vinNumber,
      regNumber: this.state.regNumber,
      make: this.state.make,
      model: this.state.model,
      year: this.state.year,
      variant: this.state.variant,
      FullName: this.state.FullName,
      ownerCNIC: this.state.ownerCNIC,
      ownerContact: this.state.ownerContact,
      ownerCity: this.state.ownerCity,
      ownerState: this.state.ownerState,
      millage: this.state.millage,
      type: this.state.type,
      fuel: this.state.fuel,
      drive: this.state.drive,
    };
    console.log(payload);

    axios({
      url: "/CarEntry",
      method: "POST",
      data: payload,
    })
      .then((response) => {
        console.log(response.data);
        this.resetFields();
      })
      .catch(error => {
        console.log(error.response.data.error)
        console.log(error.response.request.status)
        if (error.response.request.status === 400){
          console.log("error")
          this.setState({
            msg: error.response.data.error,
            errorBool: "false",
            errors: [],
          })
        }
        else {
          this.setState({
            errors: [],
            errorBool: "false",
            msg: ""
          })
          let valid = error.response.data.isValid;
          let errors = error.response.data.errors;
          if (!valid)
          {
            this.setState({
              errors: errors
            },()=> {
              this.setState({
                errorBool: "true"
              })
            })
          }
          console.log(this.state.errors)
        }
        
      });
  };

  resetFields = () => {
    this.setState({
      vinNumber: "",
      regNumber: "",
      make: "",
      model: "",
      year: "",
      variant: "",
      FullName: "",
      ownerCNIC: "",
      ownerContact: "",
      ownerCity: "",
      ownerState: "",
      millage: "",
      type: "",
      fuel: "",
      drive: "",
      errors: [],
      errorBool: "",
    },()=> {
      this.setState({
        msg: ""
      })
    });
  };

  render() {
    //console.log(this.state);

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol lg="12" md="12" sm="12">
            <form onSubmit={this.submitForm}>
              <MDBRow>
                <MDBCol md="12" sm="12" lg="11">
                  <MDBCard>
                    <MDBCardBody>
                      <h4 classNameName="text-center">Car Details</h4>
                      <input
                        placeholder="Vin Number of the Car"
                        name="vinNumber"
                        type="text"
                        value={this.state.vinNumber}
                        onChange={this.handleChange}
                        className="validate"
                      />
                      {this.displayError("Enter Vin Number", ["vinNumber"])}

                      <input
                        placeholder="Registration Number of the Car"
                        name="regNumber"
                        type="text"
                        className="validate"
                        value={this.state.regNumber}
                        onChange={this.handleChange}
                      />
                      {this.displayError("Enter Registration Number", [
                        "regNumber",
                      ])}

                      <input
                        placeholder="Make / Company"
                        name="make"
                        type="text"
                        className="validate"
                        value={this.state.make}
                        onChange={this.handleChange}
                      />
                      {this.displayError("Make / Company", ["make"])}

                      <input
                        placeholder="Model / Name"
                        name="model"
                        type="text"
                        className="validate"
                        value={this.state.model}
                        onChange={this.handleChange}
                      />
                      {this.displayError("Model / Name", ["model"])}

                      <input
                        placeholder="Year of Manufacture"
                        name="year"
                        type="number"
                        className="validate"
                        value={this.state.year}
                        onChange={this.handleChange}
                      />
                      {this.displayError("Year of Manufacture", [
                        "YearsEmpty",
                        "YearsInvalid",
                      ])}
                      <input
                        placeholder="Variant"
                        name="variant"
                        type="text"
                        className="validate"
                        value={this.state.variant}
                        onChange={this.handleChange}
                      />
                      <label for="first_name">Variant</label>

                      <MDBRow>
                        <MDBCol md="6" lg="6" sm="12">
                          <select
                            className="browser-default custom-select"
                            value={this.state.type}
                            onChange={this.handleChange}
                            name="type"
                          >
                            <option>Choose your option</option>
                            <option value="Sedan">Sedan</option>
                            <option value="HatchBack">HatchBack</option>
                            <option value="Estate">Estate</option>
                            <option value="SUV">SUV</option>
                            <option value="CUV">CUV</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Convertible">Convertible</option>
                            <option value="Van">Van</option>
                            <option value="Pickup Truck">Pickup Truck</option>
                          </select>
                          {this.displayError("Type", ["type"])}
                        </MDBCol>
                        <MDBCol md="6" lg="6" sm="12">
                          <select
                            className="browser-default custom-select"
                            value={this.state.fuel}
                            onChange={this.handleChange}
                            name="fuel"
                          >
                            <option>Choose your option</option>
                            <option value="Gas">Gas</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                          </select>
                          {this.displayError("Fuel", ["fuel"])}
                        </MDBCol>
                        <MDBCol md="6" lg="6" sm="12">
                          <select
                            className="browser-default custom-select"
                            onChange={this.handleChange}
                            name="drive"
                          >
                            <option>Choose your option</option>
                            <option value="Front Wheel Drive">
                              Front Wheel Drive (FWD)
                            </option>
                            <option value="Rear Wheel Drive">
                              Rear Wheel Drive (RWD)
                            </option>
                            <option value="All Wheel Drive">
                              All Wheel Drive (AWD)
                            </option>
                            <option value="4 Wheel Drive">
                              4 Wheel Drive (4WD)
                            </option>
                          </select>
                          {this.displayError("Drive", ["drive"])}
                        </MDBCol>
                      </MDBRow>

                      <br />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="12" sm="12" lg="11">
                  <MDBCard>
                    <MDBCardBody>
                      <h4 classNameName="text-center">Owner Details</h4>

                      <input
                        placeholder="Full Name"
                        name="FullName"
                        type="text"
                        className="validate"
                        value={this.state.Fullname}
                        onChange={this.handleChange}
                      />
                      {this.displayError("Enter Owner Name", ["FullName"])}
                      <input
                        placeholder="Owner CNIC"
                        name="ownerCNIC"
                        type="number"
                        className="validate"
                        value={this.state.ownerCNIC}
                        onChange={this.handleChange}
                      />
                      {this.displayError("CNIC", [
                        "ownerCNICEmpty",
                        "ownerCNICLength",
                        "ownerCNICNegative",
                      ])}
                      <input
                        placeholder="Contact"
                        name="ownerContact"
                        type="number"
                        className="validate"
                        value={this.state.ownerContact}
                        onChange={this.handleChange}
                      />
                      {this.displayError("Contact", [
                        "ownerContactEmpty",
                        "ownerContactNegative",
                      ])}
                      <input
                        placeholder="City"
                        name="ownerCity"
                        type="text"
                        className="validate"
                        value={this.state.ownerCity}
                        onChange={this.handleChange}
                      />
                      {this.displayError("City", ["ownerCity"])}

                      <input
                        placeholder="State"
                        name="ownerState"
                        type="text"
                        className="validate"
                        value={this.state.ownerState}
                        onChange={this.handleChange}
                      />
                      {this.displayError("State", ["ownerState"])}
                      <input
                        placeholder="Millage at time of purchase"
                        name="millage"
                        type="number"
                        className="validate"
                        value={this.state.millage}
                        onChange={this.handleChange}
                      />
                      {this.displayError("Millage", [
                        "millageEmpty",
                        "millageNegative",
                      ])}
                      <br />
                      <label style = {{color: "red", fontSize: "13"}}>{this.state.msg}</label>
                      <br />
                      <button
                        class="btn waves-effect waves-light"
                        type="submit"
                      >
                        Add
                        <i class="material-icons right">send</i>
                      </button>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default CardExample;
