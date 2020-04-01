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
    year: ""
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  submitForm = e => {
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
      year: this.state.year
    };

    axios({
      url: "/OwnerTransfer",
      method: "post",
      data: payload
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

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
                  <label for="first_name">Enter Vin Number</label>

                  <input
                    placeholder="Registration Number of the Car"
                    name="regNumber"
                    type="text"
                    className="validate"
                    value={this.state.regNumber}
                    onChange={this.handleChange}
                  />
                  <label for="first_name">Enter Registration Number</label>

                  <input
                    placeholder="Owner's Name"
                    name="name"
                    type="text"
                    className="validate"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <label for="first_name">Full Name</label>

                  <input
                    placeholder="CNIC"
                    name="cnic"
                    type="number"
                    className="validate"
                    value={this.state.cnic}
                    onChange={this.handleChange}
                  />
                  <label for="first_name">CNIC</label>

                  <input
                    placeholder="Contact Number"
                    name="contact"
                    type="number"
                    className="validate"
                    value={this.state.contact}
                    onChange={this.handleChange}
                  />
                  <label for="first_name">Contact Number</label>

                  <input
                    placeholder="City"
                    name="city"
                    type="text"
                    className="validate"
                    value={this.state.city}
                    onChange={this.handleChange}
                  />
                  <label for="first_name">City</label>

                  <input
                    placeholder="State"
                    name="ownerState"
                    type="text"
                    className="validate"
                    value={this.state.ownerState}
                    onChange={this.handleChange}
                  />
                  <label for="first_name">State</label>

                  <input
                    placeholder="Millage"
                    name="millage"
                    type="text"
                    className="validate"
                    value={this.state.millage}
                    onChange={this.handleChange}
                  />
                  <label for="first_name">Millage</label>

                  <input
                    placeholder="Year"
                    name="year"
                    type="text"
                    className="validate"
                    value={this.state.year}
                    onChange={this.handleChange}
                  />
                  <label for="first_name">Year of transfer</label>

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
