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
    ownerName: "",
    ownerPosition: "",
    ownerContact: "",
    ownerCNIC: "",
    companyName: "",
    companyEmail: "",
    companyPassword: "",
    companyConfirm: "",
    companyContact: "",
    companyAddress: "",
    companyCity: "",
    companyZip: "",
    passError: "",
    errorBool: "",
    errors: []
  };

  //This method handles the change in form fields and updates state accordingly
  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  clearFields = () => {
    this.setState({
      ownerName: "",
      ownerPosition: "",
      ownerContact: "",
      ownerCNIC: "",
      companyName: "",
      companyEmail: "",
      companyPassword: "",
      companyConfirm: "",
      companyContact: "",
      companyAddress: "",
      companyCity: "",
      companyZip: "",
      passError: "", 
      errorBool: "",
      errors: []
    });
  };

  //This method validates password mismatch in form
  isValid = () => {
    if (this.state.companyPassword !== this.state.companyConfirm) {
      this.setState({
        companyPassword: "",
        companyConfirm: "",
        passError: "Passwords do not match!"
      });
      return false;
    } else return true;

    //
    //CNIC check - 15 digits with 2 dashes
  };

  displayError = (errorType)=> {

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
            return null
        }
        else {
            return labels
        }
    }
    else {
      return null;
    }
  }

  submitForm = e => {
    e.preventDefault();
    if (this.isValid()) {
      const payload = {
        ownerName: this.state.ownerName,
        ownerPosition: this.state.ownerPosition,
        ownerContact: this.state.ownerContact,
        ownerCNIC: this.state.ownerCNIC,
        companyName: this.state.companyName,
        companyEmail: this.state.companyEmail,
        companyPassword: this.state.companyPassword,
        companyConfirm: this.state.companyConfirm,
        companyContact: this.state.companyContact,
        companyAddress: this.state.companyAddress,
        companyCity: this.state.companyCity,
        companyZip: this.state.companyZip,
        approved: false
      };

      axios({
        url: "/workshopSignUp",
        method: "post",
        data: payload
      })
        .then(response => {
          console.log(response)
          this.clearFields();
        })
        .catch(error => {
          console.log(error.response.data)
          this.setState({
            errors: error.response.data.errors
          })
          this.setState({
            errorBool: "true"
          })
        });

      
    }
  };

  render() {
    let styles;

    if (this.state.passError) {
      styles = {
        borderBottom: "1px solid red"
      };
    } else {
      styles = {
        borderBottom: ""
      };
    }

    return (
      <MDBContainer className="mt-4">
        <MDBRow className="text-center">
          <MDBCol>
            <p className="h3 text-center py-4">Workshop Details</p>
          </MDBCol>
        </MDBRow>

        <form onSubmit={this.submitForm}>
          <MDBRow className="justify-content-center">
            <MDBCol md="6" sm="10" className="mb-4">
              <MDBCard>
                <MDBCardBody>
                  <p className="h4 text-center py-2">Company Details</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Company Name"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      name="companyName"
                      value={this.state.companyName}
                      onChange={this.handleChange}
                    />
                     {this.displayError(["companyName"])}
                    <MDBInput
                      label="Company Email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      name="companyEmail"
                      value={this.state.companyEmail}
                      onChange={this.handleChange}
                    />
                    {this.displayError(["companyEmail"])}
                    <MDBInput
                      label="Password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      name="companyPassword"
                      value={this.state.companyPassword}
                      onChange={this.handleChange}
                      style={styles}
                    />
                    {this.displayError(["companyPassword"])}
                    <MDBInput
                      label="Confirm Password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      name="companyConfirm"
                      value={this.state.companyConfirm}
                      onChange={this.handleChange}
                      style={styles}
                    />
                    {this.displayError(["companyConfirm"])}
                    {/* Render error message if passwords do not match */}
                    {this.state.passError ? (
                      <div
                        style={{
                          color: "red",
                          fontSize: "12pt",
                          textAlign: "center"
                        }}
                      >
                        {this.state.passError}
                      </div>
                    ) : null}

                    <MDBInput
                      label="Company Contact"
                      icon="phone"
                      group
                      type="number"
                      validate
                      error="wrong"
                      success="right"
                      name="companyContact"
                      value={this.state.companyContact}
                      onChange={this.handleChange}
                    />
                    {this.displayError(["companyContact", "companyContactNegative", "companyContactLength"])}
                    <MDBInput
                      label="Address"
                      icon="map-marked-alt"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      name="companyAddress"
                      value={this.state.companyAddress}
                      onChange={this.handleChange}
                    />
                    {this.displayError(["companyAddress"])}
                    <MDBInput
                      label="City"
                      icon="city"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      name="companyCity"
                      value={this.state.companyCity}
                      onChange={this.handleChange}
                    />
                    {this.displayError(["companyCity"])}
                    <MDBInput
                      label="Zip Code"
                      icon="envelope-open-text"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      name="companyZip"
                      value={this.state.companyZip}
                      onChange={this.handleChange}
                    />
                    {this.displayError(["companyZip", "companyZipNegative"])}
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="6" sm="10" className="mb-4">
              <MDBCard>
                <MDBCardBody>
                  <p className="h4 text-center py-2">Owner Details</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Full name"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      name="ownerName"
                      value={this.state.ownerName}
                      onChange={this.handleChange}
                    />
                    {this.displayError(["ownerName"])}
                    <MDBInput
                      label="Designation"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      name="ownerPosition"
                      value={this.state.ownerPosition}
                      onChange={this.handleChange}
                    />
                    {this.displayError(["ownerPosition"])}
                    <MDBInput
                      label="Contact Number"
                      icon="phone"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      name="ownerContact"
                      value={this.state.ownerContact}
                      onChange={this.handleChange}
                    />
                    {this.displayError(["ownerContact","ownerContactNegative","ownerContactLength"])}
                    <MDBInput
                      label="CNIC"
                      icon="fingerprint"
                      group
                      type="text"
                      name="ownerCNIC"
                      value={this.state.ownerCNIC}
                      onChange={this.handleChange}
                    />
                    {this.displayError(["ownerCNIC", "ownerCNICLength", "ownerCNICNegative"])}
                  </div>
                </MDBCardBody>
              </MDBCard>

              <MDBRow className="text-center">
                <MDBCol>
                  <div className="text-center py-3">
                    <MDBBtn color="cyan" type="submit">
                      Register
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    );
  }
}
export default FormPage;
