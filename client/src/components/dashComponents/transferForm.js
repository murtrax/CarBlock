import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import axios from "axios";

class FormPage extends React.Component {
  state = {
    vinNumber: "",
    regNumber: "",
    name: "",
    cnic: "",
    contact: "",
    city: "",
    ownerState: "",
    millage: "",
    year: "",
    errors: [],
    errorBool: ""
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  resetFields = ()=> {

    this.setState({
    vinNumber: "",
    regNumber: "",
    name: "",
    cnic: "",
    contact: "",
    city: "",
    ownerState: "",
    millage: "",
    year: "",
    errors: [],
    errorBool: ""
    })
  }

  submitForm = e => {

    const date = new Date();
    e.preventDefault();
    const payload = {
      vinNumber: this.state.vinNumber,
      regNumber: this.state.regNumber,
      name: this.state.name,
      cnic: this.state.cnic,
      contact: this.state.contact,
      city: this.state.city,
      ownerState: this.state.ownerState,
      millage: this.state.millage,
      year: date.getFullYear()
    };

    axios({
      url: "/OwnerTransfer",
      method: "post",
      data: payload
    })
      .then(response => {
        console.log(response.data);
        this.resetFields();
      })
      .catch(err => {
        console.log(err.response.data.errors);
        this.setState({
          errors: err.response.data.errors,
        })
        this.setState({
          errorBool: "true"
        })
      });
  };

  displayError = (message, errorType)=> {

    let labels= [];
    let condition = "false"

    if (this.state.errorBool == "true")
    {
        for (var x=0; x < errorType.length; x++)
        {
            if (this.state.errors[errorType[x]])
            {
              condition = "true"
              labels[x] = (
              <React.Fragment><label style={{color: "red"}} >{this.state.errors[errorType[x]]}</label></React.Fragment>)
            }
        }
        if (condition === "false") {
            return <label for="first_name">{message}</label>
        }
        else {
            return labels
        }
    }
    else {
      return <label for="first_name">{message}</label>
    }
  }

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.submitForm}>
                  <h4 classNameName="text-center">Owner Transfer Form</h4>

                  <input
                    placeholder="Vin Number of the Car"
                    name="vinNumber"
                    type="text"
                    className="validate"
                    value={this.state.vinNumber}
                    onChange={this.handleChange}
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
                  {this.displayError("Enter Registration Number", ["regNumber"])}

                  <input
                    placeholder="Owner's Name"
                    name="name"
                    type="text"
                    className="validate"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  {this.displayError("Full Name", ["name"])}


                  <input
                    placeholder="CNIC"
                    name="cnic"
                    type="number"
                    className="validate"
                    value={this.state.cnic}
                    onChange={this.handleChange}
                  />
                  {this.displayError("CNIC", ["cnicEmpty", "cnicLength", "cnicNegative"])}


                  <input
                    placeholder="Contact Number"
                    name="contact"
                    type="number"
                    className="validate"
                    value={this.state.contact}
                    onChange={this.handleChange}
                  />
                  {this.displayError("Contact Number", ["contactEmpty", "contactNegative"])}


                  <input
                    placeholder="City"
                    name="city"
                    type="text"
                    className="validate"
                    value={this.state.city}
                    onChange={this.handleChange}
                  />
                  {this.displayError("City", ["city"])}


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
                    placeholder="Millage"
                    name="millage"
                    type="text"
                    className="validate"
                    value={this.state.millage}
                    onChange={this.handleChange}
                  />
                  {this.displayError("Millage", ["millageEmpty", "millageNegative"])}


                  <button
                    class="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    Transfer
                    <i class="material-icons right">send</i>
                  </button>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default FormPage;
